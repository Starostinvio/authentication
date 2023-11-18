import { Form } from "./Form/Index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const Login = () => {
  const [invalidData, setInvalidData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    try {
      let response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setInvalidData(true);
        return;
      }
      dispatch(
        setUser({
          email: data.email,
          id: data.id,
          token: data.token,
        })
      );
      //или запись в localStorage?
      // localStorage.setItem("token", data.token);
      navigate("/", { replace: true });
    } catch {
      // setInvalidData(true);
    }

    // fetch("https://dummyjson.com/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: email,
    //     password: password,
    //   }),
    // })
    //   .then(
    //     (response) => response.json(),
    //     () => {
    //       alert("Invalid user");
    //       return;
    //     }
    //   )
    //   .then((data) => {
    //     dispatch(
    //       setUser({
    //         email: data.email,
    //         id: data.id,
    //         token: data.token,
    //       })
    //     );
    //     navigate("/", { replace: true });
    //   });
  }

  return (
    <>
      <Form
        title="Log In"
        handleClick={handleLogin}
        data={{ invalidData, setInvalidData }}
      />
    </>
  );
};

export { Login };
