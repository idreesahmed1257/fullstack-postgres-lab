import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 text-sm text-center bg-bg-paper text-primary">
      {/* Top navigation links */}
      <div className="flex gap-8 pt-4 mb-8 justify-evenly">
        <Link to="/about" className="text-lg transition-colors text-primary hover:text-secondary">
          About Us
        </Link>
        <Link to="/contact" className="text-lg transition-colors text-primary hover:text-secondary">
          Contact
        </Link>
        <Link to="/privacy" className="text-lg transition-colors text-primary hover:text-secondary">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-lg transition-colors text-primary hover:text-secondary">
          Terms of Service
        </Link>
      </div>

      {/* Social icons */}
      <div className="flex justify-center gap-6 mb-8">
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl transition-colors text-primary hover:text-secondary">
          <Twitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl transition-colors text-primary hover:text-secondary">
          <Instagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl transition-colors text-primary hover:text-secondary">
          <Facebook />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-xs text-text-dark">© 2024 Giftly. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
