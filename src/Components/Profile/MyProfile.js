import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import "./MyProfile.css"; // Import des styles
import NavBar from "../navBar";

function MyProfile() {
  const [user, setUser] = useState(null); // Stocke les infos utilisateur
  const [editMode, setEditMode] = useState(false); // Mode édition
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    gender: "",
    birthdate: "",
    profileImage: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Récupération dynamique de l'ID utilisateur (exemple basé sur session)
  const userId = "6744eb612a4acde7c02f548e"//localStorage.getItem("userId"); // Assurez-vous de stocker l'ID utilisateur au moment de l'authentification

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirige si aucun utilisateur authentifié
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/getUser/${userId}`);
        if (response.data) {
          setUser(response.data);
          setFormData({
            name: response.data.name || "",
            lastname: response.data.lastname || "",
            email: response.data.email || "",
            gender: response.data.gender || "",
            birthdate: response.data.birthdate ? response.data.birthdate.split("T")[0] : "", // Format YYYY-MM-DD
            profileImage: response.data.profileImage || "",
            password: "",
          });
        } else {
          setError("No user data found.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/users/updateUserRole/${userId}`, formData);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Error updating profile.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/deleteUser/${userId}`);
      alert("Profile deleted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <div className="dashboard-container">
        <NavBar />
        <div className="profile-container">
          <h2 className="profile-title">🍕 Welcome, {user?.name || "Guest"}!</h2>
          {editMode ? (
            <div className="profile-edit">
              <label>
                First Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="profile-input"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Birthdate:
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                Profile Image URL:
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="profile-input"
                  placeholder="Enter new password"
                />
              </label>
              <div className="profile-buttons">
                <button onClick={handleUpdate} className="btn-update">
                  Save Changes
                </button>
                <button onClick={() => setEditMode(false)} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-view">
              <p><strong>First Name:</strong> {user.name}</p>
              <p><strong>Last Name:</strong> {user.lastname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Birthdate:</strong> {user.birthdate}</p>
              <p>
                <strong>Profile Image:</strong>
                <img src={user.profileImage} alt="Profile" className="profile-image" />
              </p>
              <p><strong>Role:</strong> {user.role}</p>
              <div className="profile-buttons">
                <button onClick={() => setEditMode(true)} className="btn-edit">
                  Edit Profile
                </button>
                <button onClick={handleDelete} className="btn-delete">
                  Delete Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
