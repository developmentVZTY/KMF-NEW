'use client';

import React, { useEffect, useState } from 'react';
import AboutHeroImg from '@/images/about/mission/about-hero.png';
import Link from 'next/link';
import useApi from '@/hooks/useApi';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import downarrowIco from '@/images/icons/downarrow.svg';
import uparrowIco from '@/images/icons/uparrow.svg';

import { useParams } from 'next/navigation';
import TvcommercialAccordion from '@/components/TvcommercialAccordion';
import { SwiperSlide,Swiper } from 'swiper/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
  FreeMode
} from 'swiper/modules';
import { Fade } from 'react-reveal';

function Tvcommercial() {
  const [brandAmbassador, setBrandAmbassador] = useState([]);

  const [commercialCategory, setCommercialCategory] = useState([]);
  const [openAccordion, SetOpenAccordion] = useState(null);
  const [brandAsset, setBrandAsset] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewCount,setPreviewCount]=useState(1)

  const axios = useApi();
  const arrows = {
    down: downarrowIco.src,
    up: uparrowIco.src
  };
  const locale = useParams().locale;
  const handleAccordionClick = (accordionId) => {
    SetOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  useEffect(() => {
    const updateScreensize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 768) {
        setPreviewCount(2);
      } else {
        setPreviewCount(1);
      }
    };
    updateScreensize();
    window.addEventListener('resize', updateScreensize);
    return () => window.removeEventListener('resize', updateScreensize);
  });

  useEffect(() => {
    (async () => {
      const { data: brandAmbassador } = await axios.get('/api/brand-ambassadors');
      const { data: commercialCategory } = await axios.get('/api/tv-commercials');

      
    
      
      setBrandAmbassador(brandAmbassador.data);
      setCommercialCategory(commercialCategory.data);
    })();
  }, []);

  return (
    <div className="w-full  absolute md:top-52 z-[-1]     ">
    <section className={`w-full h-[200px] md:h-[450px] lg:h-[750px] pt-28 relative grid place-items-center  `}>
    <div className="w-full h-full lg:flex hidden -z-10 justify-between items-center">
            <div className="w-40 h-8 bg-red-600"></div>
            <div className="w-40 h-8 bg-red-600"></div>
          </div>
      <img src={'/images/gallery.png'} className="w-full max-w-7xl h-full object-fill absolute top-0 z-[-1]" />
    </section>
      <section className="w-full h-fit m-auto pt-10   ">
        <div className="w-full space-y-5 p-4 ">
          <div className="   relative w-full  flex justify-center items-center ">
            <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale === 'en'
                ? `Gallery`
                : `
ಗ್ಯಾಲರಿ`}
            </h1>
          </div>

          <div className="w-full flex justify-center items-center pt-10 relative before:absolute before:-bottom-3 before:w-full before:max-w-[1200px] before:h-0.5 before:bg-neutral-dark4">
            <ul className="flex gap-5">
              <Link href={`/${locale}/blog/gallery`}>
                <li
                  className={` 
                   text-sm relative  
                       
                  uppercase`}>
                  NEWS AND EVENTS
                </li>
              </Link>

              <Link href={`/${locale}/blog/press-release`}>
                <li
                  className={` 
                 text-sm relative  
                       
                  uppercase`}>
                  {locale==='kn'?'ಮಾದ್ಯಮ ಪ್ರಕಟಣೆ':'Press Release'}
                </li>
              </Link>
              <li
                className={` 
                   text-primary-main text-xl font-bold relative before:absolute before:-bottom-3 before:w-full before:h-0.5 before:bg-primary-main
                         
                    uppercase`}>
                {locale==='kn'?'ಟಿ.ವಿ. ಜಾಹೀರಾತುಗಳು':'Tv commercial'}s
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-auto   mt-10 flex  justify-center items-center   ">
          <section className="max-w-[1100px] p-3   m-auto w-full h-full bg-white    ">
            <div className="w-full h-full flex flex-col space-x-5 justify-center items-start lg:flex-row  ">
              <div className="w-full h-full flex flex-col space-y-28   ">
                <div className="w-full h-full">
             
                  
                  <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
              spaceBetween={10}
              slidesPerView={2}
              navigation={true}
              controller={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              slide
              loop={true}
             
              className={`md:max-w-[1100px] m-auto p-3   `}>

{brandAmbassador?.map((items) => {
                      return items.attributes.assets?.data?.map((item, id) => {
                        const validExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG'];
                        if (validExtensions.includes(item?.attributes?.ext)) {
                          return (
                            <SwiperSlide className="swiper-sldier-card w-full lg:p-10" key={id}>
                               <PhotoProvider >

                                <PhotoView src={item?.attributes?.url}>
                                
                            <img
                              key={id}
                              src={item?.attributes?.url}
                              className=" w-32 m-auto md:w-96 md:h-80    transition-all duration-300 hover:scale-[1.1]"
                            />
                            </PhotoView>

</PhotoProvider>
                          </SwiperSlide>
                           
                          );
                        }
                        else{
                          return (
                            <SwiperSlide className="swiper-sldier-card w-full lg:p-10" key={id} >
 
                                  

                              <video
                              
                              controls
                              loop
                              muted
                              key={id}
                              src={item?.attributes?.url}
                              className="w-[160px] m-auto h-[180px]  md:w-[380px]   md:h-96  object-fill     transition-all duration-300 hover:scale-[1.1]"
                              onClick={() => handleVideoClick(item?.attributes?.url)}
                            />


 

                            </SwiperSlide>
                          
                          );
                        }
                      });
                    })}
               
            </Swiper>
                   
                  </div>
               

               
              </div>

              
            </div>
          
          </section>

          <div className=" w-full max-w-60 mr-32 md:mr-10 h-full transition-all duration-300  ">
               
          <Link       href={`/${locale}/blog/tv-commercial/brandambassador`|| ''}>
                      <Fade right>
                    
                    <li
                   
                   
                      className="w-full list-none transition-all duration-300 bg-primary-main ">
                      <button className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-1 md:p-4 w-full ">
                        <div className="w-full flex space-x-2 ">
                          <span className="text-[8px] md:text-[10px] uppercase text-white ">Brand Ambassador</span>
                        </div>
                      </button>
                    </li>
                    </Fade>
                    </Link>

                {commercialCategory?.map((item, id) => {
                   
                  return (
                    
                    <Link    key={id}  href={`/${locale}/blog/tv-commercial/${item?.id}` || ''}>
                      <Fade right>
                    
                    <li
                   
                   
                      className="w-full list-none transition-all duration-300 bg-primary-main ">
                      <button className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-1 md:p-4 w-full ">
                        <div className="w-full flex space-x-2 ">
                          <span className="text-[8px] md:text-[10px] text-start text-white">{item?.attributes?.title}</span>
                        </div>
                      </button>
                    </li>
                    </Fade>
                    </Link>
                  );
                })}
              </div>
        </div>
      </section>

      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <span className="close z-40 " onClick={closeModal}>&times;</span>
            <video controls src={selectedVideo} autoPlay className="modal-video w-full max-w-7xl h-[500px] object-fill">
               
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

       
<Footer />
    </div>
  );
}

export default Tvcommercial;
