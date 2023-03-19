'use client'

import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

type ProvidersProps = {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (<ThemeProvider enableSystem attribute="class">
    <div className="dark:bg-gray-700 dark:text-gray-200 text-gray-700 transition-colors duration-300 min-h-screen select-none">
    {children}
    </div>
  </ThemeProvider>);
}