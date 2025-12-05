'use client';
import React, { useEffect, useState } from 'react';
 import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/useApi';
import { useMyContext } from '@/context/headerContext';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PhotoProvider,PhotoView } from 'react-photo-view';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { IoHomeOutline } from 'react-icons/io5';

import { Fade, Zoom } from 'react-reveal';

function OrganizationChart() {
  const locale = useParams().locale;
  const axios= useApi()
  const [banner,setBanner]=useState([])
  const [quality,setQuality]=useState([])
  const { isScroll, setIsScroll, id, setId } = useMyContext();
  const [previewCount,setPreviewCount]=useState(1)
  useEffect(()=>{
    (
      async()=>{
        const {data:banner}=await axios.get('/api/food-safety')
        setQuality(banner.data)
        setBanner(banner?.data)
      }
    )()

     

  },[])

  useEffect(() => {
    const updateScreensize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 768) {
        setPreviewCount(3);
      } else {
        setPreviewCount(1);
      }
    };
    updateScreensize();
    window.addEventListener('resize', updateScreensize);
    return () => window.removeEventListener('resize', updateScreensize);
  },[]);


   const data = [
    {
      id: 1,
      product: "Milk and Milk Products",
      services: [
        "Quality & Compositional Parameters",
        "Adulteration in Milk & Ghee",
        "Minerals",
        "Fatty Acid Composition",
        "Pesticide Residues",
        "Antibiotic Residue",
        "Heavy Metals",
        "Microbial Parameters",
        "Aflatoxin M1",
      ],
    },
    {
      id: 2,
      product: "Cattle Feed and Feed Ingredients",
      services: ["Compositional Parameters", "Aflatoxin B1/B2/G1/G2"],
    },
    {
      id: 3,
      product: "Mineral Mixture",
      services: ["Compositional Parameters"],
    },
    {
      id: 4,
      product: "Oils and Fats",
      services: ["General Parameters", "Fatty Acid Composition"],
    },
    {
      id: 5,
      product: "Water",
      services: ["General Parameters", "Microbial Parameters"],
    },
    {
      id: 6,
      product: "Spices and Condiments",
      services: ["General Parameters"],
    },
    {
      id: 7,
      product: "Cereals & Cereal Products",
      services: ["General Parameters", "Heavy Metals", "Microbial Parameters"],
    },
    {
      id: 8,
      product: "Ready to Eat foods",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Pesticide Residues",
      ],
    },
    {
      id: 9,
      product: "Nuts and Nut Products",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Pesticide Residues",
        "Aflatoxin / Mycotoxin",
      ],
    },
    {
      id: 10,
      product: "Proprietary Food",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Pesticide Residues",
      ],
    },
    {
      id: 11,
      product: "Bakery Products",
      services: [
        "General Parameters",
        "Heavy Metals",
        "Microbial Parameters",
        "Mycotoxins",
      ],
    },
  ];
  const imageArr=['/images/quality/1.jpg','/images/quality/2.jpg','/images/quality/3.jpg','/images/quality/4.jpg','/images/quality/5.jpg','/images/quality/6.jpg','/images/quality/7.jpg','/images/quality/8.jpg','/images/quality/9.jpg','/images/quality/10.jpg','/images/quality/11.jpg','/images/quality/12.jpg','/images/quality/13.jpg','/images/quality/14.jpg','/images/quality/15.jpg','/images/quality/16.jpg','/images/quality/17.jpg','/images/quality/18.jpg','/images/quality/19.jpg','/images/quality/20.jpg']
  return (
    <div className={`w-full h-full absolute   z-[-1] ${isScroll ? ' md:top-48' : ''}  `}>
    <section className={`w-full h-full md:h-[700px] pt-28 relative  grid place-items-center `}>
     {/* <img src={banner?banner[0]:HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
      */}
     <video
       src={banner?.attributes?.banner?.data?.attributes?.url}
       muted
       autoPlay
       loop
       controls
       playsInline
       className={`w-full  h-full    object-cover absolute top-0  ${
         isScroll ? 'h-[400px]' : ''
       } `}
     />
   </section>

   <div className="flex w-full    justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
            <Link className="  text-sm font-bold  " href={`/${locale}/animal-husbandry/scheme` || ''}>
            <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={`/${locale}/our-product/`}>
             
              {locale==='kn'?'ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆ':' Quality Food Safety'}
            </Link>
            
          </div>

          <div className='w-full mt-20 relative m-auto h-auto     '>

          <div className="absolute w-full h-full z-[-10] ">
            <div className="w-full h-full flex justify-between items-center">
              <div className="w-20 md:w-40 h-8 bg-red-600"></div>
              <div className="w-20 md:w-40 h-8 bg-red-600"></div>
            </div>
          </div>
            <Swiper
           slidesPerView={previewCount}
              freeMode={true}
           
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Autoplay]}
              className="w-full max-w-[1400px] m-auto">

                 {imageArr.map((item,id)=>{
                 
                  return(
                    <SwiperSlide key={id} className='w-full' >
                     
                     <Zoom>
                    <PhotoProvider className='w-full' >
                        
                        <PhotoView src={item} height="400px"  >
                        <img className=' m-auto w-52 h-52 md:w-[400px] md:h-96 object-fill' src={item} alt="" />
                        </PhotoView>
                    
                  
                  </PhotoProvider>
          
          </Zoom>
                      </SwiperSlide>
                  )
                 })}
                     
                      
                      
                
            </Swiper>
             
        
          </div>

          <div className="   mt-20  relative w-full  flex justify-center items-center ">
            <Fade bottom>
            
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆ':'          Quality and Food Safety'}
              </h1>

              </Fade>
            </div>
    
      <section className=" relative w-full flex flex-col p-2     mb-10 max-w-7xl m-auto h-auto pt-20  ">
   
{/* {
  quality?.attributes?.content &&
  <BlocksRenderer
  content={quality?.attributes?.content}
  blocks={{

    
    paragraph: ({ children }) => (
      <Fade bottom>
      <p className="text-neutral900 w-full mb-3 mt-3">{children}</p>
      </Fade>
    ),
   
    heading: ({ children, level }) => {
      switch (level) {
        case 1:
          return <h1 className="text-2xl mt-2 mb-1 text-primary-main">{children}</h1>;
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
    list:({children})=>{
     
   
        return(
          <Fade bottom >
          {children}
          </Fade>
        )
    },

    
    code: ({ children }) => {
      const columns =
        children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
          ? children?.[0]?.props?.text.split(',').slice(1)
          : [];

      return (
        <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border      w-full ">
          <thead className=" text-left ">
            {columns?.map((item, id) => {
              if(id===0){
                return (
                  <th className="p-2 w-16   border-r border-black " key={id}>
                    {item}
                  </th>
                );
              }
              else{
                return (
                  <th className="p-2   border-r border-black " key={id}>
                    {item}
                  </th>
                );
              }
             
            })}
          </thead>
          <tbody className="text-left  text-md ">
            <tr className="w-full ">
              {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                children?.[0]?.props?.text?.split(',')?.map((item, id) => {
                  if(id===0){
                    return(
                      <td
                      className=" w-16 p-2 text-md font-content border-r border-black "
                      key={id}>
                      {' '}
                      {item}
                    </td>
                    )
                  }
                  return (
                    <td
                      className=" p-2 text-md font-content border-r border-black "
                      key={id}>
                      {' '}
                      {item}
                    </td>
                  );
                })}
            </tr>
          </tbody>
        </table>
      );
    },

   
    link: ({ children, url }) => <Link to={url}>{children}</Link>
  }}
    
  />
}
         
           */}



<p>
  During the last ten years, the Federation is giving greater emphasis on procuring quality milk from DCSs under the concept of “Quality Excellence from Cow to Consumer.” Many Clean Milk Production (CMP) initiatives have been implemented at all the stages of procurement, processing and marketing. Among these CMP initiatives, noteworthy initiative is the setting up of Community Milking Parlours in villages.
 <br />
 <br />
The KMF is forerunner to introduce this innovative technological initiative for bringing about revolutionary improvement in quality of milk collected in DCSs. This system has several advantages such as elimination of mastitis in milch animals and improvement of productivity. The milk from milking machines, collected through Automatic Computerized Milk Collection Units is chilled directly in Bulk Milk Coolers. This chilled raw milk, untouched and unadulterated by human hands, has very high microbiological quality, comparable to international standards. This high quality milk is being utilized for manufacturing high quality value added milk products, for both domestic as well as international markets.

</p>
<br />
<ul className='list-disc '>
  <li>Training of milk producers on modern dairy husbandry practices and Clean Milk Production (CMP).</li>
  <li>Providing Stainless Steel utensils, antiseptic solutions for udder cleaning on pre and post milking, etc. to producers.</li>
  <li>Training to DCS staff and officers of the Unions on Clean Milk Production (CMP).</li>
  <li>Replacing Aluminium milk cans and collection vessels with Stainless Steel – 304.</li>
  <li>Posters, documentary films and booklets on Clean Milk Production (CMP).</li>
</ul>

<br />
<br />

      <h1 className="text-2xl mt-2 mb-1 text-primary-main">1. Home</h1>

<p>Central Quality Assurance Laboratory (CQAL), KMF is an analytical laboratory at KMF Premises, Bengaluru. CQAL follows a quality management system based on ISO 17025:2017 and accredited for the same from NABL vide certificate Number (TC-7084) to ensure operational integrity and confidentiality.
<br />
<br />
With state-of-the-art equipment and qualified technical staff, CQAL offers a range of reliable and accurate analytical services in the field of Milk and dairy products, food and animal feed at an affordable cost to Units and Unions of KMF.

<br />
<br />
CQAL continually assesses its analytical competence by participating in the Proficiency Test (PT) programmes conducted at national and international levels.
<br />
<br />

CQAL follows regular quality control programmes to verify the accuracy of analytical methodologies by including in-house quality checks at various steps of analysis.

</p>
<br />
<br />


     <h1 className="text-2xl mt-2 mb-1 text-primary-main">Testing Methodologies followed at CQAL:
</h1>
<br />

     <p> CQAL follows standard analytical methods acceptable by regulatory agencies, including those published by:</p>
<br />

      <ul className='list-disc '>
        <li>Bureau of Indian Standards (BIS) – Bureau of Indian Standards - e-Sale (bsbedge.com)
</li>
        <li>Food Safety and Standards of India (FSSAI) – FSSAI
</li>
        <li>International Organisation for Standardisation (ISO) – International Organisation for Standardisation (ISO)
</li>
        <li>Association of Official Analytical Chemists (AOAC) – AOAC INTERNATIONAL - In Food & Agriculture, We Set the Standard</li>
        <li>International Dairy Federation (IDF) – IDF - Global Dairy Expertise Since 1903 (fil-idf.org)
</li>
        <li>CQAL also follows the methods published in National and International journals, after validation and verifications</li>
        <li>In-house validated and approved methods</li>
      </ul>







      <h1 className="text-2xl mt-2 mb-1 text-primary-main">2. Facilities:</h1>
<br />
     <p> Chemical Laboratory:
<br />
<br />
Laboratory has state-of-the-art equipment to cater to the needs of dairy, feed and food industry for quality analysis and regulatory compliance. Laboratory continuously endeavours to enhance analytical capacity and upgrades infrastructure to serve milk unions and units of KMF.
<br />
<br />

The major instruments of chemical laboratory are indicated as below:-

</p>
<br />
     <ul className='list-disc '>
  <li>Gas Chromatography Mass Spectrometry (GC-MS/MS)</li>
  <li>Liquid Chromatography Mass Spectrometry (LC-MS/MS)</li>
  <li>Induced Coupled Plasma Mass Spectrometer (ICP-MS)</li>
  <li>Microwave digester</li>
  <li>High Performance Liquid Chromatography (HPLC)</li>
  <li>Automatic Fibre Analyser</li>
  <li>Automatic Fat Analyser</li>
  <li>Automatic Protein Analyser</li>
  <li>Multipurpose Ion Selective Electrode (ISE) Meter</li>
  <li>UV-Spectrophotometer</li>
  <li>Refractometer</li>
  <li>FTIR based Milk Analyser</li>
  <li>Centrifuge</li>
  <li>Electronic weighing balance</li>
  <li>Hot air oven</li>
  <li>Glassware Washer</li>
  <li>Ultrapure Water Purification System</li>
  <li>Muffle furnace</li>
  <li>Shaking Incubator</li>
  <li>Heating water bath</li>
  <li>Nitrogen Evaporator</li>
  <li>Refrigerated Centrifuge</li>
  <li>pH Meter</li>
  <li>Viscometer</li>
  <li>Vacuum Oven</li>
  <li>Turbidity Meter</li>
  <li>Conductivity Meter</li>
</ul>







      <h1 className="text-2xl mt-2 mb-1 text-primary-main">Microbiological Laboratory</h1>
<br />
     <p>The microbiology laboratory of CQAL has all the instruments to meet the requirements of industry and regulatory bodies for testing microbial load and pathogens.

 </p>
<br />
      <ul className='list-disc '>
  <li>Biosafety Cabinet</li>
  <li>Bacteria and Somatic Cell Analyser</li>
  <li>Incubators – Bacteriological & BOD</li>
  <li>Low Temperature Incubators</li>
  <li>Stability Chamber</li>
  <li>Water Bath</li>
  <li>Sample Dilutor</li>
  <li>Sample Homogeniser</li>
  <li>Laminar Air Flow Unit</li>
  <li>Microscope</li>
  <li>Pathogen Detection System</li>
  <li>Weighing Balance</li>
  <li>Autoclave</li>
</ul>






      <h1 className="text-2xl mt-2 mb-1 text-primary-main">3 Accreditations:</h1>
<br />
     <p> CQAL has been accredited as per the ISO/IEC 17025 by the National Accreditation Board for Testing and Calibration Laboratories (NABL) in 2017 and the accreditation is renewed periodically for chemical testing.

<br />
<br />
NABL Certificate Scope of Accreditation

</p>
<br />
     <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-black text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black px-3 py-2 text-left">Sr.No</th>
            <th className="border border-black px-3 py-2 text-left">Product Name</th>
            <th className="border border-black px-3 py-2 text-left">Services</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className={row.id % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="border border-black px-3 py-2 align-top">{row.id}</td>
              <td className="border border-black px-3 py-2 align-top">{row.product}</td>
              <td className="border border-black px-3 py-2 align-top">
                <ul className="list-disc ml-4">
                  {row.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



      <h1 className="text-2xl mt-2 mb-1 text-primary-main">Quality & Compositional Parameters</h1>
<br />
     <p> </p>
<br />
     <ul className='list-disc '>
  <li>Total Ash</li>
  <li>Acid value of extracted fat</li>
  <li>Acidity as Oleic Acid</li>
  <li>Acidity as Lactic acid</li>
  <li>Acidity of extracted fat</li>
  <li>Alcoholic acidity</li>
  <li>Bulk density</li>
  <li>Viscosity</li>
  <li>Butyrorefractrometer reading</li>
  <li>Carbohydrates</li>
  <li>Concentration of syrup</li>
  <li>Crude Fiber</li>
  <li>Curd content</li>
  <li>Detection of Sesame Oil (Baudouin Test)</li>
  <li>Fat</li>
  <li>Free fatty acids</li>
  <li>Insolubility index</li>
  <li>Iodine value</li>
  <li>Lactose</li>
  <li>Leavening Index</li>
  <li>Milk Fat</li>
  <li>Moisture</li>
  <li>Over run</li>
  <li>Peroxide value</li>
  <li>pH</li>
  <li>Polenske value</li>
  <li>Protein</li>
  <li>Refractive index</li>
  <li>Reichert–Meissl value</li>
  <li>RM Value of extracted fat</li>
  <li>Salt</li>
  <li>Saponification value</li>
  <li>Solids Not Fat (SNF)</li>
  <li>Scorched Particles</li>
  <li>Starch</li>
  <li>Sterility (pH & acidity monitored upon 7 days incubation)</li>
  <li>Sucrose</li>
  <li>Syrup acidity</li>
  <li>Total Fat</li>
  <li>Total solids</li>
  <li>Turbidity</li>
  <li>Urea</li>
  <li>Wettability</li>
  <li>Creaming Index</li>
</ul>







      </section>

       
<Footer />
    </div>
  );
}

export default OrganizationChart;


 