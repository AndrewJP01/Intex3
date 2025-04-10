import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import './Identity.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email') || '';

  const [email, setEmail] = useState(emailFromQuery);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const [firstName, lastName] = fullName.trim().split(' ');

    const data = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber: phone,
    };

    try {
      const response = await fetch('https://localhost:7023/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('✅ Account created! Please log in.');
        navigate(`/loginPage?email=${encodeURIComponent(email)}`);
      } else {
        const err = await response.json();
        setError(err.message || 'Failed to register.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card login-card">
          <h2 className="text-white text-center mb-4">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name (e.g. Jane Doe)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-login">
                Sign Up
              </button>
            </div>
            <div className="text-white text-center mb-3">
              Already have an account?{' '}
              <span
                className="signup-blue"
                onClick={() => navigate('/loginPage')}
              >
                Sign in here.
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
