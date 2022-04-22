import React from "react";
import { Link } from "react-router-dom";

import "./footer.styles.scss";

const Footer = () => {
  return (
    <div className="wd-footer">
      <div className="wd-options">
        <Link className="wd-option" to="/privacy-policy">
          PRIVACY POLICY
        </Link>
        <a
          className="wd-option"
          href="mailto:cgutierrezm95@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          SUPPORT
        </a>
      </div>
    </div>
  );
};

export default Footer;
