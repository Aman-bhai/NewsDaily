// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '../app/components/Provider';
import Navbar from '../app/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { NewsProvider } from '@/app/context/NewsContext';
import ProgressBar from '../app/components/ProgressBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NewsDaily - The Most Popular newsapp for acquiring all latest News.',
  description:
    'NewsDaily is a Next.js website which acquiring all latest news related to knowledge, health, technology, etc.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NewsProvider>
            <ProgressBar /> 
            <Toaster />
            <Navbar />
            {children}
          </NewsProvider>
        </Provider>
      </body>
    </html>
  );
}
