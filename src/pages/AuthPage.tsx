import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
// import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'; // If implemented

type AuthFormType = 'login' | 'register' | 'forgotPassword';

const AuthPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<AuthFormType>('login');

  const getTitleAndSubtitle = () => {
    switch (currentForm) {
      case 'login':
        return { title: 'Welcome Back!', subtitle: 'Login to continue your property journey.' };
      case 'register':
        return { title: 'Create Your Account', subtitle: 'Join PropertyHub to find or list properties.' };
      case 'forgotPassword':
        return { title: 'Reset Password', subtitle: 'Enter your email to receive a password reset link.' };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <div className="bg-gradient-to-br from-primary-light to-secondary-light min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
          <img src="/assets/images/logo.svg" alt="PropertyHub Logo" className="h-8 w-auto filter brightness-0 invert" />
          <span className="text-2xl font-bold">PropertyHub</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 id="auth-title" className="text-3xl font-bold text-primary">{title}</h2>
            <p id="auth-subtitle" className="text-gray-600 mt-2">{subtitle}</p>
          </div>

          {currentForm === 'login' && (
            <>
              <LoginForm onForgotPassword={() => setCurrentForm('forgotPassword')} />
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={() => setCurrentForm('register')} className="font-medium text-primary hover:underline">
                  Register here
                </button>
              </p>
            </>
          )}

          {currentForm === 'register' && (
            <>
              <RegisterForm onSwitchToLogin={() => setCurrentForm('login')} />
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setCurrentForm('login')} className="font-medium text-primary hover:underline">
                  Login here
                </button>
              </p>
            </>
          )}
          
          {currentForm === 'forgotPassword' && (
             <>
              {/* <ForgotPasswordForm onBackToLogin={() => setCurrentForm('login')} /> */}
              <p className="text-center text-red-500">Forgot Password form not implemented yet.</p>
              <p className="mt-6 text-center text-sm text-gray-600">
                Remembered your password?{' '}
                <button onClick={() => setCurrentForm('login')} className="font-medium text-primary hover:underline">
                  Back to Login
                </button>
              </p>
             </>
          )}


          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to PropertyHub's{' '}
              <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
