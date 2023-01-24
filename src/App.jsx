import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ToastContainer } from 'react-toastify';
import { themeSettings } from "./styles/theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import UserProfilePage from "pages/UserProfilePage";
import LoginPage from "pages/loginPage";
import HomePage from "pages/HomePage";
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";


function App() {
const [loading,setLoading]=useState(false);

useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  },6000)
  
},[])


  // this "mode" data come from redux global state...
  const mode = useSelector(state => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.auth.token));


  return (
   
    <div className="app">


      {
        loading?

        <HashLoader style={{display:'flex',justifycontent:'center',alignitem:'center',width:'100%',height:'100%'}}
        color={'#A020F0'}
        loading={loading}
        size={50}
      
      />
     

        :
     

       
      <BrowserRouter>

        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>

            <Route path="/" element={<LoginPage />} />

            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />

            <Route
              path="/profile/:userId"
              element={isAuth ? <UserProfilePage /> : <Navigate to="/" />}
            />

          </Routes>
        </ThemeProvider>

        <ToastContainer theme="dark" style={{ fontSize: "18px" }} />
      </BrowserRouter>
}
    </div>
    
      
  );
}

export default App;