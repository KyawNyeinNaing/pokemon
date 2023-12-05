export const routeFilter = (params: any) => {
  return new URLSearchParams(params);
};

export const formatNumber = (number: number) => {
  return Number(number)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
