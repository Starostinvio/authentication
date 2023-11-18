import styles from "./AuthenticationPage.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useMatch,
  useOutlet,
} from "react-router-dom";
import { useEffect } from "react";
import Waves from "./img/Waves.jpg";

const AuthenticationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentOutlet = useOutlet();

  useEffect(() => {
    if ((location.pathname = "/authentication"))
      navigate("/authentication/sign-in");
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.ibj}>
        <img src={Waves} alt="waves" />
      </div>
      <div className={styles.container}>
        <div className={styles.authPlatform}>
          <div className={styles.links}>
            <NavLink
              className={styles.link}
              to="sign-in"
              style={({ isActive }) => ({
                opacity: isActive ? "1" : "0.2",
              })}
            >
              Log In
            </NavLink>
            <NavLink
              className={styles.link}
              to="sign-up"
              style={({ isActive }) => ({
                opacity: isActive ? "1" : "0.2",
              })}
            >
              Sign Up
            </NavLink>
          </div>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              timeout={136}
              classNames={{
                enter: styles.pageEnter,
                enterActive: styles.pageEnterActive,
                exit: styles.pageExit,
                exitActive: styles.pageExitActive,
              }}
              unmountOnExit
            >
              {currentOutlet}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
