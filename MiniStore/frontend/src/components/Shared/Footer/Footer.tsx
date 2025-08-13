import React from "react";
import styles from "./footer.module.scss";
import { Twitter, Instagram, Facebook } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top navigation links */}
      <div className={styles.links}>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </div>

      {/* Social icons */}
      <div className={styles.social}>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <Twitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <Instagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <Facebook />
        </a>
      </div>

      {/* Copyright */}
      <div className={styles.copy}>© 2024 Giftly. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
