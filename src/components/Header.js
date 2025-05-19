'use client';

import {  useEffect, useState } from 'react';
import logo from '@/images/logo/logo.png';
import logokn from '@/images/logo/logo-kn.png';
import rotatedLogo from '@/images/logo/logo-letter.png';

import AccordionItem from '@/components/Accordion';
import { mobileHeader } from '@/configtext/header';
import downarrowIco from '@/images/icons/downarrow.svg';
import uparrowIco from '@/images/icons/uparrow.svg';
import locationIco from '@/images/header-ico/location.svg';
import contactIco from '@/images/header-ico/contact.svg';
 

import { RxCrossCircled } from 'react-icons/rx';
import useLocale from '@/hooks/useLocale';
import Link from 'next/link';

import facebookIco from '@/images/footer/FB.svg';
import mailIco from '@/images/footer/Email.svg';
import twitterIco from '@/images/footer/X.svg';
import insta from '@/images/footer/insta.svg';
import ytIco from '@/images/footer/yt.svg';
import { FaLocationDot } from "react-icons/fa6";
import useApi from '@/hooks/useApi';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMyContext } from '@/context/headerContext';
import { RiMenuAddFill } from "react-icons/ri";
import { MdCall, MdLocationOn } from 'react-icons/md';
 
 
export const Header = () => {
  const [openAccordion, SetOpenAccordion] = useState(null);
  
  const [open, setOpen] = useState(null);
  const [productSub, setProductSub] = useState([]);
  const [unionSub, setUnionSub] = useState([]);
  const [kmfUnits, setKmfUnits] = useState([]);
  const [headerItem, setHeaderItem] = useState([]);
  const [latestNews, setLateatNews] = useState([]);
  const { locale } = useLocale();
  const axios = useApi();
  let headItem = mobileHeader[locale];
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
 const {isScroll,setIsScroll,id,setId}=useMyContext()
 const [products,setProducts]=useState([])
 const [rotateLogo, setRotateLogo] = useState(false); // State to control logo rotation
  const {openNav,setOpenNav} =useMyContext()
 useEffect(() => {
   // When component mounts, trigger logo rotation after 1 second
   const timeout = setInterval(() => {
     setRotateLogo(true);
   }, 1000);

   return () => clearInterval(timeout);
 }, []);
 
  useEffect(() => {
   
    (async () => {
       
      const { data } = await axios.get('/api/subcategories?sort[0]=createdAt:asc');
      const { data: milkunion } = await axios.get('/api/milk-unions?sort[0]=order:asc');
      const { data: kmfUnit } = await axios.get('/api/units-of-kmfs?sort[0]=order:asc');
      const { data: header } = await axios.get('/api/header');
      const {data:product}=await axios.get('/api/product-sub-items?sort[0]=createdAt:asc')
 
 
      
      // const {data:latestNews}=await axios.get('/api/latest-new')

      const productSubitems = data?.data?.map((category, idx) => {
        
        return {
          title: category?.attributes?.title,
          link: `/${locale}/our-product/${category?.id}`,
          product:product?.data?.filter(item=>item?.attributes?.subcategory?.data?.attributes?.title===category?.attributes?.title),
          id:category?.attributes?.category?.data?.id

        };
      });
 
       
      const unionSubitems = milkunion?.data?.map((category, idx) => {
        return {
          title: category?.attributes?.name,
          link: `/${locale}/milk-union/${category?.id}`
        };
      });

       
      const kmfSubitems = kmfUnit?.data?.map((category, idx) => {
        return {
          title: category?.attributes?.title,
          link: `/${locale}/kmf-unit/${category?.id}`
        };
      });

      setUnionSub(unionSubitems);
      setProductSub(productSubitems);
      setKmfUnits(kmfSubitems);
      setHeaderItem(header?.data);
      setLateatNews(latestNews?.data);
      setProducts(product.data)
    })();
  }, [params.locale]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 153;
      if(scrollPosition>threshold) setIsScroll(true)
     

      setIsSticky(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  for (let i = 0; i < headItem?.length; i++) {
    // if (headItem[i].title === 'OUR PRODUCTS' || headItem[i].title === 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು') {
    //   headItem[i].subItems =[...productSub]
      
    // }
    if (headItem[i].title === 'MILK UNIONS' || headItem[i].title === 'ಹಾಲು ಒಕ್ಕೂಟಗಳು') {
      headItem[i].subItems =unionSub
    }
    if (headItem[i].title === 'KMF UNITS' || headItem[i].title === 'ಕಹಾಮ ಘಟಕಗಳು') {
      headItem[i].subItems = kmfUnits;
    }
  }

  const handleLanguageChange = () => {
    
    if (pathname === '/kn') {
      return router.push('/');
    }
    if (pathname === '/') {
      return router.push('/kn');
    }
    const newLanguagePrefix = pathname.startsWith('/kn') ? '/en' : '/kn';
    const newUrl = pathname.replace(/^\/(kn|en)\//, newLanguagePrefix + '/');
    router.push(newUrl);
  };

  const arrows = {
    down: downarrowIco.src,
    up: uparrowIco.src
  };

  const handleAccordionClick = (accordionId) => {
    SetOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };
  
  const handleMainHeader=(idx)=>{
  
    setOpen(null)
    setId(idx)
  }

  const headerPathname=pathname===`/${locale}/portfolio`
 


  return (
    <>
      <div className={` w-full h-full relative z-20  ${isScroll?'block':'hidden'}  `}>

        <Link href={`/${locale}/offers/`} className='w-20 h-15 fixed z-[10] right-5 top-2'>

            <img src='/poster/offer.gif' className='w-full h-full'/>
        </Link>
        {/* UPPER HEADER  */}

        <div className={`w-full `}>
          <div
            className={`w-full h-[120px] md:h-[150px] relative   bg-white p-2 md:p-10 flex justify-between items-center ${headerPathname?'hidden':''}  `}
            onMouseEnter={() => setOpen(null)}>
            <div className=" max-w-xl flex justify-center items-center space-x-3">
            <img
          src={locale === 'kn' ? logokn.src : logo.src} // Use rotated logo when rotateLogo is true
          alt="logo-home"
          className={`w-[70px] sm:w-[150px] ${rotateLogo ? '' : ''}`} // Apply rotation class
        />
              <p className={`font-extrabold font-heading   ${locale==='kn'?'text-[12px] sm:text-[18px]':'text-[9px] sm:text-[14px]'}`}>
                {headerItem?.attributes?.title}
              </p>
            </div>

            <div className="flex md:flex-col h-full md:h-fit flex-col-reverse   ">
              <div className="flex justify-center items-end space-x-5">
                <div className="  hidden lg:flex lg:flex-col  justify-start items-start space-y-2    ">
                  <div className="w-full flex space-x-5">
                    <div className="flex justify-center items-center      ">
                      <div className="mr-2">
                     <MdLocationOn size={30} color='red' className='transition-all duration-150 hover:scale-[1.1] cursor-pointer'/>
                      </div>

                      <p className={` font-heading flex flex-col font-black/10 ${locale==='kn'?'text-[15px]':'text-[12px]'}  `}>
                        {headerItem?.attributes?.address?.map((item, id) => {
                          return (
                            <span key={id} className="block">
                              {item?.children[0]?.text}
                            </span>
                          );
                        })}
                      </p>
                    </div>

                    <div className="flex space-x-5 justify-center p-2  items-center">
                      <Link
                        href={'https://www.facebook.com/kmfnandini.coop'}
                        className="hover:scale-125 transition-all duration-300">
                        <img src={facebookIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://twitter.com/kmfnandinimilk'}
                        className="hover:scale-125 transition-all duration-300">
                        <img src={twitterIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://www.kmfnandini.coop/en/contact-us'}
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img src={mailIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.instagram.com/kmfnandini.coop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img src={insta.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.youtube.com/@kmfnandini12'
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img src={ytIco.src} className="w-7" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex justify-center items-center   ">
                    <div className='mr-2'>
                     <MdCall size={30} color='#30ABDC' className='transition-all duration-150 hover:scale-[1.1] cursor-pointer'/>
                    </div>
                    <p className="text-[12px] w-[350px] font-heading  font-black/10 ">
                      {headerItem?.attributes?.time?.map((item, id) => {
                        return (
                          <span key={id} className="block ">
                            {item?.children[0]?.text}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between  space-y-3">
                  <button
                    className="bg-primary-main  w-16 h-5 md:w-[100px] md:h-[36px]  text-neutral-light4 text-xs font-semibold rounded-md "
                    onClick={handleLanguageChange}>
                    {locale === 'en' ? 'ಕನ್ನಡ' : 'English'}
                  </button>
                </div>
              </div>

              <p className="text-sm text-red-600 font-bold flex justify-end pt-4 marquee-notification overflow-hidden">
                {latestNews ? latestNews?.attributes?.title : ''}
              </p>
            </div>
          </div>

          {/* MAIN HEADER DOWN  */}

          <div className={`w-full    ${isSticky ? 'sticky-header  bg-[#06498a63]':'bg-primary-gradient'} `}>
            <div
              className={`w-full max-w-[85%] h-[50px]  m-auto p-5 z-20 relative   `}>
              <div className=" w-full h-full flex justify-between items-center lg:hidden ">
                <div onClick={() => setOpenNav((prev) => !prev)}>
                      <RiMenuAddFill size={30} color='white'/>
                </div>
              </div>

              <div className="w-full h-full hidden lg:block   ">
                <ul className=" h-full w-full text-light-light4 flex   space-x-2 items-center text-[12px]">
                  {headItem?.map((header, i) => {
                    const hasItems = header?.subItems?.length;
                    const isLink = header?.link;
                   
                    const isVirtual=header.title==='VIRTUAL TOUR'|| header.title==='ವರ್ಚುವಲ್ ಟೂರ್'
                   
                    
                      return (
                        <Link
                          href={isLink ? isLink : '#'}
                          target={isVirtual?'_blank':'_self'}
                          key={i}
                          className={` transition-all duration-300 hover:scale-[1.1] ${isVirtual?'pluse':''}`}>
                          <li
                            className="  text-[8px] sm:text-[10px] lg:text-[12px]  border-light-light4 pl-2 pr-2 relative hover:text-secondary-lighter "
                            onMouseEnter={() => setOpen(hasItems ? i : null)}>
                            {header.title}
                            {hasItems && (
                              <div
                                className={`p-4 bg-primary-darker z-50 absolute   top-[2.71rem] left-[20px] w-[200px] overflow-auto max-h-[300px] ${
                                  open === i ? 'visible' : 'invisible'
                                }  `}
                                onMouseLeave={() => setOpen(null)}>
                                <ul className="w-full  space-y-4 text-white">
                                  {header.subItems?.map((subItem, idx) => {
                                  
                                    return (
                                      <Link
                                        href={subItem?.link || ''}
                                        className="text-[12px] block hover:text-secondary-lighter"
                                        key={idx}
                                        onClick={() => setOpen(null)}>
                                        <li key={idx}>
                                          {subItem.title}
                                          

                                       
                                          </li>
                                      </Link>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </li>
                        </Link>
                      );
                     
                  
                  })}
                </ul>
              </div>
            </div>
          </div>
   
        </div>
       

 

        <div
          className={`w-full h-screen  bg-[#0E86E7] fixed top-0 z-[20] overflow-scroll   lg:hidden  ${
            openNav ? 'left-0 ' : 'left-[-1200px]   '
          }`}
          style={{ transition: 'all .8s' }}>
          <div className='w-full'>
            <div className="flex justify-end items-center p-5">
              <RxCrossCircled size={40} color="white" onClick={() => setOpenNav((prev) => !prev)} />
            </div>

            <div className="flex justify-center items-center">
            <img
          src={locale === 'kn' ? logokn.src : logo.src} // Use rotated logo when rotateLogo is true
          alt="logo-home"
          className={`w-[70px] sm:w-[150px] ${rotateLogo ? '' : ''}`} // Apply rotation class
        />
            </div>

            
            <div className=" w-full  max-w-40 m-auto space-x-5 mt-10  flex justify-center items-center      ">
                      <div className="w-fit">
                      <FaLocationDot color='white' />
                      </div>

                      <p className={`w-full text-white font-heading flex flex-col font-black/10 ${locale==='kn'?'text-[10px]':'text-[10px]'}  `}>
                        {headerItem?.attributes?.address?.map((item, id) => {
                          return (
                            <span key={id} className="block">
                              {item?.children[0]?.text}
                            </span>
                          );
                        })}
                      </p>
           </div>


           <div className=" w-full   p-2 m-auto space-x-5     flex justify-center items-center      ">
                     

                      <p className={`w-full text-white text-center font-heading flex flex-col font-black/10 ${locale==='kn'?'text-[10px]':'text-[10px]'}  `}>
                        {headerItem?.attributes?.time?.map((item, id) => {
                          return (
                            <span key={id} className="block">
                              {item?.children[0]?.text}
                            </span>
                          );
                        })}
                      </p>
           </div>

           <div className="flex space-x-5 justify-center p-2  items-center">
                      <Link
                        href={'https://www.facebook.com/kmfnandini.coop'}
                        className="hover:scale-125 transition-all duration-300">
                        <img src={facebookIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://twitter.com/kmfnandinimilk'}
                        className="hover:scale-125 transition-all duration-300">
                        <img src={twitterIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={'https://www.kmfnandini.coop/en/contact-us'}
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img src={mailIco.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.instagram.com/kmfnandini.coop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img src={insta.src} className="w-7" />
                      </Link>
                      <Link
                        href={
                          'https://www.youtube.com/@kmfnandini12'
                        }
                        className="hover:scale-125 transition-all duration-300">
                        {' '}
                        <img src={ytIco.src} className="w-7" />
                      </Link>
                    </div>

            <div>
              <ul className="overflow-auto">
                {headItem?.map((items, idx) => {
                  const hasItems = items?.subItems?.length;
                  if (hasItems) {
                    return (
                      <AccordionItem
                        title={items.title}
                        id={idx}
                        open={openAccordion == idx}
                        arrow={arrows}
                        onToggle={handleAccordionClick}
                        key={idx}>
                        <ul className="">
                          {items?.subItems?.map((items, index) => {
                            return (
                              <Link
                                href={items?.link || ''}
                                key={index}
                                onClick={() => setOpenNav((prev) => !prev)}>
                                <li
                                  key={index}
                                  className="flex items-center  relative  text-light-light4 border-b-2 border-b-light-light4 pb-2 space-x-3 ">
                                  <span>{items.title}</span>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </AccordionItem>
                    );
                  } else {
                    return (
                      <Link
                        href={items?.link || ''}
                        key={idx}
                        onClick={() => setOpenNav((prev) => !prev)}>
                        <li className=" " key={idx}>
                          <button className="flex items-center justify-between relative  text-light-light4 border-b-2 border-b-light4 p-4 w-full ">
                            <div className="flex space-x-2 ">
                              <span>{items.title}</span>
                            </div>
                          </button>
                        </li>
                      </Link>
                    );
                  }
                })}

                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

