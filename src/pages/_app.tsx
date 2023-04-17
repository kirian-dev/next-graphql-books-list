import { MainProvider } from '@/providers/MainProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <h1 className='text-5xl pt-10 text-center'>The list of books</h1>
      <Component {...pageProps} />
    </MainProvider>
  );
}
