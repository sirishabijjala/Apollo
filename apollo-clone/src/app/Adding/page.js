"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './Styleadd.css';

export default function AddDoctors() {
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    gender: '',
    specialty: '',
    experience: '',
    fee: '',
    modeofconsult: '',
    languages: '',
    location: ''
  });

  const router = useRouter();
  
  const handleInputChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, gender, specialty, experience, fee, modeofconsult, languages, location } = newDoctor;

    if (!name || !gender || !specialty || !experience || !fee || !modeofconsult || !languages || !location) {
      alert("All fields are required.");
      return false;
    }

    const experienceVal = parseInt(experience, 10);
    const feeVal = parseInt(fee, 10);

    if (isNaN(experienceVal) || experienceVal < 0) {
      alert("Experience must be a non-negative number.");
      return false;
    }

    if (isNaN(feeVal) || feeVal < 0) {
      alert("Fee must be a non-negative number.");
      return false;
    }

    return true;
  };

  const handleAddDoctor = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        ...newDoctor,
        experience: parseInt(newDoctor.experience, 10),
        fee: parseInt(newDoctor.fee, 10),
        languages: newDoctor.languages.split(',').map(lang => lang.trim())
      };

      await axios.post('http://localhost:5000/add-doctor', payload);
      alert("Doctor added successfully!");

      setNewDoctor({
        name: '',
        gender: '',
        specialty: '',
        experience: '',
        fee: '',
        modeofconsult: '',
        languages: '',
        location: ''
      });

      router.push('/');
    } catch (error) {
      console.error('Error adding doctor:', error.response?.data || error.message);
      alert('Failed to add doctor: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      {/* Header Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <span className="apollo">Apollo</span>
            <span className="twentyfour">24|7</span>
          </div>
          <div className="location">
            <img src="https://img.icons8.com/ios-filled/20/000000/marker.png" alt="location" />
            <span>Select Address</span>
            <span className="dropdown">&#9662;</span>
          </div>
        </div>
        <div className="search-box">
          <img src="https://img.icons8.com/ios-filled/20/000000/search--v1.png" alt="search" />
          <input type="text" placeholder="Search Doctors, Specialities, Conditions etc." />
        </div>
        <div className="login">
          <button>
            Login
            <img src="https://img.icons8.com/ios-glyphs/20/000000/user--v1.png" alt="user" />
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="menu-links">
        <a href="#">Buy Medicines</a>
        <a href="#">Find Doctors</a>
        <a href="#">Lab Tests</a>
        <a href="#">Circle Membership</a>
        <a href="#">Health Records</a>
        <a href="#">Diabetes Reversal</a>
        <a href="#" className="buy-insurance">
          Buy Insurance <span className="new-tag">New</span>
        </a>

      </div>

      {/* Form */}
      <div className="add-doctor-form" style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px" }}>
        <h3>Admission for Doctors</h3>
        <input type="text" name="name" placeholder="Name" value={newDoctor.name} onChange={handleInputChange} required /><br />
        <select name="specialty" value={newDoctor.specialty} onChange={handleInputChange} required>
  <option value="">Select Specialty</option>
  <option value="General Physician">General Physician</option>
  <option value="Cardiologist">Cardiologist</option>
  <option value="Dermatologist">Dermatologist</option>
  <option value="Pediatrician">Pediatrician</option>
  <option value="Gynecologist">Gynecologist</option>
  <option value="Neurosugeon">Neurosugeon</option>
</select>
        <input type="number" name="experience" placeholder="Experience (years)" value={newDoctor.experience} onChange={handleInputChange} required /><br />
        <input type="number" name="fee" placeholder="Fee (INR)" value={newDoctor.fee} onChange={handleInputChange} required /><br />
        <input type="text" name="modeofconsult" placeholder="Mode of Consultation" value={newDoctor.modeofconsult} onChange={handleInputChange} required /><br />
        <select name="languages" value={newDoctor.languages} onChange={handleInputChange} required>
        <option value="">Select language</option>

  <option value="English">English</option>
  <option value="Hindi">Hindi</option>
  <option value="Telugu">Telugu</option>
  <option value="Tamil">Tamil</option>
  <option value="Kannada">Kannada</option>
  <option value="Malayalam">Malayalam</option>
  {/* Add more languages as needed */}
</select>
        <select name="gender" value={newDoctor.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select><br />
        <select name="location" value={newDoctor.location} onChange={handleInputChange} required>
        <option value="">Select location</option>

  <option value="Hyderabad">Hyderabad</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Banglore">Banglore</option>
  <option value="Chennai">Chennai</option>
  <option value="Pune">Pune</option>
  <option value="Delhi">Delhi</option>
  {/* Add more languages as needed */}
</select>
        <button className="submit-button" onClick={handleAddDoctor}>Submit</button>
      </div>
     

      <div className="footer" style={{ backgroundColor: '#f8f9fa', padding: '30px 20px', marginTop: '40px', borderTop: '1px solid #ccc' }}>
  <div className="footer-columns" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    
    {/* Healthcare Articles */}
    <div className="footer-column" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Healthcare Articles</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#">COVID-19 Updates</a></li>
        <li><a href="#">Nutrition Tips</a></li>
        <li><a href="#">Mental Health</a></li>
        <li><a href="#">Fitness & Wellness</a></li>
      </ul>
    </div>

    {/* About Apollo 24/7 */}
    <div className="footer-column" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>About Apollo 24/7</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#">Company Info</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Press</a></li>
        <li><a href="#">Investor Relations</a></li>
      </ul>
    </div>

    {/* Services */}
    <div className="footer-column" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Services</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#">Online Consultation</a></li>
        <li><a href="#">Order Medicines</a></li>
        <li><a href="#">Lab Tests</a></li>
        <li><a href="#">Apollo Membership</a></li>
      </ul>
    </div>

    {/* Top Specialists */}
    <div className="footer-column" style={{ flex: '1 1 200px', marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Top Specialists</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#">Cardiologists</a></li>
        <li><a href="#">Dermatologists</a></li>
        <li><a href="#">Pediatricians</a></li>
        <li><a href="#">Orthopedics</a></li>
      </ul>
    </div>

  </div>

  <div style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
    © 2025 Apollo 24/7. All rights reserved.
  </div>
</div>

 


    </>
  );
}
