import React, { useState } from 'react';
import styled from 'styled-components';

import { cn } from '@/utils/cn';
import { Box, Flex } from '@radix-ui/themes';

import { Button } from '../button';
import { Image } from '../images';
import { Text } from '../typo';

interface Props {
  data?: any;
  className?: string;
  getEachItem: (arg: any) => void;
}

const CardBox: React.FC<Props> = ({ data, className, getEachItem, ...rest }: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  /**
   * handlers functions
   */
  const selectedItem = () => {
    getEachItem(data);
    setSelected(true);
  };

  return (
    <Box className="h-[430px] relative">
      <Flex align="end" height="100%">
        <Box className="px-[48px] absolute z-10 w-full h-[270px] -top-[35px] flex justify-center items-center">
          <Image src={data?.images?.large} width={230} height={270} alt="img" />
        </Box>
        <Box width="100%" className="rounded-[20px] bg-white relative h-[204px] shadow-md">
          <Flex
            className="space-y-[4px] px-4"
            justify="center"
            align="center"
            direction="column"
            height="100%"
          >
            <Text className="text-2xl text-stone-800 font-bold">{data?.name}</Text>
            <Text className="text-blue-700">{data?.rarity}</Text>
            <Flex className="gap-x-[29px]">
              <Text className="text-gray-800 text-xl">
                ${data?.cardmarket?.prices?.averageSellPrice}
              </Text>
              <Text className="text-gray-800 text-xl">{data?.set?.total} left</Text>
            </Flex>
          </Flex>
          <Flex className="-bottom-5 absolute w-full" justify="center" align="center">
            <Button
              className={cn(
                'bg-primary rounded-full text-black min-w-[215px]',
                selected && 'bg-stone-800 text-white'
              )}
              onClick={selectedItem}
            >
              Select card
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CardBox;
