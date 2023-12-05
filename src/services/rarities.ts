'use client';
import useSWR, { SWRResponse } from 'swr';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';

import { routeFilter } from '@/utils';

export type ParamsType = {
  page?: number;
  pageSize?: number;
};

export const useGetRarities = () => {
  return useSWR(`/rarities`);
};
