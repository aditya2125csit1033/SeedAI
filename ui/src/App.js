import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Bg from './Bg.png';
import BgVideo2 from './Bg2.mp4';
import AnimatedTextBox from './AnimatedTextBox';
import Arrow from './Arrow.png';
import Upload from './Upload';
function App() {
  const navigate = useNavigate(); 
  const [SiUsername, setSiUsername] = useState("");
  const [SiEmail, setSiEmail] = useState("");
  const [SiPassword, setSiPassword] = useState("");
  const [LoEmail, setLoEmail] = useState("");
  const [LoPassword, setLoPassword] = useState("");
  const [DialogClose, setDialogClose] = useState(true);
  const [SignOpen, setSignOpen] = useState(false);

  const validatePassword = (password) => {
    const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(password);
    const hasNumeric = /\d/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasNumeric) return "Password must include numeric values";
    if (!hasSpecialChars) return "Password must contain at least one special character";
    if (!isValidLength) return "Password must be greater than 6 characters";
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    console.log(SiPassword);
    console.log(SiUsername);
    console.log(SiEmail);
    const passwordError = validatePassword(SiPassword);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    if (!validateEmail(SiEmail)) {
      alert("Please provide a valid email.");
      return;
    }

    let userData = {
      Username: SiUsername,
      Email: SiEmail,
      Password: SiPassword
    };

    try {
      let response = await fetch('http://localhost:5000/store-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering. Please try again.");
    }

    setSiUsername("");
    setSiEmail("");
    setSiPassword("");
  };

  const handleLogin = async () => {
    let userData = {
      Email: LoEmail,
      Password: LoPassword
    };

    try {
      let response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/upload');
        alert("Login successful!");
       
      } else {
        alert(data.message || "An error occurred during Login.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error Login. Please try again.");
    }

    setLoEmail("");
    setLoPassword("");
  };

  const handleDialog = () => {
    setDialogClose((prevState) => !prevState);
  };

  const signOn = () => {
    setSignOpen((prevState) => !prevState);
  };

  return (
    <div className="App">
       <Routes>
       <Route path="/" element={
      <div className="video-background" >
        {DialogClose &&
          <img src={Bg} alt="Smiley face" className="background-video" />
        }

        {!DialogClose &&
          <video autoPlay loop muted playsInline className="background-video1">
            <source src={BgVideo2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        }

        {DialogClose &&
          <div className="content">
            <AnimatedTextBox />
          </div>
        }

        {DialogClose &&
          <button className="buts" type="button" onClick={handleDialog}>Login / Signup</button>
        }

        {!DialogClose && !SignOpen && <div className="DialogBox">
          <img src={Arrow} alt="Smiley face" className="Arrowf" onClick={handleDialog} />
          <h1>Login</h1>
          <div className='Email'>
            <label htmlFor="email">Email:    </label>
            <input type="email" id="email" placeholder="Enter your email" value={LoEmail} onChange={(e) => setLoEmail(e.target.value)} />
          </div>
          <div className='Password'>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" value={LoPassword} onChange={(e) => setLoPassword(e.target.value)} />
          </div>
          <div className='Buttons'>
            <button className="Login" onClick={handleLogin}>Login</button>
            <button className="ForgotPass">Forgot Password?</button>
            <button className="Signup" onClick={signOn}>Signup</button>
          </div>
        </div>}

        {!DialogClose && SignOpen && <div className="DialogBox">
          <img src={Arrow} alt="Smiley face" className="Arrowf" onClick={handleDialog} />
          <h1>Signup</h1>
          <div className='Username'>
            <label htmlFor="username">Username:    </label>
            <input type="text" id="Username" placeholder="Enter your username" value={SiUsername} onChange={(e) => setSiUsername(e.target.value)} />
          </div>
          <div className='Email'>
            <label htmlFor="email">Email:    </label>
            <input type="email" id="email" placeholder="Enter your email" value={SiEmail} onChange={(e) => setSiEmail(e.target.value)} />
          </div>
          <div className='Password'>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" value={SiPassword} onChange={(e) => setSiPassword(e.target.value)} />
          </div>
          <div className='Buttons'>
            <button className="Register" onClick={handleRegister}>Register</button>
            <button className="Login" onClick={signOn}>Login</button>
          </div>
        </div>
        }

        </div>
       }
 />
 <Route path="/upload" element={<Upload />} />
</Routes>
    </div>
  );
}

export default App;