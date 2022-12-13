import React from "react";
import { Link } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import styles from "./Auth.module.css";

const Auth = (props) => {
  const isSignUp = props.signup ? true : false;
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Link to="/">
          <p className={styles.smallLink}>{"< Back to Home"}</p>
        </Link>
        <p className={styles.heading}>{isSignUp ? "Signup" : "Login"}</p>
        {isSignUp && (
          <InputControl label={"Name"} placeholder="Enter your name" />
        )}
        <InputControl label={"Email"} placeholder="Enter your email" />
        <InputControl
          label={"Password"}
          isPassword={true}
          placeholder="Enter your password"
        />
        <p className={styles.error}>This is error</p>
        <button>{isSignUp ? "Signup" : "Login"}</button>
        <div className={styles.bottom}>
          {isSignUp ? (
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          ) : (
            <p>
              New here? <Link to="/signup">Create an account</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
