import React, { useRef, useState } from "react";
import { Camera, LogOut } from "react-feather";
import InputControl from "../InputControl/InputControl";
import styles from "./Account.module.css";
import userImage from "../../assets/userimage.webp";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, uploadImage } from "../../firebase";

const Account = (props) => {
  const userDetails = props.userDetails;
  const isAuthenticated = props.auth;
  const imagePicker = useRef();
  const [progress, setProgress] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState(userImage);

  //   const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
  };
  const handleCameraClick = async () => {
    imagePicker.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    uploadImage(
      file,
      (progress) => {
        setProgress(progress);
        console.log("progress", progress);
      },
      (url) => {
        setProfileImageUrl(url);
        setProgress(0);

        console.log("url", url);
      },
      (err) => {
        console.log("Error", err);
      }
    );
    console.log(file);
  };
  return isAuthenticated ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span>{userDetails.name}</span>
        </p>
        <div className={styles.logout} onClick={handleLogout}>
          <LogOut /> Logout
        </div>
      </div>
      <input
        ref={imagePicker}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className={styles.section}>
        <div className={styles.title}>Your Profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={profileImageUrl} alt="Profile" />
              <div className={styles.camera} onClick={handleCameraClick}>
                <Camera />
              </div>
            </div>
            {progress ? (
              <p className={styles.progress}>
                {progress === 100
                  ? "Getting image url"
                  : `${progress.toFixed(2) + "% uploaded"}`}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <InputControl label="Name" />
              <InputControl
                label="Title"
                placeholder="eg. Full stack developer"
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Github"
                placeholder="Enter your Github link"
              />
              <InputControl
                label="LinkedIn"
                placeholder="Enter your LinkedIn link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Account;
