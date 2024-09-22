'use client';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      {children}
      <Toaster />
    </RecoilRoot>
  );
};