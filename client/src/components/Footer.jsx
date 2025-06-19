import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <footer className="w-full bg-[#1e1e1e] text-white py-6">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} The Social Hub. All rights reserved.
          </p>
    </footer>
  );
};

export default Footer;
