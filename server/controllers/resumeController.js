import Resume from "../models/resume.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs"; 


//controller for creating a new resume
//POST:/api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set in the request object by authentication middleware
        const {title}=req.body;

        //create new resume
        const newResume = await Resume.create({ userId, title });
        //return success response with resume data
        return res.status(201).json({ message: "Resume created successfully", resume: newResume });
    }
    catch (error) {
        console.error("Error creating resume:", error);
        return res.status(400).json({ message: error.message });
    }

}

//controller for deleting a resume
//DELETE:/api/resumes/:id
export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId; // Assuming userId is set in the request object by authentication middleware

        await Resume.findOneAndDelete({ _id: resumeId, userId });
        return res.status(200).json({ message: "Resume deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting resume:", error);
        return res.status(400).json({ message: error.message });
    }
}


//get user resume by id
//GET:/api/resumes/:id
export const getResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId; // Assuming userId is set in the request object by authentication middleware

        const resume = await Resume.findOne({ _id: resumeId, userId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        resume.__v = undefined; // Remove __v from the response
        resume.createdAt = undefined; // Remove createdAt from the response
        resume.updatedAt = undefined; // Remove updatedAt from the response
        return res.status(200).json({ resume });
    }
    catch (error) {
        console.error("Error fetching resume:", error);
        return res.status(400).json({ message: error.message });
    }
} 

//get resume by id public
//GET:/api/resumes/public/:id
export const getResumeByIdPublic = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({public:true, _id: resumeId});
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }   
        return res.status(200).json({ resume });
    }   catch (error) {
        console.error("Error fetching resume:", error);
        return res.status(400).json({ message: error.message });
    }   
}


//controller for updating a resume
//PUT:/api/resumes/:id
export const updateResume = async (req, res) => {
    try {
        const { resumeId,resumeData,removeBackground } = req.body;
        const userId = req.userId; // Assuming userId is set in the request object by authentication middleware
        const image=req.file;
        let resumeDataCopy=JSON.parse(JSON.stringify(resumeData));

        if(image){
            const imageBufferData=fs.createReadStream(image.path)
            const response=await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation:{
                    pre:'w-300,h-300,fo-face,z-0.75'+(removeBackground?'e-bgremove':'')

                }
            });

            resumeDataCopy.personalInfo.image=response.url;

        }
        const resume =await Resume.findOneAndUpdate({ _id: resumeId, userId },resumeDataCopy,{new:true});
        return res.status(200).json({ message: "Resume updated successfully", resume });
    }
    catch (error) {
        console.error("Error updating resume:", error);
        return res.status(400).json({ message: error.message });
    }
}
