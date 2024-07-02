import { Modal } from "@mui/material";
import React, { useState } from "react";
import LogoImage from "../utils/Images/log.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import { Close } from "@mui/icons-material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <div className="flex h-screen bg-white">
        {/* Left Side - Hidden on Small Screens */}
        <div className="hidden md:flex md:w-1/2 relative">
          <div className="absolute top-20 left-10 z-30">
            <img src={LogoImage} alt="Logo" className="h-40" />
          </div>
          <div className="relative h-full">
            <img src={AuthImage} alt="Authentication" className="h-full w-full object-cover z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-70 z-20"></div>
          </div>
        </div>

        {/* Right Side - Full Width on Small Screens */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 md:p-12 gap-4">
          <div className="absolute top-2 right-2">
            <div className="rounded-full p-2 border-2 border-primary hover:bg-primary-200 cursor-pointer" onClick={() => setOpenAuth(false)}>
              <Close />
            </div>
          </div>

          {/* Conditional Rendering based on login state */}
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <p className="text-sm text-text_secondary">
                Don't have an account?{" "}
                <span className="text-primary font-semibold cursor-pointer" onClick={() => setLogin(false)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <p className="text-sm text-text_secondary">
                Already have an account?{" "}
                <span className="text-primary font-semibold cursor-pointer" onClick={() => setLogin(true)}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Authentication;
