import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState(''); // For firstName, lastName if API supports
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    // Basic password strength (example)
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    try {
      // Assuming fullName is split into firstName and lastName if API needs them separately
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      await register({ username, email, password, firstName, lastName });
      setSuccess('Registration successful! Please login.');
      // Clear form or redirect
      setUsername('');
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onSwitchToLogin(); // Switch to login form after a short delay
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}
      {success && <div className="p-3 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-md text-sm">{success}</div>}
      <Input
        label="Username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirm_password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="secondary" className="w-full" isLoading={isLoading} size="lg">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
