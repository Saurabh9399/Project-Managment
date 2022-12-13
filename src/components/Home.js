import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import styleIcon from "../assets/projectremovedbg.png";
import { ArrowRight } from "react-feather";

const Home = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = props.auth ? true : false;
  const handleNextButtonClick = () => {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p className={styles.heading}>Projects Flair</p>
          <p className={styles.subHeading}>
            One stop destination for all the software development projects.
          </p>
          <button onClick={handleNextButtonClick}>
            {isAuthenticated ? "Manage your Projects" : "Get Started"}
            <ArrowRight />
          </button>
        </div>
        <div className={styles.right}>
          <img src={styleIcon} alt="projects" />
        </div>
      </div>
    </div>
  );
};

export default Home;
