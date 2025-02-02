// Copyright © 2025 Sustains AI, All Rights Reserved
import React from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import SignUp from "../auth/SignUp"
import SignIn from "../auth/SignIn"
import { NotFound } from "./NotFound/NotFound"
import { Dashboard } from "./Dashboard/Dashboard"
import Portfolio from "./Portfolio/Portfolio"

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to = "/signin" />;
};

const Home = () => {
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Navigate to = {isLoggedIn ? "/dashboard" : "/signin"} replace />} />
        <Route path = '/signup' element = {<SignUp />} />
        <Route path = '/signin' element = {<SignIn />} />
        <Route element = {<ProtectedRoutes />}>
          <Route path = "/dashboard" element = {isLoggedIn ? <Dashboard /> : <Navigate to = "/signin" replace />} />
          <Route path = '/portfolio/:id' element = {<Portfolio />} />
        </Route>
        <Route path = '*' element = {<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Home
