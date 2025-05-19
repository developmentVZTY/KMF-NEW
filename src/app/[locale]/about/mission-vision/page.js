'use client';
import React, { useEffect, useState } from 'react';
 
import CowImg1 from '@/images/about/mission/about-cow-1.png';
import CowImg2 from '@/images/about/mission/about-cow-2.png';
 
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/useApi';
import { useMyContext } from '@/context/headerContext';
import { Fade, Zoom } from 'react-reveal';
function MissionVission() {
  const locale = useParams().locale;
  const axios = useApi();
  const [purpose, setPurpose] = useState([]);
  const { isScroll, setIsScroll, id, setId } = useMyContext();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/mission-vissions');

      setPurpose(data.data[0]);
       
    })();
  }, []);

  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
    
      {purpose?.attributes?.bannervideo?.data ?
       <section className={`w-full h-[600px] pt-28 relative  grid place-items-center `}>
       {/* <img src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
        */}
       
       <video
         src={purpose?.attributes?.bannervideo?.data?.attributes?.url || ''}
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
     :
      <section className={`w-full h-[200px] md:h-[450px] lg:h-[750px] pt-28 relative grid place-items-center `}>
       
      <Fade top>
      <img
        src={purpose?.attributes?.banner?.data?.[0]?.attributes?.url || ''}
        
        className={`w-full  h-full    object-fill absolute top-0 z-[-1] ${
          isScroll ? 'h-[500px]' : ''
        } `}
      />
      </Fade>
    </section>
      }

 
      <section className="w-full max-w-5xl m-auto h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 space-y-5  lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col justify-center items-center shadow-md ">
            <div className="mb-2   relative w-full  flex justify-center items-center ">
             <Fade bottom>
              <h1 className=" text-primary-main font-heading text-3xl font-extrabold uppercase">
                 
                {purpose?.attributes?.missionandvissiontitle}
              </h1>
              </Fade>
            </div>

            <ul className="flex flex-col space-y-5 p-6 w-full h-full justify-center items-center  list-disc text-justify text-lg  md:justify-normal md:items-start">
              <h1 className={`text-4xl font-bold ${locale==='kn'?'text-xl':''}`}>{locale === 'kn' ? 'ಘನೋದ್ದೇಶ' : 'Vision'}</h1>
            <Fade bottom>
              {purpose?.attributes?.vission?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
            </Fade>
            </ul>

            <ul className="flex flex-col space-y-5 p-6 w-full h-full justify-center items-center list-disc   text-justify text-lg  md:justify-normal md:items-start">
              <h1 className={`text-4xl font-bold ${locale==='kn'?'text-xl':''}`}>{locale === 'kn' ? 'ಧ್ಯೇಯದೃಷ್ಟಿ' : 'Mission'}</h1>
              
              {purpose?.attributes?.mission?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
               
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full h-auto pt-10   ">
        <div className="w-full  h-full flex flex-col p-3 space-y-5 lg:flex-row lg:p-10 lg:space-x-10">
          <Fade left>
          <div className="w-full   flex justify-center items-center">
            <img src={CowImg1.src} />
          </div>
          </Fade>

          <div className="w-full flex flex-col justify-center items-start shadow-md ">
            <Fade right>
            <div className="mb-8   relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main font-heading text-3xl font-extrabold uppercase">
              {purpose?.attributes?.objectivetitle}
              </h1>
            </div>
            </Fade>

            <ul className="flex flex-col space-y-3 p-6 w-full h-full justify-center items-center list-disc text-justify text-lg  md:justify-normal md:items-start">
              <Fade right>
              {purpose?.attributes?.objective?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
              </Fade>
            </ul>
          </div>
        </div>
      </section>

      <section className=" relative w-full h-auto pt-10  ">
        <div className="w-full  h-full flex flex-col p-3 justify-center items-center space-y-5 lg:flex-row lg:p-10 lg:space-x-10">
          <div className="w-full flex flex-col justify-center items-center shadow-md ">
              <Fade left>
            <div className="mb-8   relative w-full  flex justify-center items-center ">
              <h1 className=" text-primary-main font-heading text-3xl font-extrabold uppercase">
              {purpose?.attributes?.evalutiontitle}
              </h1>
            </div>
            </Fade>

            <ul className="flex flex-col space-y-3 p-6 w-full h-full justify-center items-center list-disc text-justify text-lg  md:justify-normal md:items-start">
              <Fade left>
              {purpose?.attributes?.evalution?.map((item, id) => {
                return <li key={id}>{item?.children[0].text}</li>;
              })}
              </Fade>
            </ul>
          </div>


          <Fade right>

          <div className="w-full h-full flex justify-center items-center">
            <img src={CowImg2.src} className=" w-[400px] h-full" />
          </div>
          </Fade>
        </div>

        {/* <img src={MilkBottomImg.src} className="w-full h-full " /> */}
      </section>

       
<Footer />
    </div>
  );
}

export default MissionVission;
