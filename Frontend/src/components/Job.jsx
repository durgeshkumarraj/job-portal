import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({ job }) {
    const navigate = useNavigate();
    // const jobId="jhkjfakfkgghbh"
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-gray-200">
            <div className="flex items-center justify-between">
                <p>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg?semt=ais_hybrid" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg  font-medium'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg gap-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center mt-5">
                <Badge className="text-blue-700 font-bold" variant="ghost"> {job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost"> {job?.jobType}Job Types</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost"> {job?.salary}24 LPA</Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="hover:bg-gray-100 active:bg-gray-200">Details</Button>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800">Save for letter</Button>
            </div>
        </div>
    )
}

export default Job
