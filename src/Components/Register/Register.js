import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Loader/Load.css'; // Assurez-vous d'importer le fichier CSS du loader

function Register() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(''); // New field
    const [birthdate, setBirthdate] = useState(''); // New field
    const [profileImage, setProfileImage] = useState(null); // File input should be null initially
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Role can be set dynamically (e.g., from props or state)
    const role = "user"; // Example role, replace with actual role logic

    const validate = () => {
        // Add your form validation logic here
        if (!name || !lastname || !email || !password || !gender || !birthdate) {
            setError('All fields are required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate);

        if (profileImage) formData.append('profileImage', profileImage);

        setLoading(true); // Show loader while submitting the form

        try {
            const result = await axios.post(`http://localhost:3001/auth/register/${role}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false); // Hide loader
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setLoading(false); // Hide loader
            if (err.response && err.response.status === 409) {
                setError('Email already exists');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="register" style={{ backgroundColor: '#ffe5b4', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
            <section className="register">
                <div className="container">
                    <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                        <div className="col-lg-6 text-center">
                            <h1 style={{ color: '#e63946', fontWeight: 'bold' }}>Pizza Hub</h1>
                            <p style={{ fontSize: '18px', color: '#555' }}>Join the family and start selling delicious pizzas!</p>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png" 
                                className="img-fluid" 
                                style={{ width: '300px', height: '300px', margin: '20px 0' }} 
                                alt="Pizza illustration" 
                            />
                        </div>
                        <div className="col-lg-6">
                            <div className="card" style={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '15px', padding: '20px' }}>
                                <h2 className="card-title mb-4 text-center" style={{ color: '#e63946' }}>Register</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            style={{ borderRadius: '10px' }}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            className="form-control"
                                            placeholder="Your Last Name"
                                            style={{ borderRadius: '10px' }}
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                            style={{ borderRadius: '10px' }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            name="gender"
                                            id="gender"
                                            className="form-control"
                                            style={{ borderRadius: '10px' }}
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="date"
                                            name="birthdate"
                                            id="birthdate"
                                            className="form-control"
                                            style={{ borderRadius: '10px' }}
                                            value={birthdate}
                                            onChange={(e) => setBirthdate(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            name="profileImage"
                                            id="profileImage"
                                            className="form-control"
                                            style={{ borderRadius: '10px' }}
                                            onChange={(e) => setProfileImage(e.target.files[0])} // Corrected for file input
                                        />
                                    </div>
                                    <div className="mb-3 position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Password"
                                            style={{ borderRadius: '10px' }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="eye-icon" onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                                            <i className={`bi bi-eye${showPassword ? "-slash" : ""}`} style={{ color: '#888' }}></i>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            type="submit"
                                            className="btn w-100"
                                            style={{ backgroundColor: '#e63946', color: 'white', fontWeight: 'bold', borderRadius: '10px' }}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <Link to="/login" className="mb-3 d-block text-center" style={{ color: '#e63946', fontWeight: 'bold' }}>
                                        Already have an account? Login
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {loading && (
                <div className="load" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
