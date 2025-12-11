'use client';

import womenEmpwerImg from '@/images/women-empower/women-empower.png';
import { womenEmpowerment } from '@/configtext/womenEmpowerment';
import { useEffect, useState } from 'react';
import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import rightArrow from '@/images/women-empower/rightArrow.svg';
import Link from 'next/link';
import { Fade } from 'react-reveal';
import { IoHomeOutline } from 'react-icons/io5';
import { useMyContext } from '@/context/headerContext';

function WomenEmpowerment() {
  const [womenEmpower, setWomenEmpower] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const locale = useParams()?.locale;
  const axios = useApi();

  const {isScroll}=useMyContext()

  const handleButton = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/women-empowerments');
      const womenEmpowerData = data?.data?.map((item, id) => {
        return {
          title: item?.attributes?.title,
          description: item?.attributes?.content
        };
      });
      setWomenEmpower(womenEmpowerData);
  
    })();
  }, []);
  return (
    <div className={`w-full h-full absolute top-0 z-[-1] bg-[#F6F6F6] ${isScroll?'top-36':''}`}>
      <section className={`w-full h-full md:h-[800px] pt-28 relative  grid place-items-center `}>
        <img
          src={'/images/step-bg.png'}
          className="w-full h-full object-fill absolute top-0 z-[-1]"
        />
      </section>


      <div className="flex w-full   flex-wrap  justify-center pt-5 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                      <Link className="  text-sm font-bold  " href={`/` || ''}>
                      <IoHomeOutline size={20} />
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/animal-husbandry/procurement':'/en/animal-husbandry/procurement'}`}>
            {locale==='kn'?' ಹಾಲು ಶೇಖರಣೆ':'Procurement'}
              
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/animal-health':'/en/animal-husbandry/animal-health'}`}>
            {locale==='kn'?'  ಪಶು ಆರೋಗ್ಯ':'Animal Health'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`${locale==='kn'?'/kn/animal-husbandry/animal-breeding':'/en/animal-husbandry/animal-breeding'}`}>
            {locale==='kn'?'ಪಶು ಸಂತಾನಾಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮ':'Animal Breeding Program'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  " href={`${locale==='kn'?'/kn/animal-husbandry/feed-and-fodder':'/en/animal-husbandry/feed-and-fodder'}`}>
            {locale==='kn'?'ಮೇವು ಚಟುವಟಿಕೆಗಳು':'Fodder Activities'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   "  href={`${locale==='kn'?'/kn/animal-husbandry/scheme':'/en/animal-husbandry/scheme'}`}>
            {locale==='kn'?'ಯೋಜನೆಗಳು/ ಅನುದಾನಗಳು':'Schemes/Grants'}
            </Link>

            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold text-primary-main  " href={`${locale==='kn'?'/kn/women-empowerment':'/en/women-empowerment'}`}>
            {locale==='kn'?'ಸ್ಟೆಪ್ ಯೋಜನೆ':'Step'}
            </Link>
            
      </div>
      <div className="flex w-full    justify-center pt-10 space-x-2 items-center relative before:absolute before:-bottom-3 before:w-20   before:h-0.5 before:bg-primary-main">
                

            <Link className="  text-sm font-bold " href={`${locale==='kn'?'/kn/portfolio#ACHIEVEMENTS':'/en/portfolio#ACHIEVEMENTS'}`}>
            {locale==='kn'?'ಪೋರ್ಟ್ಫೋಲಿಯೋಗೆ ಹಿಂದಿರುಗಲು':'Back to portfolio'}
              
            </Link>

          
            
      </div>
      <section className="w-full max-w-7xl m-auto h-auto p-4  flex justify-center items-center flex-col  space-y-6  ">
      <div className="   mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-xl font-extrabold uppercase">
              {locale === 'en' ? 'STEP' : 'ಸ್ಟೆಪ್ ಯೋಜನೆ'}
              </h1>
            </div>
         
        {/* <p className="text-justify text-xs md:text-xl text-neutral-dark1">
          {locale === 'en'
            ? ` Support to Training and Employment Programme (STEP) for Women was launched by the Ministry
          of Women & Child Development, Government of India, as one of the measures to ensure well
          being of women in the traditional informal sector in the year 1986 and advocates the
          objective of extending training for upgradation of skills and sustainable employment for
          women through a variety of action oriented projects which employ women in large numbers.`
            : `ಮಹಿಳೆಯರಿಗಾಗಿ ವೃತ್ತಿ ತರಬೇತಿ ಮತ್ತು ಉದ್ಯೋಗ ಬೆಂಬಲಿತ ಯೋಜನೆಯನ್ನು(ಸ್ಟೆಪ್) ಭಾರತ ಸರ್ಕಾರದ ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯದ 1986ರಲ್ಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಿರುತ್ತದೆ. ಅಸಂಘಟಿತ ವಲಯದಲ್ಲಿರುವ ಮಹಿಳೆಯರನ್ನು ಸಾಮಾಜಿಕವಾಗಿ ಮತ್ತು ಆರ್ಥಿಕವಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸುವುದು  ಯೋಜನೆಯ ಮುಖ್ಯ ಉದ್ದೇಶವಾಗಿರುತ್ತದೆ. ಅಲ್ಲದೇ ಮಹಿಳೆಯರಲ್ಲಿ ವೃತ್ತಿ ಕೌಶಲ್ಯತೆ ಅಭಿವೃದ್ಧಿ ಪಡಿಸುವ ತರಬೇತಿಗಳನ್ನು ಹಾಗೂ ನಿರಂತರ ಆದಾಯ ತರುವಂತಹ ಉದ್ಯೋಗಗಳನ್ನು ಕಲ್ಪಿಸಿ ಹೆಚ್ಚಿನ ಮಹಿಳೆಯರನ್ನು ಉದ್ಯೋಗಗಳಲ್ಲಿ ತೊಡಗಿಸುವ ಉದ್ದೇಶ ಹೊಂದಿದೆ.`}
        </p> */}

        <p>
STEP (Support to Training and Employment Programme for Women) is implemented by the Department of Women and Child Development, Government of India. 
In Karnataka, the programme aims to improve the socio-economic status of rural and semi-urban women through modern and efficient dairy management practices.
</p>

<p>
Under STEP, assistance is provided for dairy farming in the form of subsidized support, awareness programmes on cattle rearing, improvement of cattle sheds, cattle feed and fodder, animal health care, cattle insurance, group insurance coverage, and various training programmes.
</p>

<p>
Karnataka Milk Federation (KMF) initiated the STEP Programme in October 1997. Since then, KMF has organized Women Dairy Cooperative Societies (WDCS) across multiple phases. 
In Phase I, II, III, and V, 1000 WDCS were organized, and in Phase IV and VI, 450 existing WDCS were converted into STEP WDCS.
</p>

<p>
Additionally, the Government of India sanctioned two more phases: Phase VII with 200 WDCS and Phase VIII with 250 WDCS. 
In total, 1924 WDCS have been approved under STEP in Karnataka.
</p>

<p>
The Government of India sanctioned a total outlay of Rs. 5648.08 lakh for this programme and released Rs. 3714.40 lakh by 2011. 
Each WDCS receives approximately Rs. 2.50 to 3.00 lakh for establishment, management, and for providing interest-free loans to purchase milk animals.
</p>

<p>
The funding pattern consists of 90% contribution from the Government of India and 10% from the implementing agency, i.e., KMF and its Member Milk Unions.
</p>

      </section>

       <section className="w-full max-w-7xl m-auto h-auto p-4  flex justify-center items-center flex-col  space-y-6  ">
      <div className="   mt-20  relative w-full  flex justify-center items-center ">
          
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-xl font-extrabold uppercase">
              {locale === 'en' ? 'Ksheera Sanjeevini' : ''}
              </h1>
            </div>
         
        {/* <p className="text-justify text-xs md:text-xl text-neutral-dark1">
          {locale === 'en'
            ? ` Support to Training and Employment Programme (STEP) for Women was launched by the Ministry
          of Women & Child Development, Government of India, as one of the measures to ensure well
          being of women in the traditional informal sector in the year 1986 and advocates the
          objective of extending training for upgradation of skills and sustainable employment for
          women through a variety of action oriented projects which employ women in large numbers.`
            : `ಮಹಿಳೆಯರಿಗಾಗಿ ವೃತ್ತಿ ತರಬೇತಿ ಮತ್ತು ಉದ್ಯೋಗ ಬೆಂಬಲಿತ ಯೋಜನೆಯನ್ನು(ಸ್ಟೆಪ್) ಭಾರತ ಸರ್ಕಾರದ ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯದ 1986ರಲ್ಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಿರುತ್ತದೆ. ಅಸಂಘಟಿತ ವಲಯದಲ್ಲಿರುವ ಮಹಿಳೆಯರನ್ನು ಸಾಮಾಜಿಕವಾಗಿ ಮತ್ತು ಆರ್ಥಿಕವಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸುವುದು  ಯೋಜನೆಯ ಮುಖ್ಯ ಉದ್ದೇಶವಾಗಿರುತ್ತದೆ. ಅಲ್ಲದೇ ಮಹಿಳೆಯರಲ್ಲಿ ವೃತ್ತಿ ಕೌಶಲ್ಯತೆ ಅಭಿವೃದ್ಧಿ ಪಡಿಸುವ ತರಬೇತಿಗಳನ್ನು ಹಾಗೂ ನಿರಂತರ ಆದಾಯ ತರುವಂತಹ ಉದ್ಯೋಗಗಳನ್ನು ಕಲ್ಪಿಸಿ ಹೆಚ್ಚಿನ ಮಹಿಳೆಯರನ್ನು ಉದ್ಯೋಗಗಳಲ್ಲಿ ತೊಡಗಿಸುವ ಉದ್ದೇಶ ಹೊಂದಿದೆ.`}
        </p> */}
<p>
Ksheera Sanjeevini – Phase I is a project implemented under the Sanjeevini programme of the Karnataka State Rural Livelihood Promotion Society (KSRLPS), in collaboration with the Karnataka Milk Federation (KMF). The project was initiated in April 2014 to improve the socio-economic status of rural women through dairy-based livelihood activities.
</p>

<p>
Under this project, 250 existing Women Dairy Cooperative Societies (WDCS) from 13 District Milk Unions were brought under the fold of Ksheera Sanjeevini. The programme aims to enroll 10,000 women as Target Group Members (TGMs) and achieve a daily milk procurement target of 62,000 liters.
</p>

<p>
The project is expected to provide direct employment to 750 rural women across the 250 WDCS. The total financial outlay of the project is Rs. 17.10 Crores for a period of three years. Each beneficiary receives support amounting to Rs. 17,100, and each WDCS receives approximately Rs. 4.55 Lakhs for management, training, awareness programmes, interest-free loans to purchase milch animals, cattle insurance, transportation, and cattle feed.
</p>

<p>
The funding pattern of the project includes 86.85% share from Sanjeevini – KSRLPS and 13.15% contribution from KMF and its member Milk Unions. The initiative aims to enhance the monthly net income of women by Rs. 3000 to Rs. 3500 by the end of the project, contributing to their socio-economic development through dairy farming.
</p>

<table border="1" cellpadding="8" cellspacing="0">
    <tr>
        <th>Topic</th>
        <th>Details</th>
    </tr>

    <tr>
        <td>Project Name</td>
        <td>Ksheera Sanjeevini – Phase I</td>
    </tr>

    <tr>
        <td>Implemented Under</td>
        <td>Sanjeevini – Karnataka State Rural Livelihood Promotion Society (KSRLPS)</td>
    </tr>

    <tr>
        <td>Implementation Partner</td>
        <td>Karnataka Milk Federation (KMF)</td>
    </tr>

    <tr>
        <td>Start Year</td>
        <td>April 2014</td>
    </tr>

    <tr>
        <td>Target WDCS</td>
        <td>250 existing Women Dairy Cooperative Societies (from 13 District Milk Unions)</td>
    </tr>

    <tr>
        <td>Target Group Members</td>
        <td>10,000 rural women</td>
    </tr>

    <tr>
        <td>Milk Procurement Target</td>
        <td>62,000 liters per day</td>
    </tr>

    <tr>
        <td>Employment Generated</td>
        <td>Direct employment to 750 rural women</td>
    </tr>

    <tr>
        <td>Total Project Outlay</td>
        <td>Rs. 17.10 Crores (for 3 years)</td>
    </tr>

    <tr>
        <td>Cost per Beneficiary</td>
        <td>Rs. 17,100</td>
    </tr>

    <tr>
        <td>Grant per WDCS</td>
        <td>Approximately Rs. 4.55 Lakhs</td>
    </tr>

    <tr>
        <td>Support Includes</td>
        <td>
            Management, training, awareness programmes,<br/>
            interest-free loans for milch animals,<br/>
            cattle insurance, transportation, and cattle feed.
        </td>
    </tr>

    <tr>
        <td>Funding Pattern</td>
        <td>86.85% – Sanjeevini (KSRLPS), 13.15% – KMF & Member Unions</td>
    </tr>

    <tr>
        <td>Expected Income Increase</td>
        <td>Rs. 3000 to Rs. 3500 per month per woman</td>
    </tr>

    <tr>
        <td>Main Aim</td>
        <td>Socio-economic development of rural women through dairy farming</td>
    </tr>
</table>


      </section>

      <div className='w-full  '>

     

      {/* <section className=" max-w-7xl m-auto h-auto p-5 flex   justify-center items-start    space-y-6  xl:flex-row xl:justify-evenly xl:items-start md:space-x-5">
      <Fade top>
        <div className="w-full xl:max-w-2xl flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white space-y-6 p-2 ">

       
        <div className=" mb-5 md:mb-20  mt-20  relative w-full  flex justify-center items-center ">
              <img
                src="/images/heading/heading-color/group.png"
                className="absolute   w-[530px]  md:top-[-70px]    object-contain"
              />
              <h1 className=" text-primary-main relative max-w-[300px] m-auto text-center z-10 font-heading text-[5.5px] md:text-sm font-extrabold uppercase">
              {womenEmpower[currentIndex]?.title}
              </h1>
            </div>
        
          
          {womenEmpower[currentIndex]?.description?.map((item, id) => {
            return (
              <p  key={id} className="text-[7px] md:text-xl text-neutral-dark1 text-justify">{item?.children?.[0]?.text}</p>
            );
          })}
        </div>
        </Fade>

        <div className="flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white p-5">
          <div>
            <h1 className=" text-xs md:text-xl">{locale==='en'?`WOMEN EMPOWERTMENT`:`ಮಹಿಳಾ ಸಬಲೀಕರಣ`}</h1>
          </div>

          <div className="w-full h-ful pt-5">
            <ul className="w-full flex flex-col justify-center items-center space-y-1">
              {womenEmpower?.map((items, idx) => {
                return (
                  <li
                    key={idx}
                    className=" relative w-full h-full flex justify-start p-2 space-x-3 items-center text-[5.5px] md:text-lg before:absolute before:w-full  before:h-0.5 before:bg-neutral-dark4 before:bottom-0"
                    onClick={() => handleButton(idx)}>
                    <img src={rightArrow.src} className='w-2' />
                    <Fade right>
                    <p
                      className={` cursor-pointer ${
                        idx === currentIndex ? 'text-primary-main font-bold' : 'text-neutral-dark1'
                      } uppercase`}>
                      {items.title}
                    </p>
                    </Fade>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section> */}
      </div>
       
<Footer />
    </div>
  );
}

export default WomenEmpowerment;
