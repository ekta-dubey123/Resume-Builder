import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,ref: 'User'
    },
    title: {
        type: String,
        default: "Untitled Resume"
    },
    public: {
        type: Boolean,
        default: false},
    template: {
        type: String,
        default: "classic"},
    accent_color: {
        type: String,
        default: "#3B82f6"},
    skills:[{type: String}],
    personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        website: { type: String, default: "" },
        linkedin: { type: String, default: "" },
    },
    experiences: [{
        company: { type: String, default: "" },
        position: { type: String, default: "" },  
        start_date: { type: Date, default: null },
        end_date: { type: Date, default: null },
        description: { type: String, default: "" },
        is_current: { type: Boolean, default: false },
    }],
    project:[
        {
            name: { type: String, default: "" },
            type: { type: String, default: "" },
            description: { type: String, default: "" },
        }
    ] ,
    education:[
        {
            institution: { type: String, default: "" },
            degree: { type: String, default: "" },
            field_of_study: { type: String, default: "" },
            graduation_year: { type: Number, default: null },
            gpa: { type: Number, default: null },
        }
    ],
},{timestamps: true,minimize: false}); 
const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;