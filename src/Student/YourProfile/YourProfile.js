import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./YourProfile.css";

import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { message } from 'react-message-popup'

const YourProfile = () => {
  const loginUser = "student";

  const [profile, setProfile] = useState({
    studentFullName: "",
    studentEmail: "",
    studentPhoneNumber: "",
    studentGender: "",
    studentAge: "",
    studentAddress: "",
    studentAvatar: "",
    studentUserName: "",
  });

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("studentFullName", profile.studentFullName);
    formData.append("studentEmail", profile.studentEmail);
    formData.append("studentPhoneNumber", profile.studentPhoneNumber);
    formData.append("studentGender", profile.studentGender);
    formData.append("studentAge", profile.studentAge);
    formData.append("studentAddress", profile.studentAddress);
    formData.append("studentAvatar", profile.studentAvatar);
    formData.append("studentUserName", profile.studentUserName);

    console.log("formData =>", formData);

    const config = {
      headers: {
        content: "multipart/form-data",
      },

      withCredentials: true, /// this is for reading the cookie from the server side
    };

    const response = await axios.put(`/api/student/update`, formData, config);

    console.log("response =>", response);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/student/getProfile`);
      console.log("get all courses response=>", response);
      console.log("response.data =>", response.data);
      console.log("response.data.data =>", response.data.data);

      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
    }
  };


  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        studentAvatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("studentAvatar", file);

    const config = {
      headers: {
        content: "multipart/form-data",
      },
      withCredentials: true, /// this is for reading the cookie from the server side
    };

    try {
      const response = await axios.put(`/api/student/update`, formData, config);
      console.log("response =>", response);
      message.success("Profile picture updated successfully");

      fetchProfile();
    }
    catch (error) {
    
      console.log(error);
      message.error(error.message);
    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="maincontainer">
      <Navbar />
      <div className="profile-page">
        <main className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-container">
                <Avatar
                  src={
                    profile?.studentAvatar?.public_url || profile?.studentAvatar?.url
                  }
                  alt="Profile"
                  className="avatar"
                  onClick={() => document.getElementById("avatarInput").click()}
                />

                <input
                  type="file"
                  id="avatarInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleAvatarChange}
                />

                {profile.studentAvatar ? <div> uploading... </div> : null}
              </div>
              <h2>My Profile</h2>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.studentFullName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        studentFullName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.studentEmail}
                    onChange={(e) =>
                      setProfile({ ...profile, studentEmail: e.target.value })
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mobile No *</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={profile.studentPhoneNumber}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        studentPhoneNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={profile.studentGender}
                    onChange={(e) =>
                      setProfile({ ...profile, studentGender: e.target.value })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.studentAge}
                    onChange={(e) =>
                      setProfile({ ...profile, studentAge: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.studentUserName}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.studentAddress}
                    onChange={(e) =>
                      setProfile({ ...profile, studentAddress: e.target.value })
                    }
                  />
                </div>
              </div>

              <button type="submit" className="save-changes">
                Save changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YourProfile;
