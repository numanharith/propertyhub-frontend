import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/dashboard'); // Or previous location: location.state?.from?.pathname || '/dashboard'
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
      />
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
          <button 
            type="button" 
            onClick={onForgotPassword} 
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <Input
          type="password"
          name="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} size="lg">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
