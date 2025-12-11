'use client';

import React, { useEffect, useState } from 'react';
import Logo from '@/images/logo/logo.png';
import HeroImg from '@/images/milk-union/milk-union-home.png';
import unionMapImg from '@/images/milk-union/union-map.png';
import UnionCard from './UnionCard';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useLocale from '@/hooks/useLocale';
import { IoHomeOutline } from 'react-icons/io5';

import { useMyContext } from '@/context/headerContext';
function MilkUnion() {
  const [milkUnion, setMilkUnions] = useState([]);
  const Api = useApi();
  const params=useParams()
  const [loading,setLoading]=useState(true)
  const {isScroll} =useMyContext()
const locale=useLocale().locale
  useEffect(() => {
    (async () => {
      const { data } = await Api.get('/api/milk-unions?sort[0]=order:asc');
      
      setMilkUnions(data.data);
      setLoading(false)
    })();
  }, []);

   const milkUnions = [
  {
    title: "Bengaluru Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/35",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/Bamul_Nandini_1dfda055da.jpg",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/Bamul_Nandini_1dfda055da.jpg"
    ],
    description:
      "Bangalore Co-operative Milk Union as a prestigious organization in the capital of Karnataka State, it is a sign of progress in the dairy sector just like the progress in the IT sector."
  },

  {
    title: "Kolar Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/55",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_8edce96810.jpg"
    ],
    description:
      "Kolar Chikkaballapur two districts do not have any permanent river, canal and irrigation facilities and are constantly prone to drought, but are at the fore with dairy farming as their main occupation. The dairy industry of the two districts is leading as a model in the country today."
  },

  {
    title: "Mysuru Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/59",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_4131f2797d.jpg",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_4131f2797d.jpg"
    ],
    description:
      "Mysuru is known for its architecture, structure, painting and named as City of places as well. Traditional & authentic mouth warming Mysore Pak and Banana holds significance in culinary heritage of this region."
  },

  {
    title: "Chamarajanagar Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/45",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_5582b1f823.jpg",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/IMG_20210528_173406_ac508672eb.jpg"
    ],
    description:
      "Chamarajanagar Dist.Co-operative Milk Producers' Societies Union Limited is started on 1st April 2015 with objective to serve the farmers and to give help to their economical development, and provide Quality Milk & Milk Products to the Consumers. The Main Dairy Plant at Kuderu occurs in 40 Acres has started processing milk from 1st April 2019 with the Liquid Milk Processing capacity of the Plant is 3 lakh liters per day and extendable upto 5 lakh liters per day. The UHT Processing Capacity is 2 lakh liters per day."
  },

  {
    title: "Mandya Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/57",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_476bfd56e8.jpg",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_476bfd56e8.jpg"
    ],
    description:
      "Mandya district co-operative milk union Ltd., registered on 23.03.1987, after the bifurcation from Mysore and Tumkur Milk Union, came into existence on 01.09.1988. At the time of inception the procurement of union was 99000 litre per day through 467 dairy co-operative societies(DCS) , currently the Union is procuring average of 9.46 lakh litre per day through 1293 dairy co-operative societies. Highest Milk procurement of 10.41 lakh Kg per day was recorded on 01.07.2022."
  },

  {
    title: "Tumakuru Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/63",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/DSCN_0291_1820c6dc8c.JPG",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/DSCN_0291_1820c6dc8c.JPG"
    ],
    description:
      "Tumkur Co-operative Milk Producers Societies Union Limited (TUMUL) is a district apex body in Karnataka."
  },

  {
    title: "Hassan Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/51",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_e0fc72de65.jpg",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_e0fc72de65.jpg"
    ],
    description:
      "Home of sculpture art Hoysala in Hassan district is home to the world famous Belur, Halebidu and Sravanabelagola dome idol built during the Ganga period. Geographical coverage of Hassan Milk Union Kodagu oranges, coffee-Chikkamagaluru coffee and pepper, Hassan coconuts, potatoes, and the coffee and cardamom crops of the adjoining hilly region of Hassan are specialties that have become famous in history and present. Kudige Dairy, the first dairy in Karnataka State, was established on Date: 8.1.1995 under Hassan Milk Union of the same country."
  },

  {
    title: "Dharwad Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_bb38f15a93.jpg",
      "https://web.archive.org/web/20240819043013/https://kmf-public.s3.ap-south-1.amazonaws.com/download_bb38f15a93.jpg"
    ],
    description:
      "Dharwad Co-operative Milk Producers Union Ltd.,(DAMUL) was registered under the Karnataka Co-operative Act in March 1986 covering Dharwad, Haveri, Gadag and Uttara Kannada Districts. DAMUL has 904 number of Functional DCSs covering 28 taluks, of which DAMUL has the infrastructure to handle 2.10 lakh litres of milk and produce 12.0 tons of milk powder, 8 tons of Butter and 6 tons of ghee per day."
  }
  ,

  {
    title: "Haveri Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_bb7c148ab8.jpg"
    ],
    description:
      "The Haveri district is the gateway of Uttar Karnataka, has making rapid growth in Agriculture and Dairying."
  } ,

  {
    title: "Belagavi Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_929e912859.jpg"
    ],
    description:
      "Belgaum district, popularly known as the sugar district, is located in the north-western part of Karnataka state, bounded by Goa state in the west and Maharashtra state in the north. The total area of ​​the district is 13415 square kilometers and has 1138 villages. Krishna, Ghataprabha, Malaprabha, Vedaganga and Dudhganga are the major rivers of the district. Average rainfall in the district is 594.90 mm."
  }
   ,

  {
    title: "Vijayapura & Bagalkot Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/Whats_App_Image_2024_04_24_at_10_22_54_AM_1_466661d092.jpeg"
    ],
    description:
      "Union covering Vijayapur and Bagalkote districts of perennial drought but having high fat content buffalo milk, boasting of the famous Golgumbuz monument, Sculpture of Chalukya dynasty and famous for variety of fruits such as Grapes and Pomegranate. Here are more than 482 functioning DCSs covering 21 taluks."
  }
   ,

  {
    title: "Kalaburgi Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_d16dbc0ed4.jpg"
    ],
    description:
      "The ‘scorching heat city' famous for cement plants, Shahabad stones and saint Basaveshwara has more than 426 functioning DCSs covering 15 taluks in Kalaburgi and Bidar and yadgir Districts."
  }
   ,

  {
    title: "Dakshinna Kannada Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_e32b7e07f4.jpg"
    ],
    description:
      "Dakshinna Kannada Milk Union is registered in the year 1986 under under Karnataka Coopertive Societies Act. The union has a jurisdiction of Dakshina Kannada & Udupi, the twin districts.The Union is having 2.5LLPD processing capacity dairy both in D.K and Udupi District. There are a total of 737 Primary Milk Cooperative Societies (MPCS) are functional including 200 women societies."
  }
   ,

  {
    title: "Shivamogga Co-operative Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_3070304eb8.jpg"
    ],
    description:
      "Shivamogga, Davanagere & Chitradurga dist Co-operative Milk Societies Union (SHIMUL) was established under the Karnataka Co-operative societies act 1959. The Union area of operation is in the 3 Districts, in the year 1987 started its operation, at present with the functioning societies of 1267 Anand pattern Milk Co-operative societies in the area of operation of the union with a farmer membership of 1.63 lakhs. The union at present procures an average of 6.50 lakhs litres of milk per day and sells 3.25 lakhs litres of milk and curd per day. Apart from this, the dairy is manufacturing indigenous dairy products like Peda, Mysore Pak, Ghee, Masala Butter Milk, Sweet Lassi , Khova ,Paneer, Cashew burfi, Nandini bite, and Kova Peanut Chikki."
  }
   ,

  {
    title: "Raichur, Ballari & Koppal Milk Union",
    // link: "https://www.kmfnandini.coop/en/milk-union/49",
    images: [
      "https://web.archive.org/web/20240819043006/https://kmf-public.s3.ap-south-1.amazonaws.com/download_5f1db9d35d.jpg"
    ],
    description:
      "This Union is composed of 04- Districts; Geographically the operational area of Milk Union is largest in North Karnataka region and also occupied a top place in Milk Procurement and marketing. The Union connected at the border of Andhra Pradesh and Telangana states."
  }
];

  return (
    <div className={`w-full h-full absolute top-0 z-[-1]  ${isScroll?'top-36':''}`}>
      <section className={`w-full h-72 pt-28 relative  grid place-items-center company-bg`}>
        <img src={HeroImg.src} className="w-full h-full absolute top-0 z-[-1]" />
        <img src={Logo.src} alt="milk-union-logo" className="w-[200px] " />
      </section>

      <section className="w-full p-2  ">
        <div
          className="max-w-7xl  m-auto p-3  rounded-tl-3xl  rounded-br-3xl  bg-white md:h-[674px] "
          style={{ boxShadow: '0px 11px 49px 0px rgba(0, 0, 0, 0.15)' }}>
      <iframe src="https://www.google.com/maps/d/u/0/embed?mid=14_yIj9s5_1n5VOPDac5zG7F_0hRgLFo&ehbc=2E312F&noprof=1" width="100%" height="100%"></iframe>
        </div>
      </section>

      <section className="w-full    pt-10 ">
      <div className="mb-12  mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[600px] m-auto text-center z-10 font-heading text-5xl font-extrabold uppercase">
             {locale==='kn'?'':'Milk Unions'}
              </h1>
            </div>
      <div className='flex justify-center space-x-3 items-center mt-10 border-b w-fit m-auto'>
        <Link className='font-bold hover:text-secondary-main' href={`${locale==='kn'?'/kn':'/'}`}><IoHomeOutline size={20} /></Link>
        <Link className='text-secondary-main font-bold hover:text-secondary-main' href={`/${locale}/milk-union`}>/ {locale==="en" ?"Milk Unions":"ಹಾಲು ಒಕ್ಕೂಟಗಳು"}</Link>
      </div>

    
        <div className="max-w-[1400px] m-auto p-2 shadow-lg mt-10    shadow-white bg-white flex flex-col justify-center items-center space-y-5">
          {milkUnions.map((item, id) => { 
         
            return (
            
              <UnionCard
                key={id}
                idx={id}
                name={item.title}
                image={item.images}
                description={item.description}
                link={``}
            
              />
            
            );
          })}
        </div>
      </section>

       
<Footer />
    </div>
  );
}

export default MilkUnion;
