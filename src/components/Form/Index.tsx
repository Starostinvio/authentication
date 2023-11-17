import { useState, useEffect } from "react";
import styles from "./from.module.scss";
import { useForm, FieldError } from "react-hook-form";
import { IoEyeOffOutline } from "react-icons/io5";

const Form = ({
  title,
  handleClick,
  data,
}: {
  title: string;
  handleClick: Function;
  data: {
    invalidData: boolean;
    setInvalidData: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { invalidData, setInvalidData } = data;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    handleClick(email, pass);
  };

  const clickInput = () => {
    setInvalidData(false);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.middle_container}>
          <label htmlFor="email" className={styles.label}>
            <p>Email</p>
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            value={email}
            onFocus={() => clickInput()}
            placeholder="user@company.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/,
                message: "Please enter a valid email address",
              },

              onChange: (e) => setEmail(e.target.value),
            })}
          />

          <label htmlFor="password" className={styles.label}>
            <p>Password</p>
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            value={pass}
            onFocus={() => clickInput()}
            placeholder="Password"
            {...register("password", {
              required: true,
              onChange: (e) => setPass(e.target.value),
            })}
          />

          {title === "Sign In" ? (
            <div className={styles.text_wrapper}>
              <div className={styles.text}>{"Forgot You Password?"}</div>
            </div>
          ) : (
            <div className={styles.text_wrapper}></div>
          )}
          {errors?.email && (
            <div className={styles.errors}>
              <div>{(errors?.email as FieldError)?.message}</div>
            </div>
          )}
          {invalidData ? (
            <div className={styles.errors}>
              <div>
                {
                  "That email/username and password combination didn't work. Try again."
                }
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="bottom_container">
          <button type="submit" className={styles.submit} disabled={!isValid}>
            {title}
          </button>
        </div>
      </form>
    </>
  );
};

export { Form };
