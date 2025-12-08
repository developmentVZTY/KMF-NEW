'use client'
import React,{useState,useEffect} from 'react'
import directorImg from '@/images/directors/directorsbg.png';

import Follow from '@/components/Follow.js';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import Zoom from 'react-reveal/Zoom';
import { Fade } from 'react-reveal';
import { ParallaxBanner } from 'react-scroll-parallax';
 import { useMyContext } from '@/context/headerContext';

const Executive = () => {
  const [md,setMd]=useState([])
  const [unionCheifs,setUnionCheif]=useState([])

  const [unitCheifs,setUnitCheif]=useState([])
  const [executives,setExecutives]=useState([])
 
  const { isScroll, setIsScroll } = useMyContext();


  const axios =useApi()
  const locale=useParams().locale
  
  useEffect(()=>{
    (
      async()=>{
   

        const {data:chairman}= await axios.get('/api/md')
        const {data:executive}=await axios.get('/api/executives?sort[0]=order:asc')
        const {data:unitchief}=await axios.get('/api/unitcheifs?sort[0]=order:asc')
        const {data:unioncheif}=await axios.get('/api/unioncheifs?sort[0]=createdAt:asc')
        
        let orderExecutive = new Array(executive?.data?.length).fill(null);
        let orderUnion = new Array(unioncheif?.data?.length).fill(null);

        let orderUnits = new Array(unitchief?.data?.length).fill(null);

        


        let indexE = 0;
        let indexUT=0;
        let indexUN=0;

        // Executives
        executive?.data.forEach(item => {
          if (item?.attributes?.order != null) {
            orderExecutive[item?.attributes?.order - 1] = item;
          }
        });

        executive?.data.forEach(item => {
          if (item.attributes.order === null) {
            while (orderExecutive[indexE] !== null) {
              indexE++;
            }
            if (indexE < orderExecutive.length) {
              orderExecutive[indexE] = item;
            }
          }
        });


    
 

        // unitCheifs

        unitchief?.data.forEach(item => {
          if (item?.attributes?.order != null) {
            orderUnits[item?.attributes?.order - 1] = item;
          }
        });

        unitchief?.data.forEach(item => {
          if (item.attributes.order === null) {
            while (orderUnits[indexUT] !== null) {
              indexUT++;
            }
            if (indexUT < orderExecutive.length) {
              orderUnits[indexUT] = item;
            }
          }
        });
        
        

   
       
        setMd(chairman?.data)
        setUnionCheif(unioncheif?.data)
        setUnitCheif(unitchief?.data)
        setExecutives(orderExecutive)
     
    
      }
    )()
  },[])


   const executivess = [
  {
    name: "Smt. Padmavathi R",
    designation: "Director",
    department: "Admin/MIS",
    working: "KMF CO",
    mobile: "7411654002 / 7411654008",
    email: "admin@kmf.coop, mis@kmf.coop",
  },
  {
    name: "Shri Raghunandan M",
    designation: "Director-1",
    department: "Marketing",
    working: "KMF CO",
    mobile: "7411654009",
    email: "director.mktg@kmf.coop",
  },
  {
    name: "Shri Satish Kumar M S",
    designation: "Director-2",
    department: "Marketing",
    working: "KMF CO",
    mobile: "7411654010",
    email: "director.marketing2@kmf.coop",
  },
  {
    name: "Shri Ramesh B Konnur",
    designation: "Director",
    department: "Finance",
    working: "KMF CO",
    mobile: "7411654003",
    email: "director.finance@kmf.coop",
  },
  {
    name: "Dr Basavaraj K S",
    designation: "Director",
    department: "Animal Husbandry",
    working: "KMF CO",
    mobile: "7411654011",
    email: "ah@kmf.coop",
  },
  {
    name: "Shri Rajashekara Murthy",
    designation: "Director",
    department: "QC",
    working: "KMF CO",
    mobile: "7411654005",
    email: "director.qa@kmf.coop",
  },
  {
    name: "Shri Raghavendra H K",
    designation: "Director-1",
    department: "Engineering",
    working: "KMF CO",
    mobile: "7411654006",
    email: "engg@kmf.coop",
  },
  {
    name: "Shri Ramakrishnappa P",
    designation: "Director-2",
    department: "Engineering",
    working: "KMF CO",
    mobile: "7411654007",
    email: "engg@kmf.coop",
  },
  {
    name: "Shri M S Suhael",
    designation: "Director",
    department: "Systems and Purchase",
    working: "KMF CO",
    mobile: "7411654004",
    email: "director.purchase@kmf.coop",
  },
  {
    name: "Shri Jaikumar J",
    designation: "Director",
    department: "Cattle Feed Raw Materials",
    working: "KMF CO",
    mobile: "7411654054",
    email: "director.cf@kmf.coop",
  },
  {
    name: "Smt Shakuntala C N",
    designation: "Director",
    department: "Central Vigilance Team",
    working: "KMF CO",
    mobile: "9591994317",
    email: "kmf.cvt@kmf.coop",
  },
  {
    name: "Shri. Ranganath R",
    designation: "I/C Director",
    department: "Production",
    working: "KMF CO",
    mobile: "7411654085",
    email: "production@kmf.coop",
  },
];


 const unionCheifss = [
  {
    attributes: {
      name: "Dr. S.T. Suresh",
      designation: "Managing Director, BAMUL",
      working:
        "Bangalore Urban, Rural & Ramanagara District Co-Operative Milk Producers Socities Union Ltd.",
      mobile: "7411654147",
      email: "bamulmd@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. K.N. Gopalamurthy",
      designation: "Managing Director, KOMUL",
      working:
        "Kolar-Chikkaballapura District Co-operative Milk Producers Union Ltd.",
      mobile: "7411654182",
      email: "komulmd@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Suresh Nayak K.N",
      designation: "Managing Director, MYMUL",
      working: "Mysuru Milk Union Limited",
      mobile: "7411654261",
      email: "mymuladmn@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Srinivasan G",
      designation: "Managing Director, TUMUL",
      working:
        "Tumkur Co-operative Milk Producers' Societies Union Limited.",
      mobile: "7411654290",
      email: "mdtmu@yahoo.com",
    },
  },
  {
    attributes: {
      name: "H. Mahesh",
      designation: "Managing Director, HAMUL",
      working:
        "Hassan Co-operative Milk Producer's Society Union Ltd.",
      mobile: "7411654220",
      email: "hamul77mis@yahoo.com",
    },
  },
  {
    attributes: {
      name: "Dr. P.R. Manjesh",
      designation: "Managing Director, MANMUL",
      working:
        "Mandya District Co-Operative Milk Producers Society's Union Limited",
      mobile: "7411654250",
      email: "manmul1987@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. S.G. Shekar",
      designation: "Managing Director, SHIMUL",
      working:
        "Shivamogga, Davanagere, Chitradurga District Co-Operative Milk Producers Society's Union Limited",
      mobile: "7411654277",
      email: "md_shimul@yahoo.com",
    },
  },
  {
    attributes: {
      name: "Shri. Peeriya Naika G",
      designation: "I/C Managing Director, RBKMUL",
      working:
        "Raichur, Bellary and Koppal District Co-Operative Milk Producers Society's Union Limited",
      mobile: "7411654270",
      email: "mdrbkmul@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Vivek D",
      designation: "Managing Director, DKMUL",
      working:
        "Dakshina Kannada Cooperative Milk Producers' Union Ltd",
      mobile: "7411654212",
      email: "miskdmul@gmail.com",
    },
  },
  {
    attributes: {
      name: "Dr. Veeresh Tarali",
      designation: "I/C Managing Director, DHAMUL",
      working:
        "Dharwad, Gadag and Uttara Kannada District Co-Operative Milk Producers Society's Union Ltd.",
      mobile: "7411654024",
      email: "dharwamnil@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Krishnappa M",
      designation: "Managing Director, BEMUL",
      working:
        "Belagavi District Co-operative Milk Producers' Societies' Union Limited",
      mobile: "7411654165",
      email: "bemulmd@gmail.com, mis.bemul@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Shivashankara Swamy D T",
      designation: "Managing Director, VIMUL",
      working:
        "Vijayapura & Bagalkot District Co-Operative Milk Producers Society's Union Ltd.",
      mobile: "7411654300",
      email: "md_bijapur@rediffmail.com",
    },
  },
  {
    attributes: {
      name: "Dr. P.V. Patil",
      designation: "Managing Director, GUMUL",
      working:
        "Kalaburagi-Bidar and Yadgir District Co-Operative Milk Producers Society's Union Ltd.",
      mobile: "7411654244",
      email: "mdgumal@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Kuruba Rajkumar",
      designation: "Managing Director, CHAMUL",
      working:
        "Chamarajanagara District Co-Operative Milk Producers Society's Union Ltd.",
      mobile: "7411654171",
      email: "chamulmd@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Ashok Gowda",
      designation: "Managing Director, HAVEMUL",
      working:
        "Haveri District Co-Operative Milk Producers Society's Union Ltd.",
      mobile: "7411654237",
      email: "mdhaveemul@kmf.coop",
    },
  },
];

 const unitCheifss = [
  {
    attributes: {
      name: "Shri. Manjunath H.S.",
      designation: "Director",
      working: "Mother Dairy",
      mobile: "7411654061",
      email: "motherdairymd_kmf@yahoo.com",
    },
  },
  {
    attributes: {
      name: "Smt. Nalini H.J.",
      designation: "Director",
      working: "Central Training Institute",
      mobile: "7411654126",
      email: "cti@kmf.coop",
    },
  },
  {
    attributes: {
      name: "Shri. P.H. Rangaswamy",
      designation: "Director",
      working: "Nandini Hitech Plant",
      mobile: "7411654100",
      email: "director.nhpp@kmf.coop",
    },
  },
  {
    attributes: {
      name: "Shri. Govindegowda",
      designation: "Director",
      working: "NHMPP, Ramanagara",
      mobile: "7411654092",
      email: "kmfstorekmfstoresnhmpp@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. V.C. Venkatesh",
      designation: "General Manager",
      working: "Cattele Feed Plant Rajanakunte",
      mobile: "7411654017",
      email: "kmfcfpr@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Lakshmi Ranganath H M",
      designation: "General Manager",
      working: "Cattle Feed Plant Hassana",
      mobile: "7411654113",
      email: "kmfcp_hsn@yahoo.co.in",
    },
  },
  {
    attributes: {
      name: "Dr. M.H. Rajappa",
      designation: "General Manager",
      working: "Cattele Feed Plant, Dharwada",
      mobile: "7411654105",
      email: "kmfcpd@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Girish L",
      designation: "General Manager",
      working: "Cattle Feed Plant Gubbi",
      mobile: "7411654108",
      email: "kmfcfpg_gubbi@yahoo.co.in",
    },
  },
  {
    attributes: {
      name: "Shri. B.T. Kishor",
      designation: "General Manager",
      working: "Cattele Feed Plant Shikaripura",
      mobile: "7411654122",
      email: "kmfcfps@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. B. Dinakar",
      designation: "General Manager",
      working: "Nandini Pouch Film Plant, Munekollal",
      mobile: "7411654133",
      email: "kmfpfp123@rediffmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Ranganath R",
      designation: "General Manager",
      working: "Nandini Milk Products",
      mobile: "7411654085",
      email: "kmf.nmp@kmf.coop",
    },
  },
  {
    attributes: {
      name: "Dr. Patil R.D.",
      designation: "General Manager",
      working: "Dharwad Training Center",
      mobile: "7411654137",
      email: "kmftcd_dwd@yahoo.co.in",
    },
  },
  {
    attributes: {
      name: "Dr. Joshi V.K",
      designation: "General Manager",
      working: "Kalburagi Training Center",
      mobile: "7411654141",
      email: "tc.kalaburgi@kmf.coop",
    },
  },
  {
    attributes: {
      name: "Shri. V. Ravikiran",
      designation: "General Manager",
      working: "Ice Cream Plant Bellary",
      mobile: "9591558477",
      email: "icpbellary@yahoo.in",
    },
  },
  {
    attributes: {
      name: "Shri. S.C. Arvind",
      designation: "Joint Director",
      working: "Mysore Training Center",
      mobile: "7411654126",
      email: "kmfmystc@gmail.com",
    },
  },
  {
    attributes: {
      name: "Shri. Siddegowda",
      designation: "I/C Director",
      working: "KMF Dempo Dairy",
      mobile: "7411654199",
      email: "dempodairy@yahoo.co.in",
    },
  },
  {
    attributes: {
      name: "Shri. M.B. Chandru",
      designation: "I/C Director",
      working: "Nandini Sperm Station",
      mobile: "7411654077",
      email: "director.nss@kmf.coop",
    },
  },
];



   
  return (
    <div className={`w-full h-full absolute   z-[-1]  ${isScroll ? ' md:top-48' : ''} `}>

 
    <section
      className={`w-full h-full  md:h-[500px] pt-28 relative  grid place-items-center company-bg`}>
       
      <img src="/images/executive.jpg" className="w-full h-full object-cover absolute top-0 z-[-1]" />
    
    </section>

    <section className="w-full   pt-10  ">
    <div className="  relative w-full  flex justify-center items-center ">
           
              <h1 className=" text-primary-main relative z-10 font-heading text-4xl font-extrabold uppercase">
              {locale==='kn'?' ಕಹಾಮದ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿಗಳು':'KMF Executives'}
              </h1>
            </div>
    

    <div className='  h-full flex justify-center items-center   '>
      <Fade bottom>
    <div className='w-full max-w-7xl mt-auto min-h-44  md:h-2/4   justify-center items-center  rounded-tl-3xl rounded-br-3xl flex flex-col   p-3'>
            <div className='md:w-1/2 flex   justify-center  items-center mt-6 lg:pt-3 lg:pb-3 transition-all duration-300 md:mt-0 rounded-full hover:scale-[1.1]  '  >
              <Zoom>
              <img className='w-[200px] h-[200px]   object-contain  sm:w-[350px] sm:h-[390px] transition-all duration-300   ' src={md?.attributes?.image?.data?.attributes?.url} alt="" />
              </Zoom>
            </div>
            <div className=' md:w-2/3 flex flex-col justify-center items-center mt-3 md:p-3 md:items-center lg:mt-0 '>
              <div>
                <p className='text-3xl md:text-4xl font-lato font-bold text-center md:text-start text-black'>{md?.attributes?.name}</p>
                <p className=' text-lg flex justify-center items-center  w-full  font-lato text-center md:text-start text-black '>{md?.attributes?.description}</p>
              </div>
           
            </div>
        </div>
        </Fade>
    
      </div>
    <div>


    <div className='w-full max-w-[1400px] m-auto p-5   '>
      <div className=''>
        <Fade top>
        <h1 className='text-3xl font-bold font-heading'>
              {locale === "en" ?"Executives":"ಕಾರ್ಯನಿರ್ವಾಹಕರು"}
        </h1>
        </Fade>
      </div>

      <div className='w-full overflow-auto'>
      <table className="      border-spacing-y-2	max-w-7xl  border-collapse w-full border overflow-auto ">
        <thead className=" bg-primary-main text-white min-w-full ">
          <Fade top>
          <tr className="  text-[5.5px]  md:text-lg   ">
            <th className="p-2 text-start font-heading ">
              {locale === "en" ?"Name":"ಹೆಸರು"}
              </th>
          
            <th className="p-2 text-start font-heading">  {locale === "en" ?"Designation":"ಪದನಾಮ"}	</th>
            <th className="p-2 text-start font-heading "> {locale === "en" ?"Department":"ವಿಭಾಗ"} </th>
            <th className="p-2 text-start  font-heading"> {locale === "en" ?"Place of working":"ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಸ್ಥಳ"}   </th>
            <th className="p-2 text-start  font-heading"> {locale === "en" ?"Mobile No":"ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}</th>

            <th className="p-2 text-start  font-heading">  {locale === "en" ?"Email Id":"ಇಮೇಲ್ ಐಡಿ"} </th>

 
          </tr>
          </Fade>
        </thead>

        {/* <tbody className="text-start text-xs     bg-secondary-gradient">
        {executives?.map((item,id)=>{
        
         

 return(
    
    <tr className='border-t  text-[5.5px] md:text-lg' key={id}>
      <Fade bottom>
    <td className="p-1   ">{item?.attributes?.name}</td>
   
    <td className="p-1  ">{item?.attributes?.designation}</td>
    <td className="p-1    ">{item?.attributes?.department}</td>
    <td className="p-1  text-center"> {item?.attributes?.working}</td>
    <td className="p-1  text-center"> {item?.attributes?.mobile}</td>
    <td className="p-1  "> {item?.attributes?.email}</td>
    </Fade>
  </tr>
   
 )



} )}

         
      
        </tbody> */}
        <tbody className="text-start text-xs bg-secondary-gradient">
  {executivess.map((item, id) => (
    <tr className="border-t text-[5.5px] md:text-lg" key={id}>
      <Fade bottom>
        <td className="p-1">{item.name}</td>
        <td className="p-1">{item.designation}</td>
        <td className="p-1">{item.department}</td>
        <td className="p-1 text-center">{item.working}</td>
        <td className="p-1 text-center">{item.mobile}</td>
        <td className="p-1">{item.email}</td>
      </Fade>
    </tr>
  ))}
</tbody>

      </table>
        </div>


  

      </div>


      <div className='w-full max-w-[1400px] m-auto  p-5 '>
      <div className=''>
        <Fade top>
        <h1 className='text-3xl font-bold font-heading'>
                 {locale === "en" ?"Union Chief":"ಒಕ್ಕೂಟಗಳ ಮುಖ್ಯಸ್ಥರು"}
        </h1>
        </Fade>
      </div>


     <div className='w-full overflow-auto'>
     <table className="  border-spacing-y-2	max-w-7xl  border-collapse w-full border overflow-auto">
        <thead className="bg-primary-main text-white  ">
          <tr className="text-[5.5px] md:text-lg ">
<Fade top>
            <th className="p-2 text-start font-heading ">   {locale === "en" ?"Name":"ಹೆಸರು"}</th>
            <th className="p-2 text-start font-heading"> {locale === "en" ?"Designation":"ಪದನಾಮ"}	</th>
            <th className="p-2 text-start font-heading">{locale === "en" ?"Place of working":"ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಸ್ಥಳ"} 	</th>
            <th className="p-2   font-heading text-center">{locale === "en" ?"Mobile No":"ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}</th>

<th className="p-2 text-start  font-heading">{locale === "en" ?"Email Id":"ಇಮೇಲ್ ಐಡಿ"}</th>
</Fade>
          </tr>
        </thead>

        <tbody className="text-start     bg-secondary-gradient">
        {unionCheifss?.map((item,id)=>{
 


 return(
    
  <tr className='border-t text-[5.5px] md:text-lg' key={id} >
    <Fade bottom>
  <td className="p-1    ">{item?.attributes?.name}</td>
  <td className="p-1  ">{item?.attributes?.designation}</td>
  <td className="p-1   overflow-auto">{item?.attributes?.working}</td>
  <td className="p-1   overflow-auto text-center">{item?.attributes?.mobile}</td>
  <td className="p-1   overflow-auto">{item?.attributes?.email}</td>
  </Fade>

</tr>
 )



} )}

         
      
        </tbody>
      </table>
     </div>

      </div>


      <div className='w-full p-5  max-w-[1400px]  m-auto overflow-auto'>
      <div className=''>
        <Fade top>
        <h1 className='text-3xl font-bold font-heading'>
        {locale === "en" ?"Unit Chief":"ಘಟಕಗಳ ಮುಖ್ಯಸ್ಥರು"}
              
        </h1>
        </Fade>
      </div>


      <div className='w-full overflow-auto'>
      <table className="  border-spacing-y-2	max-w-7xl  border-collapse w-full border overflow-auto">
        <thead className=" w-full bg-primary-main text-white ">
          <tr className="  text-[5.5px] md:text-lg   ">
            <Fade top>
            <th className="p-2 text-start font-heading"> {locale === "en" ?"Name":"ಹೆಸರು"}</th>
            <th className="p-2 text-start font-heading"> {locale === "en" ?"Designation":"ಪದನಾಮ"}	</th>
            <th className="p-2 text-start font-heading ">{locale === "en" ?"Place of working":"ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಸ್ಥಳ"} 	</th>
            <th className="p-2   font-heading text-center">{locale === "en" ?"Mobile No":"ದೂರವಾಣಿ ಸಂಖ್ಯೆ"}</th>

<th className="p-2 text-start  font-heading">{locale === "en" ?"Email Id":"ಇಮೇಲ್ ಐಡಿ"}</th>
</Fade>
          </tr>
        </thead>

        <tbody className="text-start     bg-secondary-gradient">
        {unitCheifss?.map((item,id)=>{
 


 return(
    
  <tr className='border-t text-[5.5px] md:text-lg' key={id} >
    <Fade bottom>
  <td className="p-1    ">{item?.attributes?.name}</td>
  <td className="p-1  ">{item?.attributes?.designation}</td>
  <td className="p-1   overflow-auto">{item?.attributes?.working}</td>
  <td className="p-1   overflow-auto text-center">{item?.attributes?.mobile}</td>

  <td className="p-1   overflow-auto">{item?.attributes?.email}</td>
  </Fade>
</tr>
   
 )



} )}

         
      
        </tbody>
      </table>
      </div>

      </div>
    </div>
     
    </section>

    <Footer/>
  </div>
  )
}

export default Executive
