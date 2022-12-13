import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import InputControl from "../InputControl/InputControl";
import styles from "./Auth.module.css";

const Auth = (props) => {
  const isSignUp = props.signup ? true : false;
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState();
  const handleLogIn = () => {
    if (!values.email || !values.password) {
      setErrorMsg("All fields required!");
      return;
    }
  };
  const handleSignUp = () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("All fields required!");
      return;
    }
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        setSubmitButtonDisabled(false);
        setErrorMsg("");
        const userId = response.user.uid;
        console.log("response", response);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogIn();
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmission}>
        <Link to="/">
          <p className={styles.smallLink}>{"< Back to Home"}</p>
        </Link>
        <p className={styles.heading}>{isSignUp ? "Signup" : "Login"}</p>
        {isSignUp && (
          <InputControl
            label={"Name"}
            placeholder="Enter your name"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        )}
        <InputControl
          label={"Email"}
          placeholder="Enter your email"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <InputControl
          label={"Password"}
          isPassword={true}
          placeholder="Enter your password"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <p className={styles.error}>{errorMsg}</p>
        <button disabled={submitButtonDisabled} type="submit">
          {isSignUp ? "Signup" : "Login"}
        </button>
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
