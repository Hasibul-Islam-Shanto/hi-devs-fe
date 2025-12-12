'use client';
import React, { useState } from 'react';
import SidebarCloseButton from '../buttons/sidebar-close-button';
import { cn } from '@/lib/utils';

interface SidebarContainerProps {
  children: React.ReactNode;
}
const SidebarContainer = ({ children }: SidebarContainerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <SidebarCloseButton isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <aside
        className={cn(
          'border-border bg-sidebar fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 border-r transition-transform duration-300 lg:sticky lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {children}
      </aside>
    </>
  );
};

export default SidebarContainer;
