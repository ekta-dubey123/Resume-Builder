import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import { toast } from "react-toastify";


const Login = () => {

  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);


  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Signup States
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  // LOGIN API FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }


    try {

      const { data } = await api.post(
        "/api/users/login",
        {
          email,
          password
        }
      );


      dispatch(login(data));


      localStorage.setItem(
        "token",
        data.token
      );


      toast.success(data.message);


      setShowLogin(false);


    } catch(error){

      toast(
        error?.response?.data?.message ||
        error.message
      );

    }

  };




  // SIGNUP API FUNCTION

  const handleSignup = async (e) => {

    e.preventDefault();


    if (
      !name ||
      !signupEmail ||
      !signupPassword ||
      !confirmPassword
    ) {

      toast.error("Please fill all fields");

      return;
    }


    if(signupPassword !== confirmPassword){

      toast.error("Passwords do not match");

      return;

    }



    try {


      const { data } = await api.post(
        "/api/users/register",
        {
          name,
          email: signupEmail,
          password: signupPassword
        }
      );


      toast.success(data.message);


      setIsSignup(false);


      setName("");
      setSignupEmail("");
      setSignupPassword("");
      setConfirmPassword("");



    } catch(error){


      toast.error(
        error?.response?.data?.message ||
        error.message
      );


    }


  };





  // GOOGLE LOGIN

  const handleGoogleLogin = () => {

    toast.info("Google Login Clicked");

  };




  return (

    <>

    {showLogin && (

      <div
        className="fixed inset-0 flex items-center justify-center bg-[#050816]"
        onClick={() => setShowLogin(false)}
      >


        <div
          className="w-150 rounded-3xl border border-white/10 bg-linear-to-b from-[#0d1730] to-[#09101f] p-8 shadow-2xl"
          onClick={(e)=>e.stopPropagation()}
        >



          <div className="mb-7 flex items-center justify-between">


            <h2 className="text-4xl font-bold text-white">

              {isSignup ? "Create Account" : "Welcome back"}

            </h2>


            <button
              onClick={()=>setShowLogin(false)}
              className="text-2xl text-white/50 hover:text-white"
            >
              ✕
            </button>


          </div>





          <button
            onClick={handleGoogleLogin}
            className="mb-7 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100"
          >

            Continue with Google

          </button>





          <div className="mb-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-white/10"></div>

            <span className="text-sm text-white/30">
              or
            </span>

            <div className="h-px flex-1 bg-white/10"></div>

          </div>






          {isSignup ? (

          <>


          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white"
          />



          <input
            type="email"
            placeholder="Email address"
            value={signupEmail}
            onChange={(e)=>setSignupEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white"
          />



          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e)=>setSignupPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white"
          />



          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="mb-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white"
          />



          <button

            onClick={handleSignup}

            className="w-full rounded-xl bg-[#9BFF4F] py-4 text-xl font-bold text-[#0b1020]"
          >

            Create Account

          </button>



          <p className="mt-6 text-center text-sm text-white/40">

            Already have an account?

            <span
              onClick={()=>setIsSignup(false)}
              className="cursor-pointer font-semibold text-[#9BFF4F]"
            >

              {" "}Login

            </span>

          </p>


          </>



          ) : (


          <>


          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white"
          />



          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="mb-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white"
          />



          <button

            onClick={handleLogin}

            className="w-full rounded-xl bg-[#9BFF4F] py-4 text-xl font-bold text-[#0b1020]"
          >

            Sign in

          </button>




          <p className="mt-6 text-center text-sm text-white/40">


            Don't have an account?


            <span

              onClick={()=>setIsSignup(true)}

              className="cursor-pointer font-semibold text-[#9BFF4F]"
            >

              {" "}Sign up free

            </span>


          </p>



          </>


          )}



        </div>


      </div>

    )}

    </>

  );

};


export default Login;