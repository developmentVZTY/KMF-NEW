'use client';
import React, { useEffect, useState } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useMyContext } from '@/context/headerContext';
import useLocale from '@/hooks/useLocale';
import useApi from '@/hooks/useApi';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
 import Link from 'next/link';
 import rightArrow from '@/images/women-empower/rightArrow.svg';
import { Fade, Zoom } from 'react-reveal';

function GOI() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [scheme,setScheme]=useState([])
  const [readMore,setReadMore]=useState(false)
  const [showmore,setShowMore]=useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  
const axios=useApi()

const handleButton = (idx) => {
  setCurrentIndex(idx);
};
  useEffect(()=>{
    (
      async()=>{
        const {data}=await axios.get('/api/gois?sort[0]=createdAt:asc')
        const goiData = data?.data?.map((item, id) => {
          return {
            title: item?.attributes?.title,
            content: item?.attributes?.content
          };
        });

         
        setScheme(goiData)
      }
    )()
  },[])

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <div className={`w-full h-full absolute     ${isScroll ? ' md:top-48' : ''}  `}>
      <section className={`w-full h-full md:h-[700px] pt-28 relative  grid place-items-center `}>
        {/* <img src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
         */}
        <video
          src="/video/precrument.mp4"
          muted
          autoPlay
          loop
          controls
          playsInline
          className={`w-full  h-full    object-cover absolute top-0   ${
            isScroll ? 'h-[400px]' : ''
          } `}
        />
      </section>
      <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/animal-husbandry/scheme` || ''}>
               
              {locale === "en" ? "Schemes":"ಯೋಜನೆಗಳು"}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={`/${locale}/animal-husbandry/scheme/goi`}>
                  {locale === "en" ? "GOI":"ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/gok`}>
               {locale === "en" ? "GOK":"ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/other-scheme`}>
                {locale === "en" ? "Other Schemes":"ಇತರೆ ಯೋಜನೆಗಳು"}
            </Link>
            
          </div>

          <div className=" md:mb-20  mt-10 md:mt-20  relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು':'          Government Of India'}
              </h1>
            </div>
    
            <section className=" relative w-full   h-auto   ">
          
          <section className=" max-w-7xl m-auto h-auto p-3 flex   justify-center items-start    space-y-6  xl:flex-row xl:justify-evenly xl:items-start md:space-x-2">

            <Fade left>
        <div className="w-full xl:max-w-2xl shadow-lg flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white space-y-6 p-5 ">
        <div className="md:mb-20  mt-20  relative w-full   flex justify-center items-center ">
              <img
                src="/images/heading/heading-color/group.png"
                className="absolute   w-[530px] top-[-18px] sm:top-[-50px]    object-contain"
              />
              <h1 className=" text-primary-main relative max-w-[100px]  sm:max-w-[300px] m-auto text-center z-10 font-heading text-[5px] md:text-[15px] font-extrabold uppercase">
              {scheme[currentIndex]?.title}
              </h1>
            </div>
          
         
          {scheme[currentIndex]?.content?.map((item, id) => {
            return (
              <p  key={id} className="text-[10px] md:text-xl text-neutral-dark1 text-justify">{item?.children?.[0]?.text}</p>
            );
          })}
          
        </div>
        </Fade>

        <div className="flex flex-col justify-center items-start rounded-tl-3xl   rounded-br-3xl  bg-white p-5">
          <div>
            <h1 className=" text-xs  text-center md:text-xl uppercase">{locale==='kn'?`ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು`:`Government Of India `}</h1>
          </div>

          <div className="w-full h-ful pt-5 shadow-md">

            <ul className="w-full flex flex-col justify-center items-center space-y-3">
              {showmore?
               scheme?.map((items, idx) => {
                
                  return (
                    
                    <li
                      key={idx}
                      className="  relative w-full h-full flex justify-start p-2 space-x-3 items-center text-[5.5px] md:text-sm before:absolute before:w-[120px]  md:before:w-full  before:h-0.5 before:bg-neutral-dark4 before:bottom-0"
                      onClick={() => handleButton(idx)}>
                      <img src={rightArrow.src} className='w-4' />
                      <Fade right >
                      <p
                        className={` cursor-pointer ${
                          idx === currentIndex ? 'text-primary-main font-bold' : 'text-neutral-dark1'
                        } uppercase`}>
                        {items.title}
                      </p>
                      </Fade>
                    </li>
                     
                  );
            

               
              })
              :
              scheme?.map((items, idx) => {
                if(idx<10){
                  return (
                    <li
                      key={idx}
                      className=" cursor-pointer relative w-full h-full flex justify-start p-2 space-x-3 items-center text-[5.5px] md:text-sm before:absolute before:w-[120px]  md:before:w-full  before:h-0.5 before:bg-neutral-dark4 before:bottom-0"
                      onClick={() => handleButton(idx)}>
                      <img src={rightArrow.src} className='w-2' />
                      <Fade right>
                      <p
                        className={`cursor-pointer ${
                          idx === currentIndex ? 'text-primary-main font-bold' : 'text-neutral-dark1'
                        } uppercase`}>
                        {items.title}
                      </p>
                      </Fade>
                    </li>
                  );
                }

               
              })
              }
             
            {
              showmore ?
              <p onClick={()=>setShowMore(!showmore)} className='p-2 cursor-pointer text-primary-main transition-all duration-100 text-xl  hover:scale-[1.02]'>{locale === "en" ? "Show Less":"ಕಡಿಮೆ ಓದಿ"} ...</p>
              :
              <p onClick={()=>setShowMore(!showmore)} className='p-2 cursor-pointer text-primary-main transition-all duration-100 text-xl  hover:scale-[1.02]'> {locale === "en" ? "Show More":"ಮತ್ತಷ್ಟು ಓದಿ"}...</p>

            }
            
            </ul>
          </div>
        </div>
      </section>


         
      </section>

       
<Footer />
    </div>
  );
}

export default GOI;
