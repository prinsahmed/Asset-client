import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <div className="footer sm:footer-horizontal max-w-11/12 md:mx-auto text-base-content p-4 md:p-10  ">
        <aside>
          <img className="w-16" src={logo} alt="" />
          <p>
            AssetVerse Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
      <p className="text-center text-sm text-gray-500 py-4">
        © 2026 AssetVerse Ltd. | All rights reserved
      </p>
    </>
  );
};

export default Footer;
