'use client';
import React, { useEffect } from 'react'; // Make sure to import React
import './globals.css';
import { Header } from '../components/Header';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './page.module.css';
import logo from '@/images/logo/logo.png';
 

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'rodal/lib/rodal.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { register } from 'swiper/element/bundle';
import { ParallaxProvider } from 'react-scroll-parallax';
import { pdfjs } from 'react-pdf';

import 'react-photo-view/dist/react-photo-view.css';
import { MyContextProvider } from '@/context/headerContext';
import Script from 'next/script';
 
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { Analytics } from "@vercel/analytics/react"
import { GA_ID, GTM_ID } from '@/lib/analytics';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
register();

const queryClient= new QueryClient();

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href={logo.src} />
        </head>

        <body className="relative">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <QueryClientProvider client={queryClient}>
          
          <MyContextProvider>

            <Header />
            <ParallaxProvider>
            
              {children}
            
              <SpeedInsights />
              <Analytics />
            </ParallaxProvider>
          </MyContextProvider>
          
            </QueryClientProvider>
          {''}

          {GTM_ID ? (
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');
`
              }}
            />
          ) : (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
`
                }}
              />
            </>
          )}
        </body>
      </html>
    </>
  );
}
