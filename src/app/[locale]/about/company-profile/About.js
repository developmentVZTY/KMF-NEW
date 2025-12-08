import React, { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import useLocale from '@/hooks/useLocale';
import { Zoom } from 'react-reveal';

function About({ setLoading }) {
  const [aboutUs, setAboutUs] = useState([]);
  const [readMore, setReadMore] = useState(false);
const locale=useLocale().locale
  const axios = useApi();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/our-journeys');

      setAboutUs(data?.data[0]?.attributes?.description);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full   m-auto  rounded-lg      flex-col items-start justify-start p-10 space-y-5">
       <div  >
                  <Zoom>

                  <p className="text-xl font-josefin   text-justify">
  Karnataka Milk Federation – a harbinger of rural prosperity<br/><br/>
  Karnataka Milk Federation (KMF) is the largest cooperative dairy Federation in South India, owned and managed by milk producers of Karnataka State.
  KMF has over 2 million milk producers in over 10500 Dairy Cooperative Societies at village level, functioning under 13 District Cooperative Milk Unions in Karnataka State.
  The mission of the federation is to usher rural prosperity through dairy development. During the last four decades of cooperative dairy development by KMF,
  the dairy industry in Karnataka has progressed from a situation of milk-scarcity to that of milk-surplus.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  “Quality Excellence from Cow to Consumer” is the motto of the Federation to obtain better-quality Milk and milk products from our value chain
  (Procurement to Processing to Marketing). Thus milk and milk products under the “Nandini” brand name are unmatched in quality and available to consumers at competitive prices.
  In a way Nandini Milk and Milk Products are “Spreading wealth of health”.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  Karnataka Cooperative Milk Producers'\ Federation Limited (KMF) is the Apex Body in Karnataka representing Dairy Farmers Co-operatives.
  It is the second largest dairy co-operative in the country and the largest in South India in procurement and sales.
  One of the core functions of the Federation is marketing of Milk and Milk Products. Nandini is a household name for pure and fresh milk and milk products.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  KMF has 13 Milk Unions throughout the State which procure milk from Primary Dairy Cooperative Societies (DCS) and distribute milk to consumers in towns, cities and rural markets of Karnataka.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  The first ever World Bank funded Dairy Development Program in the country started in Karnataka with the organization of Village Level Dairy Co-operatives in 1974.
  The AMUL/ANAND pattern of dairy cooperatives started functioning in Karnataka from 1974–75 with financial assistance from World Bank under Operation Flood II & III.
  Dairy cooperatives were structured in three tiers — Village Level Dairy Co-operatives at the base, District Milk Unions at the middle level handling procurement,
  processing and marketing, and the Karnataka Milk Federation at the Apex level coordinating the statewide activities.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  Coordination of activities among the Unions and developing the market for Milk and Milk products is the responsibility of KMF.
  Milk marketing is organized by respective Unions within their jurisdiction. Surplus/deficit milk among unions is balanced by KMF.
  All milk and milk products within and outside the State are marketed by KMF under the “NANDINI” brand.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  <strong>Objectives</strong><br/><br/>
  KMF is a Cooperative Apex Body in Karnataka implementing all-round dairy development activities to achieve the following:<br/>
  • Ensure assured and remunerative market for milk produced by farmer members.<br/>
  • Provide quality milk and dairy products to urban consumers.<br/>
  • Build and develop village-level cooperative institutions to manage dairy activities.<br/>
  • Provide inputs for milk production, processing, and dissemination of know-how.<br/>
  • Facilitate rural development by providing self-employment opportunities, preventing migration, introducing cash economy, and creating sustained income.<br/><br/>
  The philosophy of dairy development is to eliminate middlemen and organize institutions owned and managed by milk producers with professional support.
  The core objective is achieving economies of scale to ensure maximum returns to producers while providing wholesome milk to consumers at reasonable prices.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  Ultimately, this cooperative network bridges rural producers and urban consumers, bringing socio-economic development across Karnataka.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  <strong>Evolution</strong><br/><br/>
  Karnataka Milk Federation (KMF) evolved as a premier and profitable dairy farmers’ organization in Karnataka.
  In 1975, Karnataka Dairy Development Corporation (KDDC) was formed to implement World Bank Aided Dairy Projects.
  As dairying spread across the State, KMF emerged in 1983 covering the entire State with 13 District Milk Unions that performed activities including:
  organizing Dairy Co-operatives, Milk Routes, Veterinary Services, two-shift milk procurement, chilling, processing, distribution,
  and establishment of Cattle Feed Plants, Nandini Sperm Station, Liquid Nitrogen Supply and Training Centers.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  The structure was modeled after the ANAND pattern dairy cooperatives.
  Initially, eight southern districts were targeted for organizing 1800 Dairy Co-operatives, four Milk Unions and processing facilities of 6.5 lakh liters/day by 1984.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  Under Operation Flood II & III (1984 & 1987), the rest of Karnataka was covered.
  Thirteen unions were organized in 175 talukas of 20 districts. Processing facilities like chilling centers, dairies and powder plants were gradually transferred
  to District Unions. Additional facilities were added every decade with support from Govt., Zilla Panchayat, and NDDB.
  Today the processing capacity is 32.25 lakh liters/day and continues to expand.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  <strong>Company Objectives</strong><br/><br/>
  Karnataka Milk Federation (KMF) aims to:<br/>
  • Provide assured and remunerative market for milk from farmer members.<br/>
  • Provide quality milk to urban consumers.<br/>
  • Build village-level cooperative institutions to manage dairy operations.<br/>
  • Facilitate rural development through self-employment, reduced migration, cash economy and steady income.<br/><br/>
  The philosophy focuses on eliminating middlemen and empowering producers through cooperative ownership and professional management.
  The aim is achieving economies of scale to maximize returns to producers while supplying wholesome milk at fair prices to consumers.
</p><br/>

<p className="text-xl font-josefin   text-justify">
  <strong>ISO 9002 & HACCP Certification</strong><br/><br/>
  Mother Dairy obtained ISO 9002 and HACCP Certification from BIS in December 2000.
  It is the first and only dairy in South India to secure this comprehensive certification.
</p><br/>


                
                </Zoom>
                </div>
      {/* {aboutUs.length > 2
        ? aboutUs?.map((item, idx) => {
          
            if (idx < 2) {
              return (
                <div key={idx} className={`${readMore ? 'hidden' : ''}`}>
                  <Zoom>
                  <p className="text-xl font-josefin   text-justify">{item?.children[0]?.text}</p><br/>

                
                </Zoom>
                </div>
              );
        
            }
          })
        : aboutUs?.map((item, idx) => {
            return (
              <p key={idx} className="text-xl font-josefin font-bold  text-justify">
                {item?.children[0]?.text}
              </p><br/>
            );
          })}
                <div
              className={`w-full flex justify-end items-end text-lg  text-primary-main hover:underline cursor-pointer ${readMore?'hidden':''}`}
              onClick={() => setReadMore(true)}>
            {locale==='kn'?'ಮತ್ತಷ್ಟು ಓದಿ...':'  Read more...'}
            </div>

      {readMore &&
        aboutUs?.map((item, idx) => {
          return (
            <p key={idx} className="text-xl font-josefin  text-justify ">
              {item?.children[0]?.text}
            </p><br/>
          );
        })} */}
          {/* <div
              className={`w-full flex justify-end items-end text-lg text-primary-main hover:underline cursor-pointer ${!readMore?' hidden':'block'}`}
              onClick={() => setReadMore(false)}>
            
              {locale==='kn'?' ಕಡಿಮೆ ಓದಿ':'   Read Less...'}
            </div> */}
    </div>
  );
}

export default About;
