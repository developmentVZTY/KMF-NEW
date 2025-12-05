'use client';

import React, { useEffect, useState } from 'react';
import Logo from '@/images/logo/logo.png';
import HeroImg from '@/images/milk-union/milk-union-home.png';
import unionMapImg from '@/images/milk-union/union-map.png';
import unit2 from '@/images/kmfunit/2.jpg';
import unit4 from '@/images/kmfunit/4.jpg';
import unit5 from '@/images/kmfunit/5.jpg';
import unit6 from '@/images/kmfunit/6.png';
import unit7 from '@/images/kmfunit/7.jpg';
import unit8 from '@/images/kmfunit/8.jpeg';

import UnionCard from './UnionCard';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useLocale from '@/hooks/useLocale';
import { IoHomeOutline } from 'react-icons/io5';
import { useMyContext } from '@/context/headerContext';

function KmfUnit() {
  const [kmfUnits, setKmfUnits] = useState([]);
  const Api = useApi();
  const params=useParams()
  const {isScroll} =useMyContext()
const locale=useLocale().locale
  useEffect(() => {
    (async () => {
      const { data } = await Api.get('/api/units-of-kmfs?sort[0]=createdAt:asc');
      
      setKmfUnits(data.data);
   
    })();
  }, []);

   const unitsData = [
  {
    img: "",
    link: "32",
    title: "Nandini Milk Products",
    description:
      "To meet the ever growing demand for milk based sweets, KMF has set up Nandini Milk Products Unit. This unit is specialized in production of milk based ethnic sweets such as Mysore pak, Peda, Khova, Premium Badam Burfi, Premium Cashew Burfi, Dry Fruits Burfi, Coconut Burfi, Chocolate Burfi, varieties of Peda like Kesar Peda, Elaichi Peda, Ready to Eat Khova Jamoon and Rosogolla, Nandini Bite, Jamoon mix and Badam powder."
  },
  {
    img: unit2.src,
    link: "38",
    title: "Nandini Packaging Film Plant",
    description:
      "KMF presently having the requirement of 950 to 1000 Mts of Packaging film... KMF established Nandini Packaging Film Plant in its own land of 4.5 acres located in Munnekolala Marathahalli, Bengaluru-560037 on 01-01-1998."
  },
  {
    img: "",
    link: "40",
    title: "Dempo Dairy Limited",
    description:
      "The Dempo Dairy Industries Limited, a sick unit Under the BIFR with a dairy at Aasangi, was taken over by KMF in 1993... The Plant is today an ISO-20000 certified."
  },
  {
    img: unit4.src,
    link: "49",
    title: "KMF Corporate Office",
    description:
      "The Corporate Office of the Karnataka Milk Federation is located on Dr.M.H.Marigowda Road in Bengaluru..."
  },
  {
    img: unit5.src,
    link: "51",
    title: "Training Centres",
    description:
      "The Central Training Institute (CTI) was established by KDDC (Karnataka Dairy Development Corporation)..."
  },
  {
    img: unit6.src,
    link: "53",
    title: "Mother Dairy",
    description:
      "Mother Dairy, Bengaluru, a flagship dairy of KMF having ISO22000:2005 Certification..."
  },
  {
    img: "",
    link: "55",
    title: "Nandini Hi Tech Product Plant Channarayapatna",
    description: "Background:"
  },
  {
    img: unit7.src,
    link: "57",
    title: "Cattle Feed Plants",
    description:
      "Nandini Cattle Feed is a top selling brand in India being an important input to milk production..."
  },
  {
    img: unit8.src,
    link: "59",
    title: "Nandini Sperm Station",
    description:
      "Artificial insemination is not only the popular technique in Animal Husbandry sector..."
  },
  {
    img: "",
    link: "61",
    title: "Ice Cream Plant, Ballari",
    description:
      "Ballari Nandini Ice Cream Plant, a unit of KMF was inaugurated and commissioned during Sept-2013..."
  },
  {
    img: "",
    link: "63",
    title: "KMF Depots",
    description: "KMF DEPOTS IN OPERATION"
  },
  {
    img: "",
    link: "65",
    title: "Nandini Mega Hi-Tech Powder Plant Ramanagara",
    description:
      "Karnataka Dairy development program which started in 1974 with the grant from World Bank was confined to 8 districts. In 1984 this program was brought under the Cooperative and the development of the same was done through Karnataka Milk Federation (KMF). Now under KMF there are 14 district milk unions which collect milk from milk producers at village level through milk societies, process the milk and the products are marketed under Nandini brand. Requirement to process the excess milk collected."
  }
];

  return (
    <div className={`w-full h-full absolute top-0 z-[-1]  ${isScroll?'top-36':''}`}>
      <section className={`w-full h-72 pt-28 relative  grid place-items-center company-bg`}>
        <img src={HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
        <img src={Logo.src} alt="milk-union-logo" className="w-[200px] " />
      </section>

   

      <section className="w-full    pt-10 ">
      <div className="   relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-4xl font-extrabold uppercase">
             {locale==='kn'?'':'KMF UNITS'}
              </h1>
            </div>
      <div className='flex justify-center space-x-3 items-center mt-10 border-b w-fit m-auto'>
        <Link className='font-bold hover:text-secondary-main' href={`${locale==='kn'?'/kn':'/'}`}><IoHomeOutline size={20} /></Link>
        <Link className='text-secondary-main font-bold ' href={`/${locale}/milk-union`}>/   {locale==="en" ?"KMF UNITS":"ಕಹಾಮ ಘಟಕಗಳು"}</Link>
      </div>

    
        <div className="max-w-7xl m-auto p-2 shadow-lg mt-10    shadow-white bg-white flex flex-col justify-center items-center space-y-5">
          {unitsData.map((item, index) => {
             
         
            return (
            
              <UnionCard
                key={index}
                idx={index}
                name={item.title}
                image={item.img || "/no-image.png"}
                description={item.description}
                link={`/${params.locale}/kmf-unit/${item.link}`}
            
              />
            
            );
          })}
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default KmfUnit;
