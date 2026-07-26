import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import ResumeBuilder from "./Pages/ResumeBuilder";
import Login from "./Pages/Login";

import { login, setLoading } from "./app/features/authSlice";
import api from "./configs/api";


const App = () => {

  const dispatch = useDispatch();

  const getUserData = async () => {

    const token = localStorage.getItem("token");

    try {

      if (token) {

        const { data } = await api.get(
          "/api/users/data",
          {
            headers: {
              Authorization: token
            }
          }
        );

        if (data.user) {
          dispatch(
            login({
              token,
              user: data.user
            })
          );
        }

        dispatch(setLoading(false));

      } else {

        dispatch(setLoading(false));

      }

    } catch (error) {

      dispatch(setLoading(false));

      console.log(error.message);

    }
  };


  useEffect(() => {
    getUserData();
  }, []);


  return (
    <>
      <Toaster />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="builder/:resumeID"
            element={<ResumeBuilder />}
          />

        </Route>

      </Routes>

    </>
  );
};

export default App;