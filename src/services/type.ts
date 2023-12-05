'use client';
import useSWR from 'swr';

export type ParamsType = {
  page?: number;
  pageSize?: number;
};

export const useGetTypes = (params: ParamsType) => {
  return useSWR(`/types`);
};
