import React from 'react';
import { NextPage } from 'next';

import PageLayout from '@/components/layout';
import List from '@/components/pageContainers/List';

const SplashPage: NextPage = () => {
  return (
    <PageLayout>
      <List />
    </PageLayout>
  );
};

export default SplashPage;
