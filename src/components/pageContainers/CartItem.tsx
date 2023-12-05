import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons, Image } from '@/components/ui/images';
import { Text } from '@/components/ui/typo';
import { formatNumber } from '@/utils';
import { Box, Flex } from '@radix-ui/themes';

interface Props {
  items: any;
  setIsSuccess: (arg: boolean) => void;
  setCartItems: (arg: any) => void;
}

const CartItem: React.FC<Props> = ({ items, setIsSuccess, setCartItems }: Props) => {
  const [cartQuantities, setCartQuantities] = useState<number[]>(items.map(() => 1));

  /**
   * ======= Click event handlers =======
   */
  const increaseQuantity = (key: number) => {
    const newQuantities = [...cartQuantities];
    newQuantities[key]++;
    setCartQuantities(newQuantities);
  };

  const decreaseQuantity = (key: number) => {
    if (cartQuantities[key] > 0) {
      const newQuantities = [...cartQuantities];
      newQuantities[key]--;
      setCartQuantities(newQuantities);
    }
  };

  // Calculate the sum price of selected items
  const totalPrices = items.reduce(
    (acc: any, item: any) => acc + item.cardmarket.prices.averageSellPrice,
    0
  );

  return (
    <Box>
      <Box className="p-10 pb-0 relative overflow-hidden">
        <div className="space-y-7 h-[413px] overflow-y-scroll pb-12">
          {cartQuantities.map((each, key) => (
            <Flex key={key} justify="between">
              <Flex className="gap-x-4">
                <Image src="/upload/images/img.svg" width={77} height={106} alt="img" />
                <Flex direction="column" justify="between" className="py-2">
                  <div>
                    <Text className="text-xl text-stone-800 font-bold">Pokemon Name</Text>
                    <Flex className="gap-x-2">
                      <Text className="text-stone-800">$2.34</Text>
                      <Text className="text-gray-800">per card</Text>
                    </Flex>
                  </div>
                  <Flex className="gap-x-1">
                    <Text className="text-sm font-normal text-red-400">15</Text>
                    <Text className="text-sm font-normal text-gray-600">Card left</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex direction="column" align="end" justify="between" className="py-2">
                <div className="relative">
                  <Text className="text-xl text-blue-800 font-bold pr-4">{each}</Text>
                  <div>
                    <Icons.upArrow
                      className="text-blue-800 absolute -top-1 right-0 cursor-pointer"
                      onClick={() => increaseQuantity(key)}
                    />
                    <Icons.downArrow
                      className="text-blue-800 absolute top-1 right-0 cursor-pointer"
                      onClick={() => decreaseQuantity(key)}
                    />
                  </div>
                </div>
                <Flex direction="column" align="end" className="gap-x-1">
                  <Text className="text-xs font-normal text-stone-800">price</Text>
                  <Text className="text-base font-bold text-blue-800">$4.68</Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </div>
        {<div className="bg-bottom-fixed absolute left-0 bottom-0 w-full h-[120px] z-20" />}
      </Box>
      <Box className="px-[64px] pt-10 pb-4">
        <Flex className="space-y-2" width="100%" direction="column" align="center">
          <Flex width="100%" justify="between">
            <Text className="text-stone-800 font-semibold">Total cards</Text>
            <Text className="text-red-400 font-semibold">{items.length}</Text>
          </Flex>
          <Flex width="100%" justify="between">
            <Text className="text-stone-800 text-xl font-bold">Total price</Text>
            <Text className="text-red-400 font-bold">${formatNumber(totalPrices)}</Text>
          </Flex>
        </Flex>
        <Button
          className="w-full bg-blue-800 mt-[26px]"
          onClick={() => {
            setIsSuccess(true);
            setCartItems([]);
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;
