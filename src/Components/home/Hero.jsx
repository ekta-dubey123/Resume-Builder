import React from 'react'

const Hero = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
     <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                    @keyframes rotate {
                        100% {
                            transform: rotate(1turn);
                        }
                    }
            
                    .rainbow::before {
                        content: '';
                        position: absolute;
                        z-index: -2;
                        left: -50%;
                        top: -50%;
                        width: 200%;
                        height: 200%;
                        background-position: 100% 50%;
                        background-repeat: no-repeat;
                        background-size: 50% 30%;
                        filter: blur(6px);
                        background-image: linear-gradient(#FFF);
                        animation: rotate 4s linear infinite;
                    }
                `}
            </style>

            <header className='bg-black text-white flex flex-col items-center bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png")] bg-cover bg-center bg-no-repeat pb-10'>
                <nav className="flex flex-col items-center w-full" >
                    <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
                        <a href="https://prebuiltui.com">
                           <img src="Screenshot 2026-05-24 222700.png" alt="Logo" className="w-12 h-10 mr-5" />
                        </a>
                        <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}>
                            <a href="#" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white/80">Home</a>
                            <a href="#" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white/80">Projects</a>
                            <a href="#" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white/80">Testimonials</a>
                            <a href="#" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white/80 mr-6">Contact</a>

                            <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>
                            <div className='p-[0.5px] rounded-full bg-linear-to-r from-white to-[#999999]/0'>
                                <button className="hidden md:flex items-center gap-2 bg-[#A6FF5D] text-gray-800 font-medium px-4 py-2.5 rounded-full text-sm transition cursor-pointer group">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.795.605v2.593m1.245-1.296h-2.488M1.845 13.565c.687 0 1.244-.58 1.244-1.296s-.557-1.296-1.244-1.296-1.244.58-1.244 1.296.557 1.296 1.244 1.296M6.209 1.13a.65.65 0 0 1 .214-.379.61.61 0 0 1 .795 0 .66.66 0 0 1 .214.38l.653 3.601c.047.256.166.492.343.676s.403.309.649.357l3.456.681a.62.62 0 0 1 .364.223.665.665 0 0 1 0 .828.62.62 0 0 1-.364.223l-3.456.681a1.23 1.23 0 0 0-.65.358c-.176.184-.295.42-.342.675l-.653 3.602a.65.65 0 0 1-.214.38.61.61 0 0 1-.795 0 .65.65 0 0 1-.214-.38l-.654-3.602a1.3 1.3 0 0 0-.342-.675 1.23 1.23 0 0 0-.649-.358l-3.456-.68a.62.62 0 0 1-.365-.224.665.665 0 0 1 0-.828.62.62 0 0 1 .365-.223l3.456-.68c.246-.05.472-.174.649-.358s.296-.42.342-.676z" stroke="#1e2939" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                                     <div className="relative overflow-hidden">
                                        <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                            Get Started
                                        </span>
                                        <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                                            Get Started
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button id="open-menu" onClick={() => setMobileOpen(true)}
                            className="md:hidden bg-gray-900 hover:bg-gray-800 text-gray-50 p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full transition duration-300 active:scale-100 mt-28 md:mt-32">
                    <button className="flex items-center justify-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                        <div className="relative flex size-3.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75 animate-ping duration-300"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-[#A6FF5D]"></span>
                        </div>
                        <span className='text-xs'>Designed for Modern Resumes</span>
                    </button>
                </div>

                <h1 className="text-4xl md:text-[64px]/[82px] text-center max-w-4xl mt-5 bg-clip-text leading-tight px-4">
                    Build stunning Resumes with AI in minutes
                </h1>
                <p className="text-sm md:text-base text-gray-300 bg-clip-text text-center max-w-lg mt-4.5 px-4">
                    Create a professional resume with our AI-powered builder. Get personalized suggestions and design options to make your resume stand out.</p>

                <div className='flex gap-3 mt-8'>
                    <button className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-800 px-6 py-2.5 rounded-full text-sm transition cursor-pointer group">
                         <div className="relative overflow-hidden">
                            <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                Get Started
                            </span>
                           
                        </div>

                       
                    </button>
                    <button className="bg-[#e2e7de] hover:bg-[#A6FF5D]/90 text-black px-6 py-2.5 rounded-full text-sm transition cursor-pointer group">
                    <div className="relative overflow-hidden">
                            <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                Login
                            </span>
                           
                        </div></button>
                   
                </div>

                <div className="flex flex-row items-center justify-center gap-10 md:gap-20 mx-auto mt-17 px-4 flex-wrap">
                    <svg width="100" height="33" viewBox="0 0 100 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h21.597v10.903H10.8zm0 10.903h10.799l10.798 10.902H0zm0 10.902h10.799v10.903zM33.783 8.601h8.73v2.801h-5.426v3.892h5.426v2.74h-5.426v4.983h-3.304zm10.525 4.49h3.12v2.08q.246-1.072 1-1.648a2.74 2.74 0 0 1 1.714-.597q.49 0 .816.082v2.925a9 9 0 0 0-.939-.062q-1.284-.001-1.937.844-.653.824-.653 2.472v3.83h-3.12v-9.926zm11.576 10.194q-1.427 0-2.488-.68a4.4 4.4 0 0 1-1.591-1.854q-.551-1.194-.552-2.697.001-1.484.572-2.677a4.46 4.46 0 0 1 1.632-1.874q1.08-.68 2.468-.68 1.04 0 1.856.453.816.454 1.224 1.236V13.09h3.1v9.926h-3.1v-1.4q-.408.74-1.265 1.215a3.8 3.8 0 0 1-1.856.453m.898-2.616q1.121 0 1.734-.741.612-.742.612-1.874 0-1.112-.612-1.854-.613-.741-1.734-.741-1.061 0-1.713.72-.633.722-.633 1.875t.633 1.894q.653.721 1.713.721m7.506-7.578h3.121v1.441q.327-.763 1.06-1.235.756-.473 1.755-.474 2.325 0 3.08 1.833a3.1 3.1 0 0 1 1.244-1.318 3.54 3.54 0 0 1 1.897-.515q3.488 0 3.488 4.036v6.158h-3.141v-5.581q0-1.008-.367-1.483-.367-.473-1.102-.473-.795 0-1.224.556-.428.534-.428 1.874v5.107h-3.142v-5.602q.001-1.009-.367-1.462-.345-.473-1.08-.473-.816 0-1.245.556-.428.534-.428 1.874v5.107h-3.12zm27.369 4.448q0 .637-.083 1.38h-7.26q.04.967.652 1.483.613.514 1.653.515 1.449 0 1.835-.886h3.06q-.225 1.462-1.591 2.368-1.347.885-3.305.886-2.528 0-3.977-1.38-1.428-1.38-1.428-3.851 0-1.607.653-2.78a4.33 4.33 0 0 1 1.856-1.813q1.204-.638 2.796-.638 1.508 0 2.67.597 1.185.599 1.816 1.668.653 1.072.653 2.451m-3.082-.577q-.02-.988-.55-1.503t-1.53-.515-1.59.556q-.571.536-.593 1.462zm4.458-3.871h3.12v2.08q.246-1.072 1-1.648a2.74 2.74 0 0 1 1.714-.597q.49 0 .815.082v2.925a9 9 0 0 0-.938-.062q-1.285-.001-1.938.844-.652.824-.652 2.472v3.83h-3.121z" fill="#99a1af"/></svg>
                    <svg width="103" height="22" viewBox="0 0 103 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.427 4.361v13.083h-2.266V7.178h-.03l-4.05 10.266h-1.51L30.43 7.178h-.03v10.266h-2.086V4.361h3.264l3.747 9.691h.06l3.959-9.69zm1.874 1c0-.364.12-.667.393-.909a1.35 1.35 0 0 1 .936-.363c.393 0 .726.12.967.363.242.242.393.545.393.909 0 .363-.12.666-.393.908a1.37 1.37 0 0 1-.967.364c-.393 0-.695-.122-.936-.364-.242-.272-.393-.575-.393-.908m2.447 2.695v9.388h-2.206V8.056zm6.679 7.783c.332 0 .695-.06 1.088-.242a4.8 4.8 0 0 0 1.088-.606v2.06a3.9 3.9 0 0 1-1.21.454c-.453.09-.936.151-1.48.151-1.39 0-2.508-.424-3.354-1.302-.876-.878-1.3-1.999-1.3-3.331 0-1.514.454-2.756 1.33-3.725s2.115-1.454 3.747-1.454c.423 0 .846.06 1.24.151.422.091.755.243.996.364v2.12a4.4 4.4 0 0 0-1.027-.576c-.363-.12-.725-.212-1.088-.212-.876 0-1.571.273-2.115.848-.544.576-.786 1.333-.786 2.302 0 .939.272 1.696.786 2.21.513.516 1.209.788 2.085.788m8.43-7.935c.182 0 .333 0 .484.03q.227.046.363.092v2.24a1.4 1.4 0 0 0-.514-.242 3 3 0 0 0-.816-.12c-.544 0-.997.242-1.36.696-.362.454-.574 1.15-.574 2.12v4.724h-2.206V8.056h2.206V9.54h.03c.212-.515.514-.909.907-1.212a2.66 2.66 0 0 1 1.48-.423m.968 4.998c0-1.545.453-2.787 1.3-3.695q1.314-1.363 3.626-1.363c1.45 0 2.598.424 3.414 1.302s1.24 2.06 1.24 3.544c0 1.514-.454 2.725-1.3 3.634-.877.908-2.055 1.363-3.566 1.363q-2.175 0-3.445-1.272c-.846-.879-1.27-2.06-1.27-3.513m2.296-.091c0 .969.212 1.726.665 2.24.454.516 1.088.788 1.904.788.786 0 1.42-.242 1.843-.787.424-.515.635-1.272.635-2.302 0-1-.212-1.756-.635-2.302-.423-.514-1.057-.787-1.813-.787-.816 0-1.42.273-1.873.818-.514.575-.725 1.332-.725 2.332m10.577-2.272c0 .303.09.576.302.757s.635.394 1.33.667c.876.363 1.51.757 1.843 1.18.363.455.544.97.544 1.606 0 .878-.332 1.575-1.027 2.12-.665.545-1.602.787-2.75.787-.393 0-.816-.06-1.3-.151a5.2 5.2 0 0 1-1.208-.363V14.96c.392.273.846.515 1.3.666.452.152.875.243 1.268.243.484 0 .877-.061 1.088-.212.242-.152.363-.364.363-.697 0-.303-.121-.545-.363-.787-.242-.212-.725-.455-1.39-.727-.816-.333-1.39-.727-1.722-1.151s-.514-.97-.514-1.635q0-1.273.997-2.09c.665-.545 1.541-.818 2.599-.818.332 0 .695.03 1.088.121s.755.182 1.027.273v2.15a6.5 6.5 0 0 0-1.027-.515 3.2 3.2 0 0 0-1.148-.212c-.424 0-.756.091-.968.242-.211.213-.332.424-.332.727m4.956 2.363c0-1.545.453-2.787 1.3-3.695q1.314-1.363 3.626-1.363c1.45 0 2.598.424 3.414 1.302s1.24 2.06 1.24 3.544c0 1.514-.454 2.725-1.3 3.634-.876.908-2.055 1.363-3.566 1.363q-2.175 0-3.445-1.272c-.816-.879-1.27-2.06-1.27-3.513m2.297-.091c0 .969.211 1.726.664 2.24.454.516 1.088.788 1.904.788.786 0 1.42-.242 1.843-.787.424-.515.635-1.272.635-2.302 0-1-.211-1.756-.635-2.302-.422-.514-1.057-.787-1.813-.787-.816 0-1.42.273-1.873.818-.484.575-.725 1.332-.725 2.332m14.626-2.938h-3.294v7.571h-2.237v-7.57h-1.57V8.056h1.57V6.754c0-.97.333-1.787.967-2.423.635-.636 1.45-.939 2.448-.939.272 0 .514.03.725.03.212 0 .393.06.544.121v1.908c-.06-.03-.211-.09-.392-.151a2 2 0 0 0-.635-.09c-.453 0-.816.15-1.058.423s-.362.727-.362 1.272v1.12h3.293v-2.12l2.206-.666v2.787h2.237v1.817h-2.237v4.391c0 .576.121.97.303 1.212q.317.363.997.363.181 0 .453-.09c.181-.061.333-.122.453-.213v1.817c-.151.091-.362.152-.695.212s-.634.091-.967.091q-1.404 0-2.085-.727c-.453-.484-.695-1.241-.695-2.24zM10.335 0H0v10.358h10.335zm11.423 0H11.423v10.358h10.335zM10.335 11.448H0v10.357h10.335zm11.423 0H11.423v10.357h10.335z" fill="#99a1af"/></svg>
                    <svg width="101" height="25" viewBox="0 0 101 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M89.869 8.186c.57 0 1.038-.296 1.102-.679l.562-6.362C91.533.516 90.797 0 89.87 0c-.925 0-1.661.516-1.661 1.145l.562 6.362c.062.383.531.68 1.1.68zm-3.439 1.988c.286-.493.264-1.047-.037-1.293l-5.23-3.669c-.543-.315-1.358.064-1.82.867-.465.801-.383 1.696.16 2.011l5.79 2.696c.362.135.855-.124 1.139-.616zm6.88-.004c.285.493.776.75 1.139.617l5.79-2.696c.546-.315.623-1.21.163-2.012-.465-.801-1.281-1.181-1.823-.866l-5.23 3.668c-.3.246-.321.8-.037 1.293zm-3.442 5.964c.57 0 1.04.293 1.103.676l.562 6.362c0 .63-.736 1.145-1.663 1.145-.925 0-1.661-.515-1.661-1.145l.562-6.362c.062-.383.531-.676 1.1-.676zm3.442-1.988c.285-.494.776-.75 1.139-.614l5.79 2.694c.546.315.623 1.211.163 2.013-.465.8-1.281 1.18-1.823.866l-5.23-3.665c-.3-.248-.321-.803-.037-1.295h-.002m-6.88 0c.286.492.264 1.047-.037 1.295l-5.23 3.665c-.543.314-1.358-.067-1.82-.866-.465-.802-.383-1.698.16-2.013l5.79-2.694c.362-.136.855.12 1.139.614h-.002m-29.548 1.281c0 .195-.018.397-.071.574-.222.734-.982 1.355-1.934 1.355-.793 0-1.423-.45-1.423-1.402 0-1.457 1.603-1.86 3.428-1.849zm2.862-2.538c0-2.402-1.026-4.516-4.494-4.516-1.78 0-3.193.5-3.964.946l.565 1.93c.705-.444 1.828-.812 2.89-.812 1.76-.005 2.048.996 2.048 1.636v.152c-3.834-.006-6.258 1.322-6.258 4.027 0 1.652 1.234 3.2 3.38 3.2 1.319 0 2.423-.526 3.084-1.37h.066s.437 1.832 2.851 1.131c-.126-.762-.167-1.575-.167-2.553zM0 5.102s2.506 10.267 2.906 11.934c.467 1.945 1.308 2.66 3.732 2.177l1.564-6.365c.397-1.582.663-2.71.918-4.317h.045c.18 1.624.434 2.74.76 4.322 0 0 .637 2.89.963 4.407.327 1.517 1.237 2.474 3.612 1.953l3.728-14.111H15.22l-1.273 6.101c-.343 1.775-.653 3.164-.893 4.788h-.042c-.218-1.61-.495-2.942-.842-4.672l-1.325-6.217H7.708l-1.418 6.06c-.4 1.843-.777 3.33-1.015 4.9H5.23c-.245-1.479-.57-3.348-.923-5.13 0 0-.842-4.336-1.138-5.83zm23.92 10.325c0 .195-.017.397-.072.574-.22.734-.982 1.355-1.933 1.355-.794 0-1.423-.45-1.423-1.402 0-1.457 1.603-1.86 3.428-1.849zm2.862-2.538c0-2.402-1.026-4.516-4.493-4.516-1.78 0-3.195.5-3.965.946l.564 1.93c.704-.444 1.828-.812 2.891-.812 1.76-.005 2.048.996 2.048 1.636v.152c-3.836-.006-6.258 1.322-6.258 4.027 0 1.652 1.233 3.2 3.378 3.2 1.32 0 2.424-.526 3.086-1.37h.064s.439 1.832 2.853 1.131c-.126-.762-.168-1.575-.168-2.553zm4.778 3.329V5.102h-2.866v14.112h2.866zM69.053 5.102v10.41c0 1.436.271 2.44.848 3.056.506.537 1.337.885 2.334.885.847 0 1.68-.161 2.074-.307l-.037-2.24a4.4 4.4 0 0 1-1.089.13c-.976 0-1.303-.626-1.303-1.914v-3.983h2.496v-2.7H71.88V5.102zm-7.397 3.51v10.602h2.956v-5.428c0-.294.018-.55.064-.783.219-1.138 1.088-1.864 2.337-1.864.343 0 .588.037.853.075V8.439a3 3 0 0 0-.65-.066c-1.104 0-2.36.712-2.886 2.24h-.08v-2zm-28.09 0v10.602h2.881v-6.217c0-.292.034-.6.135-.867.239-.626.822-1.36 1.751-1.36 1.163 0 1.706.983 1.706 2.401v6.042h2.878V12.92c0-.279.038-.614.12-.86.237-.712.864-1.291 1.729-1.291 1.178 0 1.744.965 1.744 2.634v5.808h2.88v-6.244c0-3.292-1.672-4.596-3.56-4.596-.835 0-1.495.21-2.092.575-.501.31-.95.747-1.343 1.322h-.042c-.455-1.143-1.526-1.896-2.922-1.896-1.793 0-2.599.909-3.087 1.68H36.3v-1.44z" fill="#99a1af"/></svg>
                </div>

                <div className='scroll-down flex flex-col items-center gap-4 mt-20 animate-bounce cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9A7 7 0 1 0 5 9v6a7 7 0 1 0 14 0zm-7-3v4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <p className='text-sm text-white/50'>Scroll Up Please</p>
                </div>
            </header>
        </>
  )
}

export default Hero