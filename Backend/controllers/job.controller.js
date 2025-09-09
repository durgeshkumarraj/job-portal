import {Job} from "../models/job.model.js"
export const postJob = async (req, res) => {
    try {
        const { title, description, location, salary, jobType, experienceLevel, position, companyId, requirements } = req.body;
        const userId = req.id;

        if (!title || !description || !location || !salary || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(404).json({
                message: "Something is missing",
                success: false,
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            location,
            salary,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            created_by:userId
        });
        return res.status(201).json({
            message: "JOb created successfully",
            job,
            success:true,
        })
  
    } catch (error) {
       console.log(error)
        
    }
}
export const  getAllJob=async (req,res)=>{
    try {
        const keyword= req.query.keyword||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]

        };
        const jobs=await Job.find(query).populate({
            path:"company",
        }).sort({createAt:-1});
        if(!jobs){
        return res.status(404).json({
            message:"jobs not found",
            success:false,
        });   

};
return res.status(200).json({
    jobs,
    success:true,
});
        
    } catch (error) {
        console.log(error)
        
    }
}
export const getJobById=async (req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false,
            });
        };

        return res.status(200).json({job,success:true});
    } catch (error) {
        console.log(error);   
    }
}

export const getAdminJobs= async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"jons not found",
                success:false,

            });
        };
        return res.json(200)({
            jobs,
            success:true
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
