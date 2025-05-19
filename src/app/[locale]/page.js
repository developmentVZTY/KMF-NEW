'use client';

import React, { useEffect, useState } from 'react';
import { LinkCard } from './Card.js';
import cartIco from '@/images/homeImages/quikLink/cart.tif.svg';
import locationIco from '@/images/homeImages/quikLink/location.tif.svg';
import commercialIco from '@/images/homeImages/quikLink/commercial.svg';
import milkglassImg from '@/images/homeImages/milkglass.png';
import milkglassKnImg from '@/images/homeImages/milk-glass-kn.png';
import Fade from 'react-reveal/Fade';
import { Zoom } from 'react-reveal';

import Footer from '@/components/Footer';
import TypeWriter from '@/components/TypeWriter';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
  FreeMode
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card.js';
import Link from 'next/link';
import useApi from '@/hooks/useApi.js';
import { ParallaxBanner } from 'react-scroll-parallax';
import ArrivalCard from '@/components/ArrivalCard.js';
import { useMyContext } from '@/context/headerContext.js';
import { FaRegHandPointRight } from 'react-icons/fa';
import KnmModel from '@/components/KymModel.js';
import useLocale from '@/hooks/useLocale.js';
import { useSwiper } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import Preloader from '@/components/Preloader.js';

const fetchCertificates = async (axios) => {
  const { data } = await axios.get('/api/certificates');
  return data;
};

// const fetchTenders = async (axios) => {
//   const { data } = await axios.get('/api/tender-notifications?sort[0]=last_date:desc');
//   return data;
// };

const fetchHomeCards = async (axios) => {
  const { data } = await axios.get('/api/homecards');
  return data;
};

const fetchHomeAbouts = async (axios) => {
  const { data } = await axios.get('/api/homeabouts');
  return data;
};

const fetchKnowYourMilk = async (axios) => {
  const { data } = await axios.get('/api/knowyourmilks');
  return data;
};

const fetchProducts = async (axios) => {
  const { data } = await axios.get('/api/product-sub-items');
  return data;
};

const Home = () => {
  const [knowMilkItem, setKnowMilkItem] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [scrollY, setScrollY] = useState(null);
  const [newsHome, setNewsHome] = useState([]);
  const { isScroll, setOpenNav } = useMyContext();
  const axios = useApi();
  const locale = useLocale().locale;

  const { data: certificates } = useQuery({
    queryKey: ['certificates'],
    queryFn: () => fetchCertificates(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  // const { data: tenders } = useQuery({
  //   queryKey: ['tenders'],
  //   queryFn: () => fetchTenders(axios),
  //   staleTime: 60 * 60 * 1000 // 1 hour
  // });

  const { data: homeCards } = useQuery({
    queryKey: ['homecards'],
    queryFn: () => fetchHomeCards(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const { data: homeAbouts } = useQuery({
    queryKey: ['homeabouts'],
    queryFn: () => fetchHomeAbouts(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const { data: knowYourMilk } = useQuery({
    queryKey: ['knowyourmilks'],
    queryFn: () => fetchKnowYourMilk(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(axios),
    staleTime: 60 * 60 * 1000 // 1 hour
  });

  const latestProducts = products?.data?.filter((item) => item?.attributes?.isLatest);
  if (latestProducts) {
    var product = [...latestProducts];
  }

  const homedetails = homeAbouts?.data?.map((item) => ({
    about1: item?.attributes?.about1?.[0]?.children?.[0]?.text,
    about2: item?.attributes?.about2?.[0]?.children?.[0]?.text,
    video1: item?.attributes?.video1?.data?.attributes?.url,
    video2: item?.attributes?.video2?.data?.attributes?.url
  }));

  const handleKnowMilk = (item) => {
    setKnowMilkItem(item);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    const [{ data: tender }, { data: newsImp }] = await Promise.all([
      axios.get('/api/tender-notifications?_limit=20&_sort[0]=last_date:desc'),
      axios.get('/api/home-new')
    ]);

    const groupedData = tender?.data?.reduce((acc, item) => {
      const year = new Date(item?.attributes?.last_date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});

  
  const currentYear = new Date().getFullYear();
  if (groupedData && groupedData[currentYear]) {
    setCurrentYearData(groupedData[currentYear]);
  }
    setNewsHome(newsImp?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const NextSlider = () => {
    const swiper = useSwiper();

    useEffect(() => {
      if (swiper.activeIndex === 0) {
        setTimeout(() => {
          swiper.slideTo(1, 1000);
        }, 3000);
      }
    }, [swiper]);

    return <></>;
  };

  return (
    <div

    
     
      className={`w-full h-full absolute    z-[-1] ${isScroll ? 'top-[170px] md:top-48 ' : ''}  `}>
        {/* <Preloader/> */}
      {/* HOME CARAOUSAL IMAGE */}
      <div className={`w-full relative   ${isScroll ? 'h-[240px] md:h-[812px]' : 'h-[240px] md:h-screen'}`}  >
        <video
          className={`w-full object-fill  ${isScroll ? 'h-[240px] md:h-[812px]' : 'h-[240px] md:h-screen'}`}
          src="/video/banner.mov"
          controls
          muted
          autoPlay
          loop
          playsInline></video>
         

       <p
  className="absolute bottom-[50px] ml-[-50px] font-semibold left-[50%] hidden md:block"
  style={{
    animation: "floattt 1s ease-in-out infinite",
  }}
>
  SCROLL DOWN ↓
</p>
        {/* <iframe
          className="absolute bottom-0 left-[40%] sm:left-[45%] hidden md:block "
          width={100}
          src="https://lottie.host/embed/8fc4672b-a346-4510-aef7-c3533c584e98/cTEVCEEGbE.json"></iframe> */}
      </div>

      {/* important */}

      {newsHome?.attributes?.important && (
        <div className="w-full h-20 flex justify-center items-center bg-red-600">
          <p className="text-white text-center ">Important: {newsHome?.attributes?.important} </p>
        </div>
      )}

      {/* Caution/ */}

      {newsHome?.attributes?.caution && (
        <div className="w-full min-h-14 bg-white flex justify-center items-center marquee-latest overflow-auto">
          <p className="text-red-600 font-bold uppercase mr-3">Caution:</p>
          <div className="text-green-900   font-bold w-full text-sm  text-nowrap">
            {newsHome?.attributes?.caution}
          </div>
        </div>
      )}

      {/* <CarouselImage images={desktop || []} mobileImg={mobile || []}  /> */}

      {/* <CarouselImage images={banners || []}  /> */}

      <section className="w-full pt-20 pb-20 relative z-[1] bg-primary-subtle">
        <div className="w-full">
          <div className="w-full text-center">
            <h1 className="text-4xl text-[#242424] font-heading font-[400] tracking-wide md:text-4xl uppercase">
            ಕೆ.ಎಂ.ಎಫ್ ನಂದಿನಿಗೆ ಸ್ವಾಗತ
            </h1>
            <p className="text-[#595959]">ಲಕ್ಷಾಂತರ ಗ್ರಾಹಕರ ಮೆಚ್ಚಿಗೆಯ ಬ್ರಾಂಡ್</p>
          </div>
          <div className="w-full relative z-10">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              ref={(r) => r.s}
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
              spaceBetween={40}
              slidesPerView={3}
              navigation={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop={true}
              className="max-w-7xl">
              {homeCards?.data?.map((card, id) => {
                const {
                  attributes: {
                    image: {
                      data: {
                        attributes: { url: imgUrl }
                      }
                    },
                    title,
                    link
                  }
                } = card;

                return (
                  <SwiperSlide className="swiper-sldier-card lg:p-10" key={id}>
                    <Card imgUrl={imgUrl} title={title} link={link} />
                  </SwiperSlide>
                );
              })}
              <NextSlider />
            </Swiper>
          </div>
        </div>
      </section>

      <ParallaxBanner
        layers={[
          { image: '/images/home-about.png', speed: -20 },
          { speed: -15, children: <div></div> } // Adjust if a specific element is needed
        ]}
        className="w-full  object-contain">
        <section className="w-full h-auto md:h-[600px] p-2 md:p-5 md:pt-12">
          <div className="md:mt-10 w-full space-y-5 flex flex-col justify-center items-center m-auto max-w-7xl">
            <div className="w-full h-full flex md:flex-row justify-center items-center">
              <Fade left>
                <div className="flex relative w-full justify-center items-center flex-col space-y-7  lg:items-center lg:max-w-5xl lg:pr-10 bg-img">
                  <h1 className=" uppercase text-xs md:text-2xl font-heading text-center w-full shadow-md p-3 shadow-black bg-primary-gradient text-white">
                  ಕಹಾಮ ಬಗ್ಗೆ

                  </h1>
                  <div className="space-y-6">
                    <TypeWriter text={homedetails?.[0]?.about1 || ''} delay={70} />
                  </div>
                </div>
              </Fade>
              <Fade right>
                <div className="flex relative h-full w-full justify-center items-center flex-col space-y-7 mt-4 p-2 md:p-6 z-10 lg:items-center lg:max-w-5xl lg:pr-10 bg-img-2">
                  <h1 className="text-xs md:text-2xl font-heading text-center w-full shadow-md p-3 shadow-black bg-primary-gradient text-white">
                  ನಮ್ಮ ಬ್ರಾಂಡ್ ನಂದಿನಿ

                  </h1>
                  <div className="space-y-6">
                    <TypeWriter text={homedetails?.[0]?.about2 || ''} delay={70} />
                  </div>
                </div>
              </Fade>
            </div>
            <Fade bottom>
              <Link
                href="/kn/about/company-profile"
                className="bg-primary-main flex justify-center items-center w-48 h-12 z-30 text-xs md:text-lg text-neutral-light4 font-semibold rounded-md">
                ಮತ್ತಷ್ಟು ಓದು
              </Link>
            </Fade>
          </div>
        </section>
      </ParallaxBanner>

      <section className="w-full h-fit relative">
        <Fade bottom>
          <img
            src="/images/Curve.svg"
            className="absolute inset-0 w-full h-full object-contain hidden md:block"
            alt="Decorative Curve"
          />
        </Fade>

       

        <div className="relative bg-[#30ABDC] md:bg-transparent p-5">
          <div className="pb-10 lg:space-x-10 flex flex-col-reverse justify-center items-center lg:flex-row m-auto max-w-7xl">
            <Fade left>
              <div className="p-4 flex justify-center items-center w-full h-auto md:h-[500px] lg:max-w-xl">
                <img
                  src={locale === 'kn' ? milkglassKnImg.src : milkglassImg.src}
                  className="w-full h-full"
                  alt="Milk Glass"
                />
              </div>
            </Fade>

            <div className="flex flex-col justify-center space-y-10 items-center">
              <Fade right>
                <div className="flex relative w-full justify-center items-center flex-col space-y-3 md:pt-20 lg:items-start lg:max-w-[60rem] lg:pr-10">
                  <h1 className=" text-xs md:text-2xl font-heading text-center w-full shadow-md p-3 shadow-black bg-primary-gradient text-white">
                  ಹಾಲಿನ ಬಗ್ಗೆ

                  </h1>

                  <div className="space-y-6">
                    <p className="text-justify text-xs md:text-lg text-white">
                      {locale === 'en'
                        ? "Milk is a nutrient-rich beverage, widely consumed for its high calcium content essential for bone health. It is a source of protein, vitamins, and minerals, contributing to overall well-being. Varieties include cow's milk, known for its widespread availability, and alternatives like almond or soy milk for those with dietary preferences or lactose intolerance. Milk's versatility extends to culinary uses, featuring prominently in recipes from creamy desserts to savory dishes, showcasing its cultural and nutritional significance in various global cuisines."
                        : 'ಹಾಲು ಪೌಷ್ಟಿಕಾಂಶ-ಭರಿತ ಪಾನೀಯವಾಗಿದ್ದು, ಮಾನವನ ಮೂಳೆಗಳ ಆರೋಗ್ಯಕ್ಕೆ ಅಗತ್ಯವಾದ ಹೆಚ್ಚಿನ ಕ್ಯಾಲ್ಸಿಯಂ ಅನ್ನು ಒದಗಿಸುತ್ತಿದೆ. ಇದು ಪ್ರೋಟೀನ್, ಜೀವಸತ್ವಗಳು ಮತ್ತು ಖನಿಜಗಳ ಮೂಲವಾಗಿದ್ದು, ಒಟ್ಟಾರೆ ಮನುಷ್ಯನ ಸರ್ವಾಂಗಿಣ ಬೆಳವಣಿಗೆಗೆ ತುಂಬಾ ಅಗತ್ಯವಾಗಿದೆ. ಹಾಲಿನ ವಿಧಗಳಲ್ಲಿ ಹಸುವಿನ ಹಾಲು ತುಂಬಾ ಹೆಸರುವಾಸಿಯಾಗಿದ್ದು, ವ್ಯಾಪಕವಾಗಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಲಭ್ಯವಿದೆ. ಇದಲ್ಲದೇ, ಲ್ಯಾಕ್ಟೋಸ್ ಅಂಶಗಳ ಅಲರ್ಜಿ ಹೊಂದಿದವರಿಗೆ ಹಾಗೂ ಬಾದಾಮಿ ಅಥವಾ ಸೋಯಾ ಹಾಲಿನಂತಹ ಪರ್ಯಾಯ ಸುಹಾಸಿತ ಹಾಲುಗಳು ಲಭ್ಯವಿರುತ್ತದೆ. ಹಾಲಿನಿಂದ ವಿವಿಧ ತೆರನಾದ ಭಕ್ಷಗಳನ್ನು ಮತ್ತು ಸಿಹಿಪಾಕವನ್ನು ತಯಾರಿಸಲಾಗುತ್ತದೆ, ಕೆನೆ ಸಿಹಿತಿಂಡಿಗಳಿಂದ ಖಾರದ ಭಕ್ಷ್ಯಗಳ ತಯಾರಿಕೆಯಲ್ಲಿ ಹಾಲನ್ನು ಪ್ರಮುಖವಾಗಿ ಉಪಯೋಗಿತ್ತಿದ್ದು, ವಿವಿಧ ಜಾಗತಿಕ ಪಾಕಪದ್ಧತಿಗಳಲ್ಲಿ ಹಾಲು ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶದ ಮಹತ್ವವನ್ನು ಒತ್ತಿ ಹೇಳುತ್ತಿದೆ'}
                    </p>
                  </div>
                </div>
              </Fade>

              <KnmModel closeModal={isModalOpen} kymMilk={knowMilkItem} close={setIsModalOpen} />

              <div className="w-full grid grid-cols-2 justify-center p-6  items-center ">
                {knowYourMilk?.data?.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleKnowMilk(item)}
                    className="flex w-32 flex-col justify-center items-center space-y-4 cursor-pointer">
                    <img
                      src={item?.attributes?.image?.data[0].attributes?.url}
                      alt={item?.attributes?.title}
                      className="transition-all duration-200 hover:scale-110"
                    />
                    <p className="text-white text-xs md:text-lg text-center font-heading">
                      {item?.attributes?.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-auto relative">
      <img
          src="/images/footer-top.jpg"
          className="absolute top-[87px] w-full h-full object-cover z-[-1]"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          alt="Footer Top"
        />
        <div className="p-2 flex flex-col items-center space-y-10 justify-center max-w-[1600px] md:items-start m-auto">
          <div className="flex w-full flex-col justify-center items-center space-y-3">
            <h1 className=" text-xs md:text-2xl font-heading text-center w-full max-w-96 shadow-md p-3 shadow-black bg-primary-gradient text-white">
            ಅಧಿಸೂಚನೆ
            </h1>
          </div>

          <div className="w-full flex flex-col space-y-4 items-center lg:space-y-0 lg:flex-row lg:space-x-2 lg:items-start">
            <div className="relative w-full overflow-scroll flex flex-col max-w-[300px] md:max-w-[400px] overflow-x-hidden overflow-y-hidden">
              <div className="w-full flex flex-col shadow-2xl shadow-blue-300 overflow-hidden justify-center h-[425px] items-center rounded-lg border-2 border-primary-main">
                <div className="w-full h-[90px] shadow-black shadow-md bg-white z-30">
                  <h1 className="p-5 bg-primary-gradient text-white uppercase text-center">
                  ಟೆಂಡರ್ ಅಧಿಸೂಚನೆಗಳು
                  </h1>
                </div>
                <div
                  className="w-full h-[375px] p-4 marquee flex flex-col"
                  style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
                  {currentYearData
                    ?.sort((a, b) => b.attributes.createdAt - a.attributes.createdAt)
                    ?.map((item, id) => {
                      return (
                        <div
                          key={id}
                          className="bg-white border m-2 p-2 text-xs flex justify-center items-center space-x-2 rounded w-full ">
                          <FaRegHandPointRight size={20} color="red" />
                          <p className="w-full "> {item?.attributes?.title}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-full flex justify-end mt-3 rounded-md">
                <Link href={'/kn/blog/notification'} className="p-2 bg-primary-main text-white ">
                  ಮತ್ತಷ್ಟು ಓದು
                </Link>
              </div>
            </div>

            <div className="relative w-full overflow-auto flex flex-col justify-center items-start space-y-5 ">
              <div className="w-full flex flex-col shadow-md overflow-hidden space-y-4 justify-center items-center h-[430px]  rounded-lg">
                <h1 className="p-5 bg-primary-gradient text-white uppercase text-center">
                ಹೊಸ ನಂದಿನಿ ಉತ್ಪನ್ನಗಳು

                </h1>
                <div className="marquee-notification h-full flex justify-evenly space-x-3">
                  {product?.map((item, id) => {
                    return (
                      <ArrivalCard
                        key={id}
                        title={item?.attributes?.name}
                        imgUrl={item?.attributes?.image?.data?.[0]?.attributes?.url}
                        link={`/kn/our-product/${item?.attributes?.subcategory?.data?.id}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINK  */}

      <section className=" relative w-full h-auto pt-5 pb-5  z-[10]      ">
        <video
          src="/video/vid.webm"
          autoPlay
          muted
          loop
          className="absolute w-full h-full inset-0 object-contain   z-[-10] opacity-[.3]"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <Fade bottom>
            <div className="flex flex-col justify-center items-center w-60 h-4 pb-10">
              <h1 className="uppercase md:text-xl text-xs font-heading text-center w-full shadow-md p-4 shadow-black bg-primary-gradient  text-white">
              ಕ್ವಿಕ್ ಲಿಂಕ
              </h1>
            </div>
          </Fade>

          <div className="  w-full h-auto  relative   ">
            <Fade bottom>
              <div className="max-w-max m-auto p-3 flex flex-col justify-center items-center gap-10 md:gap-40  sm:flex-row sm:justify-around sm:items-center sm:flex-wrap">
                <Link href="/kn/comingsoon">
                  <LinkCard title="Place Your Order" imgUrl={cartIco.src} />
                </Link>

                <Link href="/kn/blog/tv-commercial/6">
                  <LinkCard title="Dairy Tour" imgUrl={locationIco.src} />
                </Link>
                <Link href="/kn/blog/tv-commercial/">
                  <LinkCard title="Nandini Commercials" imgUrl={commercialIco.src} />
                </Link>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <section className="w-full h-fit relative pt-20 pb-20     ">
        <div className=" p-10 w-full flex flex-col items-center space-y-10 justify-center max-w-[1600px] md:items-start m-auto">
          <div className="flex  w-full flex-col justify-center items-center  space-y-3 md:items-start">
            <Zoom>
              <div className="flex justify-center w-full    flex-wrap   items-end  ">
                <h1 className=" text-2xl md:text-5xl  text-center uppercase text-primary-gradient font-josefin w-full max-w-2xl  p-3 ">
                ಕೆಎಂಎಫ್ ನಂದಿನಿಗೆ ಸ್ವಾಗತ
                </h1>
              </div>
            </Zoom>
          </div>

          <div className=" relative w-full h-[300px] md:h-[800px] flex justify-evenly items-center gap-5   flex-wrap">
            <div className="p-4 w-full h-full  flex justify-center items-center     ">
              

              <iframe
                src="https://www.youtube.com/embed/UAgaqU1kQeA?si=CNrdzt5pl7mkoLJq"
                muted
                autoPlay
                controls
                playsInline
                loop
                className="w-full h-full "></iframe>
            </div>
          </div>

          <div className="w-full flex justify-center  space-x-5">
            <Link href={'/kn/blog/gallery'}>
              <button className="w-44 h-5 border transition-all duration-300 uppercase bg-primary-main text-white p-5 flex items-center justify-center  rounded-full hover:scale-[1.1] hover:bg-secondary-darker   ">
                See more
              </button>
            </Link>

            <Link href={'/kn/contact'}>
              <button className="w-44 h-5 border uppercase transition-all duration-300  bg-primary-main text-white p-5 flex items-center justify-center  rounded-full hover:scale-[1.1] hover:bg-secondary-darker    ">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full h-auto relative">
        <div className="p-4 md:p-10 flex flex-col items-center space-y-10 justify-center max-w-[1600px] md:items-start md:m-auto">
          <div className="w-full justify-center flex items-center space-y-3">
            <h1 className="text-xs md:text-2xl font-heading uppercase text-center w-full max-w-96 shadow-md p-3 shadow-black bg-primary-gradient text-white">
              Our Certificates
            </h1>
          </div>

          <div className={`w-full max-w-[2xl] mb-5 flex justify-center items-center space-x-7  `}>
            <Swiper
              watchSlidesProgress={true}
              slidesPerView={3}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              className="w-full">
              {certificates?.data?.[0]?.attributes?.image?.data?.map((item, idx) => {
                return (
                  <SwiperSlide key={idx} className="w-72 md:m-auto">
                    <div className="max-w-96 h-40   m-auto   bg-white border-orange-500-500 p-2 border-orange-400 border-8 rounded-lg">
                      <img
                        src={item?.attributes?.url}
                        alt={`Certificate ${idx + 1}`}
                        className="w-96 h-32 object-contain rounded-md inline-block"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION  */}

      <Footer />
    </div>
  );
};

export default Home;
