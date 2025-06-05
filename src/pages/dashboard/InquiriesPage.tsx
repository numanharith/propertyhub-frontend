import React from 'react';
import { Link } from 'react-router-dom';

// Mock inquiry data
const mockInquiries = [
  {
    id: '1',
    propertyName: 'Sentosa Villa',
    fromName: 'Alice Wonderland',
    fromEmail: 'alice@example.com',
    messagePreview: "Hi John, I'm very interested in your Sentosa Villa listing. Could we schedule a viewing this weekend?",
    date: '2 hours ago',
    isNew: true,
  },
  {
    id: '2',
    propertyName: 'Orchard Condo',
    fromName: 'Bob The Builder',
    fromEmail: 'bob@example.com',
    messagePreview: "Is the price negotiable for the Orchard Condo? I'm a serious buyer.",
    date: '1 day ago',
    isNew: true, // From mock HTML, one inquiry was highlighted
  },
  {
    id: '3',
    propertyName: 'HDB at Clementi',
    fromName: 'Charlie Brown',
    fromEmail: 'charlie@example.com',
    messagePreview: "What are the nearby amenities for the HDB flat in Clementi? Thanks!",
    date: '3 days ago',
    isNew: false,
  },
];

const InquiriesPage: React.FC = () => {
  const newInquiriesCount = mockInquiries.filter(inq => inq.isNew).length;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Inquiries</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">
            You have {newInquiriesCount} new {newInquiriesCount === 1 ? 'inquiry' : 'inquiries'}
          </h3>
          <button className="text-sm text-primary hover:underline">Mark all as read</button>
        </div>
        {mockInquiries.length === 0 ? (
            <p className="text-center p-6 text-gray-500">No inquiries yet.</p>
        ) : (
        <ul className="divide-y divide-gray-200">
          {mockInquiries.map(inquiry => (
            <li key={inquiry.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${inquiry.isNew ? 'bg-primary-light/30' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">Inquiry for: <span className="text-primary">{inquiry.propertyName}</span></p>
                  <p className="text-sm text-gray-600">From: <span className="font-medium">{inquiry.fromName}</span> ({inquiry.fromEmail})</p>
                </div>
                <span className="text-xs text-gray-500">{inquiry.date}</span>
              </div>
              <p className="mt-2 text-sm text-gray-700 truncate">{inquiry.messagePreview}</p>
            </li>
          ))}
        </ul>
        )}
        {mockInquiries.length > 0 && (
            <div className="p-4 border-t text-center">
                <Link to="#" className="text-primary hover:underline text-sm font-medium">View All Inquiries</Link>
            </div>
        )}
      </div>
    </section>
  );
};

export default InquiriesPage;
