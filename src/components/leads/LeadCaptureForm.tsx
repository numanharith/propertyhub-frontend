import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, User, Clock, CheckCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  propertyId?: string;
  propertyTitle: string;
  onSubmit: (leadData: LeadFormData) => Promise<void>;
  className?: string;
}

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  leadType: 'viewing' | 'inquiry' | 'callback';
  preferredContactTime?: string;
  urgency: 'low' | 'medium' | 'high';
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  propertyTitle,
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    leadType: 'inquiry',
    preferredContactTime: '',
    urgency: 'medium'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLeadTypeIcon = (type: string) => {
    switch (type) {
      case 'viewing': return <MessageSquare className="w-4 h-4" />;
      case 'callback': return <Phone className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Inquiry Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in <strong>{propertyTitle}</strong>. 
            An agent will contact you within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• A qualified agent will review your inquiry</li>
              <li>• You'll receive a call or email within 24 hours</li>
              <li>• Schedule a viewing at your convenience</li>
              <li>• Get expert guidance throughout the process</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Agent</h3>
        <p className="text-gray-600">Get more information about <strong>{propertyTitle}</strong></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lead Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I'm interested in:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'viewing', label: 'Schedule Viewing', icon: MessageSquare },
              { value: 'inquiry', label: 'Get Info', icon: Mail },
              { value: 'callback', label: 'Request Callback', icon: Phone }
            ].map(({ value, label, icon: Icon }) => (
              <label
                key={value}
                className={`relative flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.leadType === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="leadType"
                  value={value}
                  checked={formData.leadType === value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Icon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+65 9123 4567"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any specific questions or requirements..."
          />
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Contact Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                name="preferredContactTime"
                value={formData.preferredContactTime}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 9 PM)</option>
                <option value="weekend">Weekend only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Not urgent</option>
              <option value="medium">Moderately urgent</option>
              <option value="high">Very urgent</option>
            </select>
          </div>
        </div>

        {/* Urgency Indicator */}
        <div className={`p-3 rounded-lg ${getUrgencyColor(formData.urgency)}`}>
          <div className="flex items-center">
            <div className="flex items-center">
              {getLeadTypeIcon(formData.leadType)}
              <span className="ml-2 text-sm font-medium">
                {formData.leadType === 'viewing' && 'Viewing Request'}
                {formData.leadType === 'inquiry' && 'Information Request'}
                {formData.leadType === 'callback' && 'Callback Request'}
              </span>
            </div>
            <span className="ml-auto text-sm">
              {formData.urgency === 'high' && 'High Priority'}
              {formData.urgency === 'medium' && 'Normal Priority'}
              {formData.urgency === 'low' && 'Low Priority'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">
            By submitting this form, you agree to be contacted by PropertyHub and our partner agents. 
            Your information will be handled according to our privacy policy.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              {getLeadTypeIcon(formData.leadType)}
              <span className="ml-2">
                {formData.leadType === 'viewing' && 'Request Viewing'}
                {formData.leadType === 'inquiry' && 'Send Inquiry'}
                {formData.leadType === 'callback' && 'Request Callback'}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LeadCaptureForm;