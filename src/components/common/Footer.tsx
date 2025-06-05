import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">PropertyHub</h3>
            <p className="text-sm">Your trusted partner in finding the perfect property. Explore thousands of listings with ease.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search_results?status=buy" className="hover:text-primary transition-colors">Buy Property</Link></li>
              <li><Link to="/search_results?status=rent" className="hover:text-primary transition-colors">Rent Property</Link></li>
              <li><Link to="/new-projects" className="hover:text-primary transition-colors">New Launches</Link></li>
              <li><Link to="/agents" className="hover:text-primary transition-colors">Find Agents</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} PropertyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
