import React from 'react'

const CallToAction = () => {
  return (
      <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="flex flex-col items-center justify-center text-center bg-black from-[#301469] to-black p-10 text-white">
                <p className="px-6 py-2 rounded-full text-sm border border-[#000000] bg-black from-[#3a1ba0] to-[#DFAB9B] bg-clip-text text-transparent">
                    Commnunity & Support
                </p>
                <h1 className="text-4xl md:text-5xl md:leading-15 font-medium max-w-2xl mt-5">
                    Join 10,000+ AI Infulencers
                    <span className="bg-white from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">in the AI Community</span>
                </h1>
                <p className="text-white text-sm mt-2">Unlock all our free resources instantly.</p>
                <button className="px-12 py-2.5 mt-6 rounded-full text-sm border border-[#54487B] active:scale-95 transition-all bg-white from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent">
                    Get Started
                </button>
            </div>
        </>
  )
}

export default CallToAction