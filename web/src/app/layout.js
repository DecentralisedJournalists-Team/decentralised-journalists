'use client';

import { useEffect, useState } from 'react';
import '@/app/globals.css';
import { NearContext } from '@/context';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import Loading from '@/components/loading';
import { NetworkId, ArticleContract } from '@/config';
import { Open_Sans } from 'next/font/google';

import { Wallet } from '@/wallets/near';

const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: ArticleContract });

const openSans = Open_Sans({
  subsets: ['latin'],
})


// Layout Component
export default function RootLayout({ children }) {
  const [signedAccountId, setSignedAccountId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { wallet.startUp(setSignedAccountId); }, []);
  useEffect(() => {
    const timer = setTimeout(() => {setLoading(false)}, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en">
      <body className={`${openSans.className} h-screen`}>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <Navigation />
          {loading ? <Loading /> : children}
          <Footer />
        </NearContext.Provider>
      </body>
    </html>
  );
}
