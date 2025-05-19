import React from 'react';
 
import useApi from '@/hooks/useApi';
import { useState,useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Fade, Zoom } from 'react-reveal';
function OngoingAndFuture({ setLoading}) {

  const [futureProjects,setFutureProjects]=useState([])
  const [ongoingProjects,setOngoingProjects]=useState([])
  const axios=useApi()
  const locale=useParams()?.locale
  useEffect(()=>{
    (async()=>{
      const {data}= await axios.get('/api/projects?sort[0]=order:asc')
      const incomingFutureProjects=data?.data?.filter(item=>item?.attributes?.status==='future')
      const incomingOngoingProjects=data?.data?.filter(item=>item?.attributes?.status==='ongoing')
      setFutureProjects(incomingFutureProjects)
      setOngoingProjects(incomingOngoingProjects)
      setLoading(false)
    })()
  },[])
  return (
    <div className="w-full flex-col    max-w-5xl m-auto h-full   overflow-auto  items-start justify-start p-10 space-y-5">
  
      <table className="table-fixed  bg-[#FDF9F7] rounded-ld shadow-md border-spacing-y-2	 border-collapse border     min-w-full">
        <thead className=" ">
          <tr className="text-md   bg-secondary-lighter ">
          <th className="p-2">{locale==='en'?'S.NO':'ಕ್ರ.ಸಂ'}</th>
            <th className="p-2 text-start">{locale==='en'?'ONGOING PROJECTS':'ಪ್ರಸ್ತುತ ಯೋಜನೆಗಳು'}</th>
          </tr>
        </thead>



        <tbody className="text-start  text-sm">
          {ongoingProjects?.map((item, idx) => {
         return (
          <tr key={idx}>
            <td className="p-2 text-center text-lg ">{idx+1}</td>
            <Zoom>
            <td className="p-2 text-lg">{item?.attributes?.project_name}</td>
            </Zoom>
          </tr>
        );
         
          })}
        </tbody>
      </table>
    



      <table className="table-auto shadow-md bg-[#FDF9F7] rounded-lg  border-spacing-y-2	 border-collapse border      min-w-full">
        <thead className="  ">
          <tr className="text-md bg-secondary-lighter ">
            <th className="p-2">{locale==='en'?'S.NO':'ಕ್ರ.ಸಂ'}</th>
            <th className="p-2 text-start">{locale==='en'?'FUTURE PROJECTS':'ಭವಿಷ್ಯದ ಯೋಜನೆಗಳು'}</th>
          </tr>
        </thead>

        <tbody className="text-start  text-sm">
          {futureProjects?.map((item, idx) => {
         
            return (
              <tr key={idx}>
                
                <td className="p-2 text-center text-lg ">{idx+1}</td>
                <Zoom>
                <td className="p-2 text-lg">{item?.attributes?.project_name}</td>
                </Zoom>
              </tr>
            );
          })}
        </tbody>
      </table>



    </div>
  );
}

export default OngoingAndFuture;
