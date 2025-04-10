import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Identity.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/Navbar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') setRememberme(checked);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleRegisterClick = () => navigate('/register');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = 'https://localhost:7023/api/Auth/login';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      // ✅ Only run this if response is OK
      const userRole = data.roles?.includes('Admin') ? 'Admin' : 'Customer';
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('username', data.username);

      window.alert('Successfully logged in!');
      navigate('/moviesPage');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card login-card">
          <h2 className="text-white text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label
                className="form-check-label text-white"
                htmlFor="rememberme"
              >
                Remember me
              </label>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-login">
                Sign In
              </button>
            </div>
            <div className="text-center mb-3">
              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
            </div>

            <hr className="border-secondary" />

            {error && <p className="error">{error}</p>}

            <div className="text-white text-center mb-3">
              New to CineNiche?{' '}
              <span className="signup-blue" onClick={handleRegisterClick}>
                Sign up now.
              </span>
            </div>

            <hr className="border-secondary" />

            <div className="d-grid mb-2">
              <button type="button" className="btn btn-google">
                <i className="fab fa-google me-2"></i> Sign in with Google
              </button>
            </div>

            <div className="d-grid">
              <button type="button" className="btn btn-facebook">
                <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
