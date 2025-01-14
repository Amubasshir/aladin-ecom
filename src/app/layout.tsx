//Next.js
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Lato } from 'next/font/google';

//Global styles
import './globals.css';

//Theme Provider
import { ThemeProvider } from 'next-themes';

//Fonts
const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

//metadata
export const metadata: Metadata = {
  title: 'Aladin',
  description:
    'Welcome to Aladin. Your best ultimate destination for seamless shopping experience.',
  icons: {
    icon: [
      {
        url: '/images/aladinlogo.png',
        href: '/images/aladinlogo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
