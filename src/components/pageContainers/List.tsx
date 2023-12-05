'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';

import { Button } from '@/components/ui/button';
import CardBox from '@/components/ui/card';
import { Animate, Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Icons, Image } from '@/components/ui/images';
import Spinner from '@/components/ui/Spinner';
import { Text } from '@/components/ui/typo';
import fetcher from '@/lib/fetcher';
import { useGetRarities } from '@/services/rarities';
import { useGetSets } from '@/services/sets';
import { useGetTypes } from '@/services/type';
import { cn } from '@/utils/cn';
import { Badge, Box, Container, Flex, Grid, Section } from '@radix-ui/themes';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/input/InputSelect';

import CartItem from './CartItem';

export default function App() {
  /**
   * ======= State management =======
   */
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredSet, setFilteredSet] = useState<string>('');
  const [filteredTypes, setFilteredTypes] = useState<string>('');
  const [filteredRarity, setFilteredRarity] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const nameFilter = searchValue ? `name:${searchValue}` : '';
  const typesFilter = filteredTypes ? `types:${filteredTypes}` : '';
  const setFilter = filteredSet ? `set.name:${filteredSet}` : '';
  const rarityFilter = filteredRarity ? `rarity:${filteredRarity}` : '';

  /**
   * ======= Data fetching =======
   */
  const { data: setsData } = useGetSets();
  const { data: raritiesData } = useGetRarities();
  const { data: typesData } = useGetTypes({});
  const { data, size, setSize, isValidating, isLoading, mutate } = useSWRInfinite(
    (index) =>
      `/cards?page=${
        index + 1
      }&pageSize=${12}&q=${nameFilter} ${typesFilter} ${rarityFilter} ${setFilter}`,
    fetcher
  );

  // Memoizes the 'issues' array by flattening the nested structure if 'data' is present.
  // If 'data' is not available, an empty array is returned.
  const issues = useMemo(() => (data ? [].concat(...data) : []), [data]);

  // Memoizes the 'contentDataArray' by flattening the nested structure of 'issues' and extracting the 'data' property.
  // If 'issues' is not available, an empty array is returned.
  const contentDataArray: any = useMemo(
    () => issues?.flatMap((page: any) => page?.data) || [],
    [issues]
  );

  const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';
  const isEmpty = data?.[0]?.length === 0;

  //TODO
  //* Checks if the list has reached the end based on data availability and page length.
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 12);

  //* Indicates if the list is currently being refreshed during validation.
  const isRefreshing = isValidating && data && data.length === size;

  // get selected items
  const handleSelectedItem = (data: any) => {
    if (data) {
      setCartItems((prevCount) => [...prevCount, data]);
    }
  };

  // debounce search
  // Debounces the onChange event to delay the execution of setSearchValue,
  const debouncedOnChange = debounce(() => {
    if (!inputRef?.current?.value) mutate();
    setSearchValue(`${inputRef?.current?.value}`);
  }, 1000);

  /**
   * ======= useEffects =======
   */
  useEffect(() => {
    router.push(
      `/?search=${searchValue}&type=${filteredTypes}&set=${filteredSet}&rarity=${filteredRarity}`
    );
  }, [searchValue, filteredTypes, filteredSet, router, filteredRarity]);

  // Display loading spinner if the isLoading flag is true
  if (isLoading) return <Spinner className="w-full mt-6" color="#000000" width={35} height={35} />;

  return (
    <Dialog onOpenChange={(open) => setDialogOpen(open)}>
      <Grid columns="1">
        <Container>
          <Section p="4" position="relative">
            <Box>
              <Flex justify="center">
                {/* Search */}
                <div className="search-wrap">
                  <input
                    onChange={debouncedOnChange}
                    className="search-input"
                    placeholder="Name..."
                    defaultValue={searchValue}
                    type="text"
                    ref={inputRef}
                  />
                </div>

                {/* filtered with types */}
                <Select
                  onValueChange={(value) => {
                    if (value !== 'all') setFilteredTypes(value);
                    else setFilteredTypes('');
                  }}
                >
                  <SelectTrigger className="w-auto min-w-[100px] text-black border border-l-gray-500">
                    <SelectValue placeholder={filteredTypes ? filteredTypes : 'Type'} />
                  </SelectTrigger>
                  <SelectContent side="bottom" className="text-black h-auto">
                    <SelectItem value="all">All</SelectItem>
                    {typesData?.data?.map((each: any, key: number) => (
                      <SelectItem key={key} value={each}>
                        {each}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* filtered with rarities */}
                <Select
                  onValueChange={(value) => {
                    if (value !== 'all') setFilteredRarity(value);
                    else setFilteredRarity('');
                  }}
                >
                  <SelectTrigger className="w-auto min-w-[100px] text-black border border-l-gray-500">
                    <SelectValue placeholder={filteredRarity ? filteredRarity : 'Rarities'} />
                  </SelectTrigger>
                  <SelectContent side="bottom" className="text-black h-[500px]">
                    <SelectItem value="all">All</SelectItem>
                    {raritiesData?.data?.map((each: any, key: number) => (
                      <SelectItem key={key} value={each}>
                        {each}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* filtered with set */}
                <Select
                  onValueChange={(value) => {
                    if (value !== 'all') setFilteredSet(value);
                    else setFilteredSet('');
                  }}
                >
                  <SelectTrigger className="w-auto min-w-[100px] text-black border border-l-gray-500 rounded-tr-full rounded-br-full">
                    <SelectValue placeholder={filteredSet ? filteredSet : 'Set'} />
                  </SelectTrigger>
                  <SelectContent side="bottom" className="text-black h-[500px]">
                    <SelectItem value="all">All</SelectItem>
                    {setsData?.data?.map((each: any, key: number) => (
                      <SelectItem key={key} value={each.name}>
                        {each.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Flex>
            </Box>
            <div className="grid grid-cols-12 lg:gap-x-[70px] gap-x-4 gap-y-[100px] lg:mt-[100px] mt-[70px] mb-10">
              {contentDataArray?.length ? (
                contentDataArray?.map((each: any, key: number) => (
                  <div className="lg:col-span-4 md:col-span-6 col-span-12" key={key}>
                    <CardBox data={each} getEachItem={handleSelectedItem} />
                  </div>
                ))
              ) : (
                <Box className="col-span-12">
                  <Flex justify="center">No found data!</Flex>
                </Box>
              )}
            </div>
            {contentDataArray?.length > 0 && (
              <>
                <Box>
                  <Flex justify="center">
                    <Button
                      className="rounded-full w-40"
                      onClick={() => setSize(size + 1)}
                      loading={isLoadingMore}
                    >
                      Load More
                    </Button>
                  </Flex>
                </Box>

                <Flex
                  justify="center"
                  align="center"
                  className="bg-bottom-fixed fixed left-0 bottom-0 w-full h-[120px] z-20"
                >
                  {!dialogOpen &&
                    (cartItems?.length ? (
                      <DialogTrigger asChild>
                        <Button className="bg-blue-800 w-[120px] rounded-[10px] relative">
                          <div className="absolute -top-2 -left-1">
                            <Badge
                              variant="solid"
                              className="w-4 h-4 flex justify-center items-center bg-red-300"
                              radius="full"
                            >
                              {cartItems?.length}
                            </Badge>
                          </div>
                          <Flex justify="center" align="center" gap="1">
                            <Icons.cart className="w-[21px] h-[21px]" />
                            <Text>View cart</Text>
                          </Flex>
                        </Button>
                      </DialogTrigger>
                    ) : (
                      <Button className="bg-blue-800 w-[120px] rounded-[10px] relative">
                        <div className="absolute -top-2 -left-1">
                          <Badge
                            variant="solid"
                            className="w-4 h-4 flex justify-center items-center bg-red-300"
                            radius="full"
                          >
                            {cartItems?.length}
                          </Badge>
                        </div>
                        <Flex justify="center" align="center" gap="1">
                          <Icons.cart className="w-[21px] h-[21px]" />
                          <Text>View cart</Text>
                        </Flex>
                      </Button>
                    ))}
                </Flex>
              </>
            )}
          </Section>
        </Container>
      </Grid>
      <DialogContent
        animate={Animate.SLIDE}
        className={cn(
          'bg-white top-[initial] lg:bottom-[70px] md:bottom-[40px] bottom-[30px] px-0 py-2 translate-y-0 overflow-initial rounded-[20px] shadow-sm'
        )}
      >
        <Box className={cn('h-auto', isSuccess && 'h-[360px]')}>
          {!isSuccess ? (
            <>
              <CartItem setIsSuccess={setIsSuccess} items={cartItems} setCartItems={setCartItems} />
              <Flex justify="center">
                <DialogClose className="absolute -bottom-[30px]">
                  <Image src="/upload/icons/close.svg" width={40} height={40} alt="close" />
                </DialogClose>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                className="gap-4"
                direction="column"
                justify="center"
                align="center"
                height="100%"
              >
                <Image src="/upload/icons/exclude.svg" width={110} height={110} alt="success" />
                <Text className="text-stone-800 font-semibold text-xl">Payment success!</Text>
              </Flex>
              <Flex justify="center">
                <DialogClose className="absolute -bottom-[30px]">
                  <Image src="/upload/icons/close.svg" width={40} height={40} alt="close" />
                </DialogClose>
              </Flex>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
