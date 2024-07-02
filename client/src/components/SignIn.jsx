import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { UserSignIn } from "../api";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        dispatch(loginSuccess(res.data));
        dispatch(
          openSnackbar({
            message: "Login Successful",
            severity: "success",
          })
        );
        setLoading(false);
        setButtonDisabled(false);
        setOpenAuth(false);
      } catch (err) {
        setLoading(false);
        setButtonDisabled(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      }
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Welcome to Food Fast👋</h1>
        <p className="text-base text-text_secondary">Please login with your details here</p>
      </div>
      <div className="space-y-6">
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right">
          <a href="#" className="text-primary text-sm font-medium transition duration-300 hover:text-primary-dark">
            Forgot Password?
          </a>
        </div>

        <Button
          text="Sign In"
          onClick={handleSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SignIn;
