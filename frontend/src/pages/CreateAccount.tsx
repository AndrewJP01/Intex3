import '@fontsource/inter/index.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleBack = () => navigate('/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [firstName, lastName] = fullName.trim().split(' ');

    const data = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber: phone
    };

    try {
      const response = await fetch('https://localhost:7023/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('✅ Account created successfully!');
        navigate('/'); // or wherever you want to send them
      } else {
        const error = await response.json();
        alert('❌ Failed to register: ' + JSON.stringify(error));
      }
    } catch (error) {
      alert('❌ Network error: ' + error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black text-white px-4 font-sans"
    >
      <header className="w-full py-6 flex justify-start items-center fixed top-0 left-0 px-8">
        <div className="text-3xl font-extrabold text-blue-700">CINENICHE</div>
      </header>
      <div className="w-full max-w-md space-y-6">
        {step === 1 ? (
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center mb-6 space-y-4">
              <svg xmlns="httpss://www.w3.org/2000/svg" className="h-28 w-28 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.966 8.966 0 0112 15c2.144 0 4.1.755 5.879 2.004M15 10a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold uppercase text-center mb-6">Finish setting up your account</h1>
            <p className="text-lg">You started signing up with <span className="font-semibold">{email}</span></p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-8 text-xl rounded-md"
              >
                Back to homepage
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-4 px-8 text-xl rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center">Create your account</h1>
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="w-full p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white">
                  {email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-md text-lg">
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;