import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import axios from "axios";
import Input from "../common/Input";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/slices/authSlice";
import "../../css/auth/EditProfile.css";

const EditProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [previewImage, setPreviewImage] = useState(user?.avatar || "");
  const [base64Image, setBase64Image] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPreviewImage(user.avatar || "");
    }
  }, [user]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewImage(reader.result); // ➤ preview
      setBase64Image(reader.result); // ➤ backend upload
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!name || !email) {
      dispatch(setError("Name and email are required"));
      return;
    }

    dispatch(setLoading(true));
    const storedToken = token || localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name,
          email,
          avatar: base64Image ? base64Image : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const data = response.data || {};
      dispatch(
        setUser({
          user: data.user,
          token: token || localStorage.getItem("token"),
        })
      );

      if (onClose) onClose();
      console.log("Profile updated!");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      dispatch(
        setError(serverMessage || "Profile update failed. Please try again")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="editprofile-wrapper">
      <h3 className="editprofile-title">Edit Profile</h3>
      <p>Update your account details</p>

      <form className="editprofile-form" onSubmit={handleSubmit}>
        <div className="profile-image-container">
          {previewImage ? (
            <img src={previewImage} alt="profile" className="profile-image" />
          ) : (
            <div className="profile-placeholder">
              <CiUser size={40} />
            </div>
          )}

          <label className="image-upload-icon">
            📸
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
        <Input
          label={"Name"}
          type={"text"}
          placeholder={"Enter your Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={"Email"}
          type={"email"}
          placeholder={"Enter your Email Id"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <div className="editprofile-error">{error}</div>}

        <div className="editprofile-actions">
          <button
            type="button"
            className="editprofile-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit">
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
