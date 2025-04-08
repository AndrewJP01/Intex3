import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handleBack = () => navigate('/');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        {step === 1 ? (
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold mb-6">Finish setting up your account</h1>
            <p className="text-lg">You started signing up with <span className="font-semibold">{email}</span></p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Back to homepage
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Create your account</h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700">
                  {email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
                <input id="name" type="text" placeholder="Jane Doe" className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="••••••••" className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" placeholder="(555) 555-5555" className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700" />
              </div>
              <button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md">
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