'use client';
import React, { useState,useEffect } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { IoHomeOutline } from 'react-icons/io5';

import useApi from '@/hooks/useApi';
import { Fade } from 'react-reveal';
function NandiniHostels() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [hostel,setHostels]=useState([])

  const axios = useApi();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/nandini-hostels')
      setHostels(data.data);
     
    })();
  }, []);
  return (
    <div className={`w-full h-full absolute company-bg   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
  
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />

            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold    " href={` `}>
              {locale==='kn'?'ಸಾಮಾಜಿಕ ಜವಾಬ್ದಾರಿಗಳು':'Social Responsiblites'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={` `}>

            {locale==='kn'?'ನಂದಿನಿ ವಸತಿ ನಿಲಯ':'Nandini Hostels'}
              
            </Link>
            
      </div>
      <section className=" relative w-full   h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 space-y-3 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col space-y-2 justify-center items-start    p-1   ">

          <div className="mb-10    relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale==='kn'?'ನಂದಿನಿ ವಸತಿ ನಿಲಯ':'Nandini Hostels'}
              </h1>
            </div>
           

            

            <div className="w-full h-full flex justify-center items-center flex-wrap">
            
              
              
                <div className='w-full h-auto   max-w-7xl bg-white shadow-lg'>

                {hostel?.map((_, id) => {
                return (
                  <div
                    key={id}
                    className="  w-full  rounded-3xl     ">
                    <div className="m-auto">
                      <Fade top>
                      <h1 className="text-primary-main text-xl md:text-3xl text-center ">
                        {' '}
                        {_?.attributes?.title}{' '}
                      </h1>
                      </Fade>
                      <div className="mt-10 p-10">
                        {_?.attributes?.content && (
                          <BlocksRenderer
                            content={_?.attributes?.content}
                            blocks={{
                              paragraph: ({ children }) => <Fade bottom> <p className="text-md">{children}</p></Fade>,
                              heading: ({ children, level }) => {
                                switch (level) {
                                  case 1:
                                    return (
                                      <h1 className="text-2xl text-primary-main mt-5">{children}</h1>
                                    );
                                  case 2:
                                    return <h2 className="text-lg">{children}</h2>;
                                  case 3:
                                    return <h3>{children}</h3>;
                                  case 4:
                                    return <h4>{children}</h4>;
                                  case 5:
                                    return <h5>{children}</h5>;
                                  case 6:
                                    return <h6>{children}</h6>;
                                  default:
                                    return <h1>{children}</h1>;
                                }
                              },
                              list: ({ children }) => {
                                return (
                                  <ul className='list-disc flex-col flex space-y-5'>
                                    {children}
                                  </ul>
                                )
                              },
                              code: ({ children }) => (
                                <h1 className="text-2xl bg-primary-main text-white p-2 shadow-lg">
                                  {children}
                                </h1>
                              )
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
                </div>


            </div>
          </div>
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default NandiniHostels;
