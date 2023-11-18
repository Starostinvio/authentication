import { Form } from "./Form/Index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { apiService } from "../App";
import { isConstructorDeclaration } from "typescript";

function extractUsername(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    throw new Error("Invalid email format");
  }
  return email.substring(0, atIndex);
}

const Login = () => {
  const [invalidData, setInvalidData] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    try {
      setIsLoader(true);
      const result = await apiService.login(extractUsername(email), password);

      if (result.token) {
        dispatch(
          setUser({
            email: result.email,
            id: result.id,
            token: result.token,
          })
        );
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
      setInvalidData(true);
    } finally {
      setIsLoader(false);
    }
  }

  return (
    <>
      <Form
        title="Log In"
        handleClick={handleLogin}
        data={{ invalidData, setInvalidData }}
        loader={isLoader}
      />
    </>
  );
};

export { Login };
