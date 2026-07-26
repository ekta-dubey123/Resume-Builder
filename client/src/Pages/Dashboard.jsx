import React, { useEffect, useState } from 'react'
import {
  PlusIcon,
  UploadCloudIcon,
  XIcon,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon
} from "lucide-react";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { dummyResumeData } from '../assets/dummyResumeData.js';
import { useSelector } from 'react-redux';
import api from '../configs/api.js';
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = [
    '#9BFF4F',
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A8',
    '#33FFF5'
  ];

  const [allResumes, setAllResumes] = useState([]);

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);

  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);

const [editResumeId, setEditResumeId] = useState('');
const [isLoading,setIsLoading]=useState(false)

  const navigate = useNavigate();

  // Load Resumes
  const loadAllResumes = async () => {
    try {
        const { data } = await api.get('/api/users/resumes', {headers: { Authorization:
        token }})
        setAllResumes(data.resumes)
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    }
}

  const editTitle = async (event) => {
    try {
        event.preventDefault()
        const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId,
        resumeData: { title }}, {headers: { Authorization: token }})
        setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume,
        title } : resume))
        setTitle('')
        setEditResumeId('')
        toast.success(data.message)
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    }
}

  const deleteResume = async (resumeId) => {
    try {
        const Isconfirm = window.confirm('Are you sure you want to delete this resume?')
        if(Isconfirm){
            const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {
            Authorization: token }})
            setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
            toast.success(data.message)
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    }
}


  useEffect(() => {
    loadAllResumes();
  }, [token]);

  // Create Resume
  const createResume = async (event) => {
    

    try{
      event.preventDefault();
      const {data}=await api.post('/api/resumes/create',{title},{headers:{
        Authorization:token}})
        setAllResumes([...allResumes,data.resume])
        setTitle('')
        setShowCreateResume(false)
        navigate('/app/builder/${data.resume._id}')
        
      }
      catch(error){

        toast.error(error?.response?.data?.message||error.message)


      }
    }
  

  // Upload Resume
 const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
        const resumeText = await pdfToText(resume)
        const { data } = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers:
        { Authorization: token }})
        setTitle('')
        setResume(null)
        setShowUploadResume(false)
        navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
}


  return (
    <div className='bg-[#050816] min-h-screen text-white'>

      {/* Dashboard Header */}
      <div className='flex flex-col items-center justify-center pt-32'>

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-6">

          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className='flex items-center bg-[#9BFF4F] text-[#0b1020] font-bold py-4 px-8 rounded-2xl hover:scale-105 hover:bg-green-400 transition cursor-pointer'
          >
            <PlusIcon className="h-6 w-6 mr-2" />

            <span className="text-lg">
              Create Resume
            </span>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className='flex items-center bg-[#9BFF4F] text-[#0b1020] font-bold py-4 px-8 rounded-2xl hover:scale-105 hover:bg-green-400 transition cursor-pointer'
          >
            <UploadCloudIcon className="h-6 w-6 mr-2" />

            <span className="text-lg">
              Upload Existing
            </span>
          </button>

        </div>
      </div>

      {/* Green Line */}
      <hr className="border border-green-500 w-full mt-16" />

      {/* Resume Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">

        {allResumes.map((resume, index) => {

          const baseColor = colors[index % colors.length];

          return (

            <button
              key={index}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className='rounded-2xl p-6 text-left border hover:scale-105 transition'
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: baseColor + '40'
              }}
            >

              <FilePenLineIcon
                className="h-8 w-8 mb-4"
                style={{ color: baseColor }}
              />

              <p
                className="text-xl font-bold"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>

              <p
                className="text-sm mt-2"
                style={{ color: baseColor + '90' }}
              >
                Updated on{" "}
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Action Icons */}
              <div
              onClick={(e)=>e.stopPropagation()}
                className="mt-5 flex items-center gap-4"
                style={{ color: baseColor }}
              >
                <TrashIcon onClick={() => deleteResume(resume._id)} className="h-5 w-5 cursor-pointer hover:scale-110 transition" />

                <PencilIcon onClick={()=>{setEditResumeId(resume._id);setTitle(resume.title)}} className="h-5 w-5 cursor-pointer hover:scale-110 transition" />
              </div>

            </button>
          );
        })}

      </div>

      {/* CREATE RESUME MODAL */}
      {showCreateResume && (

        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0b1020] rounded-2xl p-8 relative w-100"
          >

            <h2 className="text-2xl font-bold mb-5">
              Create a Resume
            </h2>

            <input
              type="text"
              placeholder="Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-white/20 bg-white/10 text-white p-3 rounded-lg mb-5 w-full outline-none"
              required
            />

            <button className="bg-[#9BFF4F] text-[#0b1020] font-bold py-3 px-6 rounded-xl hover:bg-green-400 transition">
              Create Resume
            </button>

            <XIcon
              className="h-6 w-6 absolute top-5 right-5 cursor-pointer text-white/70 hover:text-white"
              onClick={() => {
                setShowCreateResume(false);
                setTitle('');
              }}
            />

          </div>
        </form>
      )}

      {/* UPLOAD RESUME MODAL */}
      {showUploadResume && (

        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0b1020] rounded-2xl p-8 relative w-100"
          >

            <h2 className="text-2xl font-bold mb-5">
              Upload Your Resume
            </h2>

            {/* Title */}
            <input
              type="text"
              placeholder="Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-white/20 bg-white/10 text-white p-3 rounded-lg mb-5 w-full outline-none"
              required
            />

            {/* Upload Box */}
            <label
              htmlFor='resume-input'
              className="flex flex-col items-center justify-center border-2 border-dashed border-white/40 rounded-xl p-6 cursor-pointer hover:border-white transition"
            >

              {resume ? (
                <p className="text-green-400 font-medium">
                  {resume.name}
                </p>
              ) : (
                <>
                  <UploadCloudIcon className="h-10 w-10 mb-3 text-white/70" />

                  <p className="text-white/70">
                    Click to Upload Resume
                  </p>
                </>
              )}

            </label>

            {/* Hidden File Input */}
            <input
              id='resume-input'
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />

            {/* Upload Button */}
            <button className="bg-[#9BFF4F] mt-5 text-[#0b1020] font-bold py-3 px-6 rounded-xl hover:bg-green-400 transition w-full">
              Upload Resume
            </button>

            {/* Close */}
            <XIcon
              className="h-6 w-6 absolute top-5 right-5 cursor-pointer text-white/70 hover:text-white"
              onClick={() => {
                setShowUploadResume(false);
                setResume(null);
                setTitle('');
              }}
            />

          </div>
        </form>
      )}

      {editResumeId && (

        <form
          onSubmit={editTitle}
          onClick={() => setEditResumeId('')}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0b1020] rounded-2xl p-8 relative w-100"
          >

            <h2 className="text-2xl font-bold mb-5">
             Edit Resume Title
            </h2>

            <input
              type="text"
              placeholder="Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-white/20 bg-white/10 text-white p-3 rounded-lg mb-5 w-full outline-none"
              required
            />

            <button className="bg-[#9BFF4F] text-[#0b1020] font-bold py-3 px-6 rounded-xl hover:bg-green-400 transition">
              Update
            </button>

            <XIcon
              className="h-6 w-6 absolute top-5 right-5 cursor-pointer text-white/70 hover:text-white"
              onClick={() => {
                setEditResumeId('');
                setTitle('');
              }}
            />

          </div>
        </form>
      )}

    </div>
  )
}

export default Dashboard