import { Inter } from 'next/font/google';
import { Stories } from '@/components/Stories';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stories />
    </main>
  );
}
