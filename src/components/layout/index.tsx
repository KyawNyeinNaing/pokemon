'use client';
import React from 'react';
import { NextRouter } from 'next/router';

import { cn } from '@/utils/cn';
import { Box, Section } from '@radix-ui/themes';

import Header from './Header';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<Props> = ({ children, className, ...props }: Props) => {
  return (
    <>
      <Section className="relative" p="0">
        <Header />
        <Box
          className={cn('flex-1 px-4 lg:py-[100px] py-[90px] bg-gray-200 min-h-screen', className)}
        >
          {children}
        </Box>
      </Section>
    </>
  );
};

export default PageLayout;
