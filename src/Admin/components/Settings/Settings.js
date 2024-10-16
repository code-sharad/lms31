//For managing profile of user;

import React from "react";
import "./Settings.css"; // Import the CSS file for styling

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>
        <i className="fas fa-user-cog"></i> Manage Profile
      </h2>
      <form className="profile-form">
        <section className="basic-information">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="facebook-link">Facebook Link</label>
            <input
              type="text"
              id="facebook-link"
              name="facebook-link"
              placeholder="Facebook Link"
            />
          </div>
          <div className="form-group">
            <label htmlFor="twitter-link">Twitter Link</label>
            <input
              type="text"
              id="twitter-link"
              name="twitter-link"
              placeholder="Twitter Link"
            />
          </div>
        </section>
        <section className="password-update">
          <h3>Update Password</h3>
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              placeholder="Current Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="New Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
            />
          </div>
        </section>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
