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
import { Fade } from 'react-reveal';

function GOK() {
  const { isScroll } = useMyContext();
  const locale = useLocale().locale;
  const [scheme,setScheme]=useState([])
  const [readMore,setReadMore]=useState(false)
  const [showmore,setShowMore]=useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bhagaya,setBhagaya]=useState([])
const axios=useApi()

const handleButton = (idx) => {
  setCurrentIndex(idx);
};
  useEffect(()=>{
    (
      async()=>{
        const {data}=await axios.get('/api/goks?sort[0]=createdAt:asc')
        const { data: bhagaya } = await axios.get(`/api/ksheerabhagaya`);
        const gokData = data?.data?.map((item, id) => {
          return {
            title: item?.attributes?.title,
            content: item?.attributes?.content
          };
        });

        setBhagaya(bhagaya?.data);
        setScheme(gokData)
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
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/goi`}>
                  {locale === "en" ? "GOI":"ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold  text-primary-main " href={`/${locale}/animal-husbandry/scheme/gok`}>
               {locale === "en" ? "GOK":"ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು"}
            </Link>
            <p className="text-primary-main">&gt;</p>
            <Link className="  text-sm font-bold   " href={`/${locale}/animal-husbandry/scheme/other-scheme`}>
                {locale === "en" ? "Other Schemes":"ಇತರೆ ಯೋಜನೆಗಳು"}
            </Link>
            
          </div>

          <div className="  mt-20  relative w-full  flex justify-center items-center ">
             
              <h1 className=" text-primary-main relative z-10 font-heading text-2xl font-extrabold uppercase">
              {locale==='kn'?'ರಾಜ್ಯ ಸರಕಾರದ ಯೋಜನೆಗಳು':'Government Of Karnataka'}
              </h1>
            </div>
    

            <section className='relative w-full max-w-7xl  p-4  m-auto md:pt-20   h-auto  '>
            {bhagaya && bhagaya.attributes && bhagaya.attributes.content && (
                    <BlocksRenderer
                      content={ bhagaya.attributes.content}
                      blocks={{
                        // You can use the default components to set class names...
                        paragraph:({children})=>{
                          return <p className='text-xs text-justify p-3 md:text-lg'>{children}</p>
                        },
                        heading: ({ children, level }) => {
                          switch (level) {
                            case 1:
                              return (
                              
                    <div className=' w-full relative flex justify-center mt-20 mb-20 items-center'>
                    <img src='/images/heading/heading-color/group.png' className='absolute z-[1] w-[450px]    top-[-50pxx]   object-contain'/>
        
        
                                <h1 className="w-full relative max-w-[300px] m-auto text-center  text-primary-main text-sm md:text-lg   z-[100] ">
                                  {' '}
                                  {children}
                                </h1>
                     </div>
                              );
                            case 2:
                              return <h2 className=" text-sm md:text-lg">{children}</h2>;
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
                        code: ({ children }) => {
                          const columns =
                            children?.[0]?.props?.text.split(',')[0].trim() === 'columns'
                              ? children?.[0]?.props?.text.split(',').slice(1)
                              : [];

                          return (
                            <table className="table-fixed  border-spacing-y-2	 border-collapse border-black border overflow-auto     w-full ">
                              <thead className=" text-left bg-orange-400 text-primary-main">
                                {columns?.map((item, id) => {
                                  console.log(item,id)
                                  if(id===0){
                                    return (
                                      <th className="p-2 w-[4px]  text-[5.5px] md:text-lg  border-r border-black " key={id}>
                                        {item}
                                      </th>
                                    );
                                  }else{
                                    return (
                                      <th className="p-2  text-[5.5px] md:text-lg  border-r border-black " key={id}>
                                        {item}
                                      </th>
                                    );
                                  }
                               
                                })}
                              </thead>
                              <tbody className="text-left  text-[5.5px] md:text-lg ">
                                <tr className="w-full ">
                                  {children?.[0]?.props?.text.split(',')[0].trim() !== 'columns' &&
                                    children?.[0]?.props?.text?.split(',')?.map((item, id) => {

                                      if(id===0){

                                        return (
                                          <td className=" w-[4px] p-2 text-md font-content border-r border-black " key={id}>
                                            {' '}
                                            {item}
                                          </td>
                                        );
                                      }
                                      else{

                                        return (
                                          <td className=" p-2 text-md font-content border-r border-black " key={id}>
                                            {' '}
                                            {item}
                                          </td>
                                        );
                                      }
                                    
                                    })}
                                </tr>
                              </tbody>
                            </table>
                          );
                        },

                 
                      }}
                    />
                  )}
            </section>
            <section className=" relative w-full   h-auto   ">
            <section className=" max-w-7xl m-auto h-auto p-3 flex   justify-center items-start    space-y-6  xl:flex-row xl:justify-evenly xl:items-start md:space-x-2">

            <Fade left>
        <div className="w-full xl:max-w-2xl shadow-lg flex flex-col justify-center items-start rounded-tl-3xl  rounded-br-3xl  bg-white space-y-6 p-5 ">
        <div className=" mb-5 md:mb-20  mt-20  relative w-full   flex justify-center items-center ">
              <img
                src="/images/heading/heading-color/group.png"
                className="absolute   w-[530px] top-[-18px] sm:top-[-50px]    object-contain"
              />
              <h1 className=" text-primary-main relative max-w-[100px] md:max-w-[300px] m-auto text-center z-10 font-heading text-[4px] md:text-sm font-extrabold uppercase">
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
            <h1 className=" text-xs  text-center md:text-xl uppercase">{locale==='kn'?`ಕೇಂದ್ರ ಸರಕಾರದ ಯೋಜನೆಗಳು`:`Government Of Karnataka `}</h1>
          </div>

          <div className="w-full h-ful pt-5 shadow-md">

            <ul className="w-full flex flex-col justify-center items-center space-y-3">
          
              { scheme?.map((items, idx) => {
                
                  return (
                    
                    <li
                      key={idx}
                      className=" cursor-pointer relative w-full h-full flex justify-start p-2 pb-2 space-x-3 items-center text-[5.5px] md:text-sm before:absolute before:w-[120px]  md:before:w-full  before:h-0.5 before:bg-neutral-dark4 before:bottom-0"
                      onClick={() => handleButton(idx)}>
                      <img src={rightArrow.src} className='w-4' />
                      <Fade right >
                      <p
                        className={`${
                          idx === currentIndex ? 'text-primary-main font-bold' : 'text-neutral-dark1'
                        } uppercase`}>
                        {items.title}
                      </p>
                      </Fade>
                    </li>
                     
                  );
            

               
              })
              
              
             
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

export default GOK;
