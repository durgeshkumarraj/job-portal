import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { LogIn, User } from 'lucide-react';
import { setSingleJob } from '@/redux/jobSlice';
import { use } from 'react';
import { toast } from 'sonner';

function JobDescription() {
 
  const param =useParams();
  const jobId=param.id;
  const {singleJob}=useSelector(store=>store.job)
  const {user}=useSelector(store=>store.auth)

  const isIntiallyApplied = singleJob?.applications?.some(application=>application.applicant===user?.id)||false
  const[isApplied,seIsApplied]=useState(isIntiallyApplied)
  const dispatch=useDispatch();

  const applyJobHandler= async()=>{
try {
  const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
  if(res.data.success){
    setIsApplied(true);
    const updatedSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
    dispatch(setSingleJob(updatedSingleJob))
    toast.success(res.data.message);

  }
} catch (error) {
  console.log(error);
  toast.error(error.response.data.message);
  
  
}
  }
  useEffect(()=>{
    const fetchSingleJob=async()=>{
      try {
        const res=await axios.get(`${JOB_API_END_POINT}/get/{jobId}`,{withCredentials:true});
        console.log(res.data)
        if(res.data.success){
          dispatch(setSingleJob(res.data.job))
        }
      } catch (error) {
        console.log(error)
        
      }
    }
    fetchSingleJob();
  },[jobId,dispatch,user?._id]);
  return (
    <div className='max-w-4xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob ?.title} title</h1>
          <div className="flex items-center mt-5">
            <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost"> {singleJob?.jobType}Job Types</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost"> { singleJob?.salary}24 LPA</Badge>
          </div>
        </div>
        <Button  onClick={isApplied? null :applyJobHandler}disable={isApplied} className="bg-black text-white {`rounded-lg ${isApplied ?'bg-gray-600 cursor-not-allowed':'bg-[#7209b7] hover:bg-[#78698]'}`}">{isApplied ? "Already Applied" : 'Apply Now'}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role<span className=' pl-4 font-normal  '>{singleJob?.title} </span></h1>
        <h1 className='font-bold  my-1'>Location<span className=' font-normal pl-4'>{singleJob?.location}</span></h1>
        <h1 className='font-bold  my-1'> Description<span className=' font-normal pl-4'>{singleJob?.description}.</span></h1>
        <h1 className='font-bold  my-1'> Experience<span className=' font-normal pl-4'>{singleJob?. Experience}</span></h1>
        <h1 className='font-bold my-1'>Salary<span className=' font-normal  pl-4'>{singleJob?.salary}</span></h1>
        <h1 className='font-bold  my-1'> Total Applicant<span className=' font-normal  pl-4'>4</span>{singleJob?.applications?.length}</h1>
        <h1 className='font-bold  my-1'> Posted Date <span className=' font-normal  pl-4'>{singleJob?.createdAt.split("T")[0]}</span></h1>
      
      </div>
    </div>

  )
}

export default JobDescription
