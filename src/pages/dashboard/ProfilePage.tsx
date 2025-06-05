import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import * as userService from '@/services/userService';
import { UserDetails } from '@/types/api';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Save } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, isLoading: authLoading, login } = useAuth(); // Assuming login can refresh user context
  const [formData, setFormData] = useState<Partial<UserDetails>>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    // Add other fields like phone, agency from mock if needed
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
      });
      // Mock avatar if not available
      setAvatarPreview(`https://i.pravatar.cc/150?u=${user.email}`);
      setPageLoading(false);
    } else if (!authLoading && !user) {
      // Should be handled by ProtectedRoute, but as a fallback:
      setError("User not authenticated.");
      setPageLoading(false);
    }
  }, [user, authLoading]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
      // In a real app, you'd upload this file and get a URL
      // For mock, we just update preview. Actual avatar update isn't in the API spec.
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      const updatedUser = await userService.updateMyDetails(formData);
      setSuccess('Profile updated successfully!');
      // Refresh auth context if needed, e.g. by calling login again with existing token or specific refresh user method
      // For mock, assume the updateMyDetails also updates local storage used by AuthContext
      if (user && user.email && user.password) { // This is a hack for mock
          await login({ email: user.email, password: user.password });
      }

    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (pageLoading) return <LoadingSpinner text="Loading profile..." />;
  if (!user && !authLoading) return <ErrorMessage message="Please login to view your profile." />;


  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Management</h2>
      {error && <ErrorMessage message={error} className="mb-4" />}
      {success && <div className="p-3 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-md text-sm mb-4">{success}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6 max-w-2xl">
        <div className="flex items-center space-x-4">
          <img src={avatarPreview || `https://i.pravatar.cc/150?u=${formData.email}`} alt="User Avatar" className="w-20 h-20 rounded-full object-cover" />
          <div>
            <label htmlFor="profile-avatar" className="cursor-pointer text-sm text-primary hover:underline">
              Change Photo
              <input type="file" id="profile-avatar" name="avatar" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
            <p className="text-xs text-gray-500">JPG, PNG, GIF. Max 2MB.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" name="firstName" value={formData.firstName || ''} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={formData.lastName || ''} onChange={handleChange} required />
        </div>

        <Input label="Username" name="username" value={formData.username || ''} onChange={handleChange} required />
        <Input label="Email Address" name="email" type="email" value={formData.email || ''} onChange={handleChange} required disabled className="bg-gray-100 cursor-not-allowed" />
        
        {/* Additional fields based on dashboard.html mock */}
        <Input label="Phone Number" name="phone" type="tel" value={(formData as any).phone || '+65 9123 4567'} onChange={handleChange} placeholder="+65 1234 5678" />
        <Input label="Agency Name (Optional)" name="agency" value={(formData as any).agency || 'Awesome Properties Pte Ltd'} onChange={handleChange} placeholder="Your Real Estate Agency" />

        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full md:w-auto" isLoading={isSubmitting}>
            <Save className="w-5 h-5 mr-2 inline-block" /> Update Profile
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
