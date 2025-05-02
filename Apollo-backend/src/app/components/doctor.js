"use client";
import { useRouter } from 'next/navigation'; 

import { useEffect, useState } from 'react';
import axios from 'axios';
import './Style.css';


export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    gender: '',
    specialty: '',
    experience: '',
    fee: '',
    modeofconsult: '',
    language: '',
    location: ''
  });
  const [page, setPage] = useState(1);
 


  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  const fetchDoctors = async () => {
    try {
      const query = new URLSearchParams({ page, ...filters }).toString();
      const res = await axios.get(`http://localhost:5000/list-doctor-with-filter?${query}`);
      setDoctors(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const router = useRouter();

  const goToAbout = () => {
    router.push('/Adding');
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
      <button className="gotoadd" onClick={goToAbout}>Admit Doctor</button>
      
      {/* Filters */}
     
      <div className="filters-container" style={{ padding: "20px" }}>
      
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          
          <div style={{ flex: 1, marginRight: "20px", height: "800px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h2>Filters</h2>
            <select name="gender" onChange={handleFilterChange} value={filters.gender}>
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select><br></br>
            <select name="specialty" onChange={handleFilterChange} value={filters.specialty}>
              <option value="">All Specialties</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="pediatrician">Pediatrician</option>
              <option value="Neurosurgeon">Neurosurgeon</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="general physician">General Physician</option>
            </select><br></br>
            <select name="experience" onChange={handleFilterChange} value={filters.experience}>
              <option value="">Select Experience</option>
              <option value="0-5">0-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-16">11-16 years</option>
            </select><br></br>
            <input type="number" name="fee" placeholder="Max Fee" value={filters.fee} onChange={handleFilterChange} />
            <select name="modeofconsult" onChange={handleFilterChange} value={filters.modeofconsult}>
              <option value="">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select><br></br>
            <select name="language" value={filters.language} onChange={handleFilterChange}>
  <option value="">Select Language</option>
  <option value="English">English</option>
  <option value="Hindi">Hindi</option>
  <option value="Telugu">Telugu</option>
  <option value="Tamil">Tamil</option>
  <option value="Kannada">Kannada</option>
  <option value="Malayalam">Malayalam</option>
 
</select>
            <select name="location" onChange={handleFilterChange} value={filters.location}>
              <option value="">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Banglore">Banglore</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
       
          {/* Doctor List */}
        
          <div style={{ flex: 2 }}>
            <p>Home|Doctors</p>
            <h2>Consult Doctors at Apollo Hospital</h2>
            <div>
  {doctors.length > 0 ? (
    doctors.map((doctor, index) => (
      <div className="doctor-card" key={index}>
        <div className="doctor-header">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-fee"><strong>₹{doctor.fee}</strong></p>
        </div>
        <div className="doctor-info">
          <p className="doctor-specialty">
            <strong>{doctor.specialty}</strong> | <strong> {doctor.experience} years</strong>
          </p>
          <p className="doctor-gender-consultation">
            <strong>{doctor.gender}</strong> | <strong>{Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages} </strong>
          </p>
          <p className="doctor-language">
             <strong>{doctor.location}</strong>
          </p>
          <button className='moc'><strong>consult  {doctor.modeofconsult}</strong></button>
        </div>
      </div>
     ))
              ) : (
                <p>No doctors found.</p>
              )}
            </div>

            <div className="pagination">
  <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="pagination-button">
    Previous
  </button>
  <span className="pagination-info">Page {page}</span>
  <button onClick={() => setPage(page + 1)} className="pagination-button">
    Next
  </button>
</div>

          </div>
        </div>
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
