'use client';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { NextRouter } from 'next/router';

import { Image } from '@/components/ui/images';
import { Text } from '@/components/ui/typo';
import { Box, Flex, Grid } from '@radix-ui/themes';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}: HeaderProps) => {
  return (
    <Grid columns="1">
      <Box position="relative">
        <header className="bg-white fixed top-0 w-full h-[77px] shadow-md z-20">
          <Flex align="center" justify="center" height="100%" position="relative">
            <Text size="6" className="text-black" weight="bold">
              TCG Marketplace
            </Text>
            <Box position="absolute" className="-bottom-[18px]">
              <Image
                src="/upload/icons/logo.svg"
                // className="w-[68px] h-[42px]"
                width={70}
                height={45}
                alt="logo"
              />
            </Box>
          </Flex>
        </header>
      </Box>
    </Grid>
  );
};

export default Header;
