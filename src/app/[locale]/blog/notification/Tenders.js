import React from 'react';
import Link from 'next/link';
import formatDateToDDMMYY from '@/lib/api/formatDate';

function Tenders({ title, tenderNo, date, link, handlePdfPreview, startDate }) {
  return (
    <ul role="list" className="divide-y  bg-white divide-gray-100 w-full border-b-2 shadow-md p-3 border-primary-main  ">
  
      <li onClick={()=>handlePdfPreview(link)} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{title}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{tenderNo}</p>
            <div className='flex space-x-4'>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Start Date: {formatDateToDDMMYY(startDate)}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Last Date: {formatDateToDDMMYY(date)}</p>
            </div>
            
          </div>
        </div>
        <div className=" shrink-0  flex  flex-col  items-end  justify-end">
         <Link href={link || ''} className="text-sm leading-6 cursor-pointer bg-primary-gradient p-2   text-white" download target='blank'> Download </Link> 
        </div>
      </li>
    
  </ul>
  );
}

export default Tenders;
