import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/use-auth";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";

const HomePage = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token");

  return isAuth ? (
    <div>
      <h1>Welcom</h1>
      <button onClick={() => dispatch(removeUser())}>
        Log out from {email}
      </button>
    </div>
  ) : (
    <div>
      <Navigate to="/authentication/sign-in" />
    </div>
  );
};

export default HomePage;
