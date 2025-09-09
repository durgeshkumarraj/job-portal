import React from 'react';
import Navbar from './shared/Navbar';
import FilterCards from './FilterCards';
import Job from './Job';
import { useSelector } from 'react-redux';

function Jobs() {
    const { allJobs } = useSelector((store) => store.job);

    console.log(allJobs); // Debug Redux state

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-4">
                    {/* Filter Cards Section */}
                    <div className="w-1/6">
                        <FilterCards />
                    </div>

                    {/* Job Cards Section */}
                    {allJobs?.length === 0 ? (
                        <span>Job not Found</span>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {allJobs?.map((job) => (
                                    <div key={job._id}>
                                        <Job job={job} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jobs;
