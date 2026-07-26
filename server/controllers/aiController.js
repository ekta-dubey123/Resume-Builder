import Resume from "../models/resume.js";
import ai from "../configs/ai.js";


// controller for enhancing resume's professional summary using AI
// POST:/api/ai/enhance-pro-summary

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                message: "User content is required"
            });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are a professional resume writer. Enhance the user's professional summary to make it more compelling and impactful."
                },
                {
                    role: "user",
                    content: userContent
                }
            ],
        });

        const enhancedSummary = response.choices[0].message.content;

        return res.status(200).json({
            enhancedSummary
        });

    } catch (error) {
        console.error("Error enhancing professional summary:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};



// controller for enhancing resume's job description using AI
// POST:/api/ai/enhance-job-description

export const enhanceJobDescription = async (req, res) => {
    try {

        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({
                message: "User content is required"
            });
        }


        const response = await ai.chat.completions.create({

            model: process.env.OPENAI_MODEL,

            messages: [
                {
                    role: "system",
                    content: "You are a professional resume writer. Enhance the user's job description to make it more compelling and impactful."
                },
                {
                    role: "user",
                    content: userContent
                }
            ],
        });


        const enhancedDescription = response.choices[0].message.content;


        return res.status(200).json({
            enhancedDescription
        });


    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};




// controller for uploading a resume to database
// POST:/api/ai/upload-resume

export const uploadResume = async (req, res) => {

    try {

        const { resumeText, title } = req.body;

        const userId = req.userId;


        if (!resumeText) {
            return res.status(400).json({
                message: "User content is required"
            });
        }


        const systemPrompt = 
        "You are an expert AI Agent to extract data from resume.";



        const userPrompt = `
Extract data from this resume:

${resumeText}


Provide data in the following JSON format with no additional text before or after:


{
  "personal_info": {
        "image": "",
        "full_name": "",
        "profession": "",
        "email": "",
        "phone": "",
        "address": "",
        "website": "",
        "linkedin": ""
    },

    "experiences": [
        {
            "company": "",
            "position": "",
            "start_date": "",
            "end_date": "",
            "description": "",
            "is_current": false
        }
    ],

    "projects": [
        {
            "name": "",
            "type": "",
            "description": ""
        }
    ],

    "education": [
        {
            "institution": "",
            "degree": "",
            "field_of_study": "",
            "graduation_year": null,
            "gpa": null
        }
    ]
}

`;



        const response = await ai.chat.completions.create({

            model: process.env.OPENAI_MODEL,

            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],

            response_format: {
                type: "json_object"
            }

        });



        const extractedData = response.choices[0].message.content;


        const parsedData = JSON.parse(extractedData);



        const newResume = await Resume.create({

            userId,

            title,

            ...parsedData

        });



        return res.status(200).json({

            resumeId: newResume._id

        });



    } catch (error) {

        console.error(error);

        return res.status(400).json({

            message: error.message

        });

    }

};