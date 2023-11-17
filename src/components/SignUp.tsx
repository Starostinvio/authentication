import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "./Form/Index";
import { setUser } from "../store/slices/userSlice";
import { error } from "console";

const SignUp = () => {
  const [invalidData, setInvalidData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleRegistr(email: string, password: string) {
    try {
      const response = await fetch("", {
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
      dispatch(
        setUser({
          email: data.email,
          id: data.id,
          token: data.token,
        })
      );
      navigate("/", { replace: true });
    } catch {}
  }
  //   const auth = getAuth();

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(({ user }: { user: any }) => {
  //       console.log(user.accessToken, "user");
  //       dispatch(
  //         setUser({
  //           email: user.email,
  //           id: user.uid,
  //           token: user.accessToken,
  //         })
  //       );
  //       navigate("/", { replace: true });
  //     })
  //     .catch((e) => console.error("error", e));
  // };

  return (
    <>
      <Form
        title="Sign Up"
        handleClick={handleRegistr}
        data={{ invalidData, setInvalidData }}
      />
    </>
  );
};

export { SignUp };
