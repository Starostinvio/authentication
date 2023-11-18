import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "./Form/Index";
import { setUser } from "../store/slices/userSlice";
import { error } from "console";
import { apiService } from "../App";

const SignUp = () => {
  const [invalidData, setInvalidData] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleRegistr(email: string, password: string) {
    try {
      setIsLoader(true);
      const result = await apiService.mockRegistration({
        password,
        email,
      });

      return result;
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoader(false);
    }
  }

  return (
    <>
      <Form
        title="Sign Up"
        handleClick={handleRegistr}
        data={{ invalidData, setInvalidData }}
        loader={isLoader}
      />
    </>
  );
};

export { SignUp };
