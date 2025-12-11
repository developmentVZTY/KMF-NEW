'use client';
import React, { useEffect, useState } from 'react';
 
import 'swiper/css';
import 'swiper/css/navigation';
 
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
 
import useLocale from '@/hooks/useLocale';
import Fade from 'react-reveal'

import { useMyContext } from '@/context/headerContext';
function OrganizationChart() {
  const [mileStones, setMileStone] = useState([]);
  const [selectedYear, setSelectedYear] = useState(1955);
  const [nextYear, setNextYear] = useState(1955);
  const [description, setDescription] = useState([]);
  const pagesToShow = 4; // Number of pagination numbers to show
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = description?.slice(indexOfFirstItem, indexOfLastItem);
 const {isScroll} =useMyContext()
  
  const axios = useApi();
  const locale = useLocale().locale;
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggle = (idx, year) => {
    handleYear(year);
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/milestones?sort[0]=year:asc');
      const { data: banner } = await axios.get('/api/milestone-banner');
      const milestones = data?.data?.map((item) => {
        return {
           year: item?.attributes?.year, 
           description: item?.attributes?.description };
      });

      const filterDataDatewise=[
        {
          year:1955,
          description:milestones?.filter(item=>item?.year >= 1955 && item?.year <= 1965)
        },
        {
          year:1965,
          description:milestones?.filter(item=>item?.year >= 1955 && item?.year <= 1965)
        },
        {
          year:1975,
          description:milestones?.filter(item=>item?.year > 1965 && item?.year <= 1975)
        },
        {
          year:1985,
          description:milestones?.filter(item=>item?.year > 1975 && item?.year <= 1985)
        },
        {
          year:1995,
          description:milestones?.filter(item=>item?.year > 1985 && item?.year <= 1995)
        },
        {
          year:2000,
          description:milestones?.filter(item=>item?.year > 1995 && item?.year <= 2000)
        },
        {
          year:2005,
          description:milestones?.filter(item=>item?.year > 2000 && item?.year <= 2005)
        },
        {
          year:2010,
          description:milestones?.filter(item=>item?.year > 2005 && item?.year <= 2010)
        },
        {
          year:2015,
          description:milestones?.filter(item=>item?.year > 2010 && item?.year <= 2015)
        },
        {
          year:2020,
          description:milestones?.filter(item=>item?.year > 2015 && item?.year <= 2020)
        },
        {
          year:2025,
          description:milestones?.filter(item=>item?.year > 2020 && item?.year <= 2025)
        },

      ]
 

      const filterdata = milestones?.filter(
        (item) => parseInt(item.year) >= selectedYear && parseInt(item.year) <= nextYear
      );
      setMileStone(filterDataDatewise);
      setBanner(banner?.data);
      setDescription(filterdata);
      setLoading(false);
    })();

   
  }, [selectedYear, nextYear]);

  const handleYear = (year) => {
    const startYear = Math.min(selectedYear, year);
    const endYear = Math.max(selectedYear, year);

    setSelectedYear(startYear);
    setNextYear(endYear);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationNumbers = () => {
    const totalPages = Math.ceil(description.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const paginationNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
          }`}>
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      paginationNumbers.unshift(<span key="ellipsis-start">...</span>);
    }

    if (endPage < totalPages) {
      paginationNumbers.push(<span key="ellipsis-end">...</span>);
    }

    return paginationNumbers;
  };

  return (
    <div className={`w-full h-full  absolute top-0 z-[-1] ${isScroll?'top-36':''}`}>
      <h1 className="text-primary-main w-full max-w-7xl m-auto text-center pt-20 font-heading text-3xl font-extrabold uppercase">
        {locale === 'kn' ? 'ಮೈಲಿಗಲ್ಲು' : 'Milestones'}
      </h1>

       <section className="w-full pb-20 h-auto mb-[150px] m-auto max-w-7xl shadow-lg shadow-gray-600 mt-10">
        <div className="w-full h-auto">
            <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                <div className="relative max-w-60">
                    <div
                        className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full">
                    </div>
                </div>
                <div className="text-5xl font-bold text-secondary-main">2025</div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1  w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2024</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Cafe Moo INAUGRATION IN GUNDLUPET</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">A new milk revolution in the field of dairy farming, on
                        28.06.2024, Karnataka Milk Federation set a new record of collecting 1 crore liters of milk.
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2024</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2024</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">30.05.2024 kmf website Relaunched</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Karnataka Milk Federation has sponsored Ireland and Scotland
                        teams from the brand name "Nandini" in the ICC Men's T20 World Cup 2024.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2024</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2024</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Milk products such as probiotic buttermilk and ragi malt have
                        been launched in the market by the Mysore Milk Union</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Special sweet product “Ullasgulla” started producing and selling
                        from CHAMUL</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2023</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2023</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Mandya Milk Union launch the new products Special Milk Burfi and
                        Paneer nippattu to the Market.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96"> date:28.10.2022. 13 Union has expanded its marketing network to
                        start selling milk and milk products in Malappuranjille, Kerala state to increase the level of
                        sales of milk and milk products.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2022</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2022</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">The Arakere Milk Producers' society of Srirangapatna taluk,
                        under Mandya Milk Union, has been honored with the '2022 national Gopalaratna Award' for its
                        exceptional performance as the best milk producers' co-operative society.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96"> Date: 23.02.2021 started to selling milk and milk products in
                        Nilgiris, Coimbatore districts of Tamil Nadu state and expanding its market coverage.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2021</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2021</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Nandini Parlor at Bangalore's prestigious Kempegowda
                        International Airport has been attractively designed and launched.</div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full flex justify-center items-center mb-10 space-x-5">
                <div className="text-5xl font-bold text-primary-main">2020</div>
                <div className="w-full max-w-60 relative">
                    <div
                        className="w-40 h-40 border-l-primary-main border-white rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-primary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[15px] rounded-full">
                    </div>
                </div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2020</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">With the aim of expanding the market by improving cheese sales
                        with in the state and outside the state, was officially launched by opening the Nandini Cheese
                        Shop at the "Indian Food, Beverage and Hospitality Trade Show" held in Mumbai in the month of
                        January 2020.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">UHT 1000ml of cream production first started by Chamul Union.
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2020</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2020</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Nandini on wheels concept is “a mobile vehicle for sales and
                        promotion of Nandini products”. started</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Foundation Stone was laid for 150MT per day capacity Cattle Feed
                        Plant at Sindhanur on 05.01.2019</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2019</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2019</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">A new mega dairy was inaugurated at Alanahalli, Mysore.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Buffalo milk is also released in Flexi packaging and Butter
                        Chiplet Launched to Market</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2019</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2019</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Mandya Milk Union launch the new products Jaggery burfi and
                        Khova Laddu to the Market</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">"Inauguration of
                        80,000 Ltr/day capacity Flexi Nandini milk packing unit at Belagavi."
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2017</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2016</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Inaguration of Hosakote Dairy and Product block by Bengaluru
                        Milk Union</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Dakshina Kannada Milk Union launched Milk in Flexi Pack</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2016</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2016</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Foundation stone paying for 100 MT/day capacity powder plant by
                        KMF along with other milk product at an estimated cost of Rs.300 crores at Ramanagara district
                        and Mega Dairy Plant by BAMUL at Kanakapura with an estimated cost of Rs.450 crores</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launching of Milk &amp; Milk products in Mumbai</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2016</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2016</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Government of Karnataka raised the incentive from Rs.4/- to
                        Rs.5/- for every litre of milk supplied by producer to cooperatives</div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                <div className="relative max-w-60">
                    <div
                        className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full">
                    </div>
                </div>
                <div className="text-5xl font-bold text-secondary-main">2015</div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2015</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Dakshina Kannada Milk Union (DKMUL) of KMF &nbsp;launched
                        conventional buttermilk
                    </div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">KMF has launched Nandini Milk and Milk Products at Hyderabad and
                        Secunderabad</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2015</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2015</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Commissioning of Hoskote Dairy of 2 LLPD in Hoskote CC Premises
                    </div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Corporate Citizen Award(2014-15) to KMF</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2015</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2015</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Nandini Buffaloe Milk introduced at Mother Dairy</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Vijayapura and Bagalkot Union released new product "Nandini
                        Kolhar", thick and creamy curd</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2015</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2015</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Dakshina Kannada Milk Union (DKMUL) of KMF &nbsp;launched
                        conventional buttermilk</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Bengaluru union Launched Nandini Ghee Laddoo.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2014</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2014</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Nandini Milk Sales started in Chennai</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">KMF Launched Nandini Gold Cattle Feed</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2014</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2014</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Kalaburagi Dairy which was under KMF control handed over to
                        Kalaburagi Milk Union.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launch of Nandini Special Milk</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2014</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2014</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Inauguration of new Cattle Feed Plant with 300MT capacity at
                        Shikaripur</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Nandini Milk Powder worth of Rs. One Crore was sent to
                        Jammu-Kashmir as flood relief material</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2014</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2014</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Declaration of Incentive of Rs.0.20 paise per litre milk
                        procured to DCS Staff by Karnataka Govt.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Inauguration of Flexi pack Unit at DK Milk union</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2013</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2013</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Government of Karnataka raised the incentive from Rs.2/- to
                        Rs.4/- for every litre of milk supplied by producers to Cooperatives</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Starting of KMF Sales Depot at Hyderabad</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2013</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2013</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Commissioning of 10000 Lpd Ice Cream Plant at Ballari.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">“KSHEERA BHAGYA”,the prestigious program of distributing milk to
                        school and Anganwadi children by GOK through KMF,was inaugurated by hon’ble Chief Minister</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2013</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2012</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Relaunch of Samrudhi, Nandini Full Cream Milk</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launching of Mobile Milk testing Vehicle facility in Bengaluru
                        City</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2012</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2012</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Launching of Mobile Milk testing Vehicle facility in Bengaluru
                        City</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Commissioning of 1 Lakh ltr UHT Plant at Kumbalgodu (Mandya Milk
                        Union)</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2012</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2012</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Commissioning of 1 Lakh ltr UHT Plant at Kumbalgodu (Mandya Milk
                        Union)</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Installation of good life 100ml fino pack unit in
                        channaraayapattana.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2011</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2011</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Installation of UHT Processing &amp; Packing 1.00 LLPD Capacity
                        at Channarayapatana</div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full flex justify-center items-center mb-10 space-x-5">
                <div className="text-5xl font-bold text-primary-main">2010</div>
                <div className="w-full max-w-60 relative">
                    <div
                        className="w-40 h-40 border-l-primary-main border-white rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-primary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[15px] rounded-full">
                    </div>
                </div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2010</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Hosting of new KMF website
                        www.kmfnandini.coop
                        with online order facility</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Procurement and Selling price of Milk enhanced upwards by Rs. 2
                        to 3 per ltr</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2010</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2009</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">UHT SUPPLY TO Andaman &amp; Nicobar</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Nandini has won “The Most Valuable Brand in Karnataka Award” in
                        the Sunday Indian &amp; IIPM regional excellence Awards</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2009</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2009</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">New Sales Depot Started at Kalaburagi(2009)and Mysuru(2010)
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launch of Good Life variants in Cuttack, Orissa, Trichy
                        (Tamilnadu)</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2009</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2008</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Launch of New products and new stunning packs Sundae, Crazy Cone
                        ice cream/ Lite Skimmed Milk /Cool Milcafe/ Choco Milk Shake/Dairy Whitener and Goodlife Slim in
                        1 Ltr Brik</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Taking over of Kalaburagi Dairy &amp; Milk Marketing by KMF
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2008</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2008</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">GOK support to milk producers with Rs.2 incentive per litre of
                        milk</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Commissioning of 30MT capacity Plant at Channarayapatna Sep 2008
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2008</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2007</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Inauguration of additional Infrastructure facilities for UHT
                        milk production at Kolar from existing 40,000 LPD to 1.5 LLPD.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Release of Nandini Homogenized cow milk(3.5%Fat / 8.5%SNF) in
                        Bengaluru.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2007</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2007</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Opening of“Nandini Dairy Farmers Welfare Trust” hostel.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Depos opened at Kerala (Kannur &amp; Ernakulam).</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2006</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2006</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Foundation stone laid for New 300 MTs capacity at Hassan &amp;
                        Inauguration of Existing CFP expansion from 100 MTs to 200 MTs.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Packing Station commissioned at Kumbalgodu (Mandya Union).</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2006</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2006</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Release of new generation Drinks Tetra Pack variants of Flavored
                        milk &amp; Buttermilk.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Expansion of Gubbi(2006)CFP and Dharwad(2007)CFP from 100MTs to
                        150 MTs completed.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2006</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                <div className="relative max-w-60">
                    <div
                        className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full">
                    </div>
                </div>
                <div className="text-5xl font-bold text-secondary-main">2005</div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2005</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Laying of Foundation stone for 30 MTs Powder Plant at
                        Channarayapatna.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launching of‘ Nandini Set Curd'.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2005</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2005</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Karnataka stands 2nd in milk Proc.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Nandini Sperm Station has been awarded with ISO certificate
                        &amp; has been merited by Ministry of Agriculture, GOI as 2nd best A grade semen station in the
                        country during 2005-06</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2005</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2004</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">MOU agreement signing by GOK &amp; NDDB for implementation of
                        Perspective Plan 2010.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Registration of KMF website as “
                        www.kmfnandini.coop
                        ”.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2002</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2002</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Powder plant of 30 MT capacity started at Mother Dairy.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Release of Urea Molasses Brick(3Kg Pack)</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2002</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2002</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Adoption of Mnemonic Symbol in Bengaluru, DK, Mysuru, Shivamogga
                        and Dharwad.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Release of 50 gm SMP in metalized polypack</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2002</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2002</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">‘Nandini Shop on Wheels' started (Mobile display cum sales
                        vehicle).</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Starting of Sales Depo at Mangaluru in addition to Depos at
                        Bengaluru,Hubli &amp; Thirupathi.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2001</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full flex justify-center items-center mb-10 space-x-5">
                <div className="text-5xl font-bold text-primary-main">2000</div>
                <div className="w-full max-w-60 relative">
                    <div
                        className="w-40 h-40 border-l-primary-main border-white rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-primary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[15px] rounded-full">
                    </div>
                </div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2000</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">MOU agreement signing by GOK &amp; NDDB for implementation of
                        Perspective Plan.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launching of New Products Badam Powder(2000), Badam Powder in 10
                        gm pouches(2002), Kunda(2003), Yoghurt(2004), besan laddoo(2004), Good life High fat milk(2000),
                        Nandini Goodlife Slim(2002), Goodlife 200ml Tetrabrik(2002), Goodlife 1 Ltr Tetra Brik(2006)
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">2000</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">2000</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">“Mega Dairy”started functioning in Bengaluru Union and Chilling
                        Centre of 150 TLPD capacity started at Hoskote</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Starting of Sales Depot at Tirupathi.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1999</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1998</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Installation of LN2 Distribution system for Karnataka state.
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Launching of New Products Jamoon Mix (March1998), Mysuru Pak
                        (Dec.1998), Tetra Fino Packaged Nandini “Goodlife”milk(1999)</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1998</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1997</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Inauguration of Ice-cream manufacturing unit at Mother Dairy
                        Premises, Bengaluru(1997) and Expansion of Plant from 3000 LPD to 10000 LPD(2005)</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Foundation Stone laid for Pouch Film Manufacturing Unit at
                        Munnekolalu, Bengaluru and Production started(1997). Plant restarted production(2002)</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1996</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1996</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Foundation Stone laid for Cattle Feed Plant at Hassan 09.02.1996
                        and Production Started(in 1998)</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Foundation Stone laid for Mega Dairy &amp; New Powder Plant at
                        Bengaluru, Mini Dairy Schemes &amp; other development programmes.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1996</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                <div className="relative max-w-60">
                    <div
                        className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full">
                    </div>
                </div>
                <div className="text-5xl font-bold text-secondary-main">1995</div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1995</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Varieties of New Nandini Products viz. Nandini Paneer, Burfi,
                        Khova &amp; Sweet curds launched in December</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Starting of Sales Depot at Hubli.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1995</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1994</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Liquid Milk Sale Crosses Million Litres/day.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Starting of Sales Depot at Bengaluru.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1994</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1993</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Milk procurement on a single day crosses million Kg level in
                        Dec. 1986 &amp; average milk procurement per day for the year crosses million kg level.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Commercial production &amp; marketing of Nandini flavoured milk
                        launched.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1992</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1991</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Chilling &amp; Processing plants at Vijayapura, Kalaburagi,
                        Ballari, Shivamogga and Kolar transferred to District Milk Union.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Chilling &amp; Processing plants at Vijayapura, Kalaburagi,
                        Ballari, Shivamogga and Kolar transferred to District Milk Union.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1991</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1991</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">KHAFBA registered (Karnataka Holstein Friesian Breeders
                        Association).</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Milk Supply to Kolkata Mother Dairy through railway tankers from
                        Mother Dairy, Bengaluru.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1989</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1989</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Last Milk Shed registered as a union (Raichur &amp; Ballari
                        Union).</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Centralised Marketing Organised.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1989</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1988</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Training centres at Mysuru,Dharwad &amp; Kalaburagi transferred
                        to unions.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Dairies at Bengaluru,Gejjalagere, Dharwad,Belagavi and Mangaluru
                        transferred to district milk unions.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1988</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1987</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Operation Flood-III implementation.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Dairies at Hassan, Tumakuru &amp; Mysuru transferred to district
                        milk unions.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1987</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full flex justify-center items-center mb-10 space-x-5">
                <div className="text-5xl font-bold text-primary-main">1985</div>
                <div className="w-full max-w-60 relative">
                    <div
                        className="w-40 h-40 border-l-primary-main border-white rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-primary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[15px] rounded-full">
                    </div>
                </div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1985</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Remaining Govt. Dairies transferred to KMF.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">KMPL assets transferred to KMF</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1984</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1984</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Operation Flood-II implemented.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Karnataka Milk Federation is born and KDDC transformed into KMF
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1984</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1984</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Nandini Sperm Station (formerly known as Bull Breeding Farm
                        &amp; Frozen Semen Bank) Commissioned.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Mother Dairy Started functioning.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1984</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1984</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Product Dairy, Dharward Commissioned.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Corporate brand name‘Nandini' given.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1983</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1983</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">First Cattle Feed Plant commissioned at Rajanukunte 21.03.1983
                        and Capacity expanded from 100 MT to 200 MT (in 1997)</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">First Milk product dairy started at Gejjalagere, Mandya.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1982</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1980</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">Karnataka Milk Products Limited established.</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">First registration of Union.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1976</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                <div className="relative max-w-60">
                    <div
                        className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full">
                    </div>
                </div>
                <div className="text-5xl font-bold text-secondary-main">1975</div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1975</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">First Spear Head Team positioned.</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Government dairies transferred to KDDC.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1975</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1975</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">First registration of Milk Producers' Co-operative Society.
                    </div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">Karnataka Dairy Development Corporation (KDDC) is born.</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1974</div>
                    </div>
                </div>
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1974</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">World Bank aided Karnataka Dairy Development project
                        implemented.</div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full flex justify-center items-center mb-10 space-x-5">
                <div className="text-5xl font-bold text-primary-main">1965</div>
                <div className="w-full max-w-60 relative">
                    <div
                        className="w-40 h-40 border-l-primary-main border-white rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-primary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[15px] rounded-full">
                    </div>
                </div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1965</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">50,000 Litres per day liquid milk processing facility was set up
                        at Bengaluru and Expanded to 3.5 Lakh Litres(in 1994)</div>
                </div>
                <div className="w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">First Dairy in Karnataka set up at Kudige, Kodagu Dist</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1955</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full h-auto">
            <div className="w-full mb-10 space-x-5 flex justify-center items-center relative">
                <div className="relative max-w-60">
                    <div
                        className="w-40 h-40 border-white border-r-secondary-main rounded-[50%] border-[20px] flex justify-center items-center">
                        <div className="w-20 h-20 border-secondary-main rounded-full border-4"></div>
                    </div>
                    <div
                        className="milestone-pulse w-5 h-5 flex justify-center items-center absolute bottom-[-25px] left-[120px] rounded-full">
                    </div>
                </div>
                <div className="text-5xl font-bold text-secondary-main">1955</div>
            </div>
            <div
                className="w-full flex flex-col p-2 max-w-5xl m-auto space-y-6 justify-center items-center mt-[150px] transition-all duration-500 h">
                <div className=" opacity-1 w-full space-x-3 grid grid-cols-2 relative">
                    <div className="flex justify-center items-center">
                        <div className="text-4xl font-bold text-secondary-main pt-2">1965</div>
                        <div className="flex justify-center items-center">
                            <div className="w-10 h-10 border-secondary-main rounded-full border-[8px]"></div>
                            <div className="flex justify-center items-center">
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                                <div className="w-2 h-2 border-secondary-main rounded-full border-[8px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-96 m-auto">50,000 Litres per day liquid milk processing facility was set up
                        at Bengaluru and Expanded to 3.5 Lakh Litres(in 1994)</div>
                </div>
                <div className=" opacity-1 w-full grid grid-cols-2 relative">
                    <div className="w-full m-auto max-w-96">First Dairy in Karnataka set up at Kudige, Kodagu Dist</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="w-2 h-2 border-primary-main rounded-full border-[8px]"></div>
                                <div className="w-[40px] md:w-[140px] h-[2px] bg-black"></div>
                            </div>
                            <div className="w-10 h-10 border-primary-main rounded-full border-[8px]"></div>
                        </div>
                        <div className="inline-block text-4xl font-bold text-primary-main pt-2">1955</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
    </div>
  );
}

export default OrganizationChart;
