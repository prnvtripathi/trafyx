'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

const ProgressBars = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#7e38ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBars;