import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";

const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignUp({ name, email, password });
        dispatch(loginSuccess(res.data));
        dispatch(
          openSnackbar({
            message: "Sign Up Successful",
            severity: "success",
          })
        );
        setLoading(false);
        setButtonDisabled(false);
        setOpenAuth(false);
      } catch (err) {
        setButtonDisabled(false);
        if (err.response) {
          setLoading(false);
          alert(err.response.data.message);
          dispatch(
            openSnackbar({
              message: err.response.data.message,
              severity: "error",
            })
          );
        } else {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        }
      }
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Create New Account 👋</h1>
        <p className="text-base text-text_secondary">Please enter details to create a new account</p>
      </div>
      <div className="space-y-6">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
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
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SignUp;
