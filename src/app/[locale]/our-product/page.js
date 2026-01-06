'use client';
import React, { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import HeroImg from '@/images/milk-union/milk-union-home.png';
import pro1 from '@/images/product/all/1.png';
import pro2 from '@/images/product/all/2.png';
import pro3 from '@/images/product/all/3.jpg';
import pro4 from '@/images/product/all/4.jpg';
import pro5 from '@/images/product/all/5.jpg';
import pro6 from '@/images/product/all/6.jpg';
import pro7 from '@/images/product/all/7.png';
import pro8 from '@/images/product/all/8.png';
import pro9 from '@/images/product/all/9.png';
import pro10 from '@/images/product/all/10.png';
import pro11 from '@/images/product/all/11.png';
import pro12 from '@/images/product/all/12.jpg';
import pro13 from '@/images/product/all/13.jpg';
import pro14 from '@/images/product/all/14.png';
import pro15 from '@/images/product/all/15.jpg';
import pro16 from '@/images/product/all/16.png';
import pro17 from '@/images/product/all/17.png';
import pro18 from '@/images/product/all/18.png';
import pro19 from '@/images/product/all/19.jpg';
import pro20 from '@/images/product/all/20.png';
import pro21 from '@/images/product/all/21.png';
import pro22 from '@/images/product/all/22.png';
import pro23 from '@/images/product/all/23.png';
import pro24 from '@/images/product/all/24.jpg';
import pro25 from '@/images/product/all/25.jpg';
import pro26 from '@/images/product/all/26.png';
import pro27 from '@/images/product/all/27.png';
import pro28 from '@/images/product/all/28.jpg';
import pro29 from '@/images/product/all/29.png';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import ProductCard from './[slug]/ProductCard';
import useLocale from '@/hooks/useLocale';
import { useMyContext } from '@/context/headerContext';
import { Fade, Zoom } from 'react-reveal';
import Link from 'next/link';

function Products() {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [banner, setBanner] = useState();
  const [currentIdx,setCurrentIdx]=useState(0)
  const axios = useApi();
  const locale = useLocale().locale;
  const { isScroll, setIsScroll, id, setId } = useMyContext();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/categories?sort[0]=order:asc');
      const { data: subcategory } = await axios.get('/api/subcategories?sort[0]=createdAt:asc');

      setBanner(data?.data?.map((item) => item?.attributes?.banner?.data?.attributes?.url));
      setCategories(data.data?.sort((a, b) => b.attributes.createdAt - a.attributes?.createdAt));

      if (id) {
        const filterItems = subcategory?.data?.filter(
          (item) => item?.attributes?.category?.data?.id === parseInt(id)
        );
        setSubcategory(filterItems);
      } else {
        setSubcategory(subcategory.data);
      }
    })();
  }, [id]);

  const handleIdx=(idx)=>{
    setCurrentIdx(idx)
    setId(idx)
  }
  const handleProduct = async (id) => {
    const { data } = await axios.get(`/api/subcategories?sort[0]=createdAt:asc`);

    if (id === 'all') {
      setSubcategory(data.data);
    } else {
      const subcategory = data?.data?.filter(
        (item) => item?.attributes?.category?.data?.id === parseInt(id)
      );
      setSubcategory(subcategory);
    }
  };


const products = [
    {
      title: "MILK",
      image:
        pro1.src,
      link: "",
    },
    {
      title: "CURD",
      image:
        pro2.src,
        
      link: "",
    },
    {
      title: "GHEE",
      image:
        pro3.src,
      link: "",
    },
    {
      title: "BUTTER",
      image:
        pro4.src,
      link: "",
    },
    {
      title: "PANEER",
      image:
        pro5.src,
      link: "",
    },
    {
      title: "CHEESE",
      image:
        pro6.src,
      link: "",
    },
    {
      title: "FLAVORED MILK IN BOTTLES",
      image:
        pro7.src,
      link: "",
    },
    {
      title: "FLAVORED MILK IN TETRA",
      image:
        pro8.src,
      link: "",
    },
    {
      title: "PET BOTTLES",
      image:
        pro9.src,
      link: "",
    },
    {
      title: "Chocolates",
      image:
        pro10.src,
      link: "",
    },
    {
      title: "Rusk",
      image:
        pro11.src,
      link: "",
    },
    {
      title: "Cookies",
      image:
        pro12.src,
      link: "",
    },
    {
      title: "Bread & Bun",
      image:
        pro13.src,
      link: "",
    },
    {
      title: "Namkeens",
      image:
        pro14.src,
      link: "",
    },
    {
      title: "Instant Mix",
      image:
        pro15.src,
      link: "",
    },
    {
      title: "Frozen Foods",
      image:
        pro16.src,
      link: "",
    },
    {
      title: "Natural Ice-Cream",
      image:
        pro17.src,
      link: "",
    },
    {
      title: "Cassata",
      image:
        pro18.src,
      link: "",
    },
      {
      title: "Sundae",
      image:
        pro19.src,
      link: "",
    },
      {
      title: "Family Pack Ice-Cream",
      image:
        pro20.src,
      link: "",
    },
      {
      title: "Choco Bar",
      image:
        pro21.src,
      link: "",
    },
      {
      title: "Cone Ice-Cream",
      image:
        pro22.src,
      link: "",
    },
      {
      title: "Cup Ice-Creams",
      image:
        pro23.src,
      link: "",
    },
      {
      title: "Kulfi Ice-Cream",
      image:
        pro24.src,
      link: "",
    },
      {
      title: "GudBud",
      image:
        pro25.src,
      link: "",
    },
      {
      title: "Ice Cream Mockups",
      image:
        pro26.src,
      link: "",
    },
      {
      title: "Sweets",
      image:
        pro27.src,
      link: "",
    },
      {
      title: "Mlik Powder",
      image:
        pro28.src,
      link: "",
    },
      {
      title: "Nandini Good Life Milk",
      image:
        pro29.src,
      link: "",
    },
     

  ]

  const productCategories = [
  { id: 1, name: "All", slug: "all" },
  { id: 2, name: "Milk & Curd", slug: "milk-curd" },
  { id: 3, name: "Ghee & Butter", slug: "ghee-butter" },
  { id: 4, name: "Paneer & Cheese", slug: "paneer-cheese" },
  { id: 5, name: "Flavored Milks", slug: "flavored-milks" },
  { id: 6, name: "Chocolates", slug: "chocolates" },
  { id: 7, name: "Baked Items", slug: "baked-items" },
  { id: 8, name: "Instant Mixes", slug: "instant-mixes" },
  { id: 9, name: "Ice – Creams", slug: "ice-creams" },
  { id: 10, name: "Milk Powder", slug: "milk-powder" },
  { id: 11, name: "Namkeens", slug: "namkeens" },
  { id: 12, name: "Sweets", slug: "sweets" },
];




  return (
    <div className={`w-full h-full absolute  z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
      <section className={`w-full    h-full md:h-[700px] md:pt-28 relative  grid place-items-center `}>
        {/* <img src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
         */}
        <video
          src="/video/our-product.mp4"
          muted
          autoPlay
          loop
          controls
          playsInline
          className={`w-full  h-full  object-fill    absolute top-0   ${
            isScroll ? 'h-[400px]' : ''
          } `}
        />
      </section>

      <section className="w-full   max-w-[1500px]   m-auto mb-10">
      <div className=" mb-4 md:mb-24 mt-4 md:mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-3xl font-extrabold uppercase">
             {locale==='kn'?'ನಂದಿನಿ ಉತ್ಪನ್ನಗಳು':'Our Products'}
              </h1>
            </div>

        <div className="w-full  grid grid-cols-4 gap-4 p-2 md:grid-cols-7 lg:grid-flow-col   md:space-x-4 ">
          <p
            className="font-subheading transition-all w-full  text-center text-sm cursor-pointer  hover:scale-[1.1]"
            onClick={() => handleProduct('all')}>
          {locale==='kn'?'ಎಲ್ಲವೂ':'  All   '}
          </p>
          {categories?.map((item, id) => {
             
            return (

              <div  className='relative '  key={item?.id}>

               
                {item?.attributes?.hasNewProduct  &&
                <Zoom>
                 <img src='/images/product-new/new.gif' className='w-10 absolute left-5 -top-8'/>
                 </Zoom>
                }
               
               <Fade top>
                <Link
                href='#product-cards'
                onClick={() => handleIdx(item?.id)}
                className={`font-subheading w-full text-center transition-all duration-300 text-sm cursor-pointer  hover:scale-[1.3] ${item?.id===currentIdx?'text-primary-main underline pb-1':''} ${locale==='kn'?'text-sm':''} `}>
                {item?.attributes?.title}
                </Link>
                </Fade>
                </div>
              
            );
          })}
        </div>

        <div className="w-full h-full grid grid-cols-3 p-2 place-items-center    gap-5 pt-10" id='product-cards'>
          {subcategory?.map((item, idx) => {
            return (
              <ProductCard
                key={item?.idx}
                title={item?.attributes?.title}
                image={item?.attributes?.image?.data?.[0]?.attributes?.url}
                link={`/${locale}/our-product/${item?.id}`}
              />
            );
          })}
        </div>
      </section>
       
<Footer />
    </div>
  );
}

export default Products;
