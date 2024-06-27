import React from "react";
import "./footer.css";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer d-flex flex-column justify-content-center align-items-center">
      <div className="container-column-footer ">
        <div className="row gx-5 col-overlay-footer h-100 ">
          <div className="col h-100 ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid   ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid  ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid  ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid  ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid  ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid  ">
            <div className="inner-col-footer"></div>
          </div>
          <div className="col h-100 d-none d-md-grid  ">
            <div className="inner-col-footer"></div>
          </div>
        </div>
      </div>

      <footer className="row m-0">
        <div className="col-12 ">
          <div className="footer-first-container">
            <section className="row mx-0 mt-5">
              <div className="col-12 col-md-4">
                <div className="text-center h-100">
                  <h4 className="footer-title">How can we Help?</h4>
                  <ul>
                    <li className="footer-link-item">
                      <Link className="link">find My Local Beautya</Link>
                    </li>
                    <li className="footer-link-item">
                      <Link className="link">Contact Us</Link>
                    </li>
                    <li className="footer-link-item">
                      <Link className="link">FAQ</Link>
                    </li>
                    <li className="footer-link-item">
                      <Link className="link">Our Brand</Link>
                    </li>
                    <li className="footer-link-item">
                      <Link className="link">Blog</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="text-center h-100">
                  <h4 className="footer-title">Products</h4>
                  <ul>
                    <li className="footer-link-item">
                      <Link className="link">Women Make up</Link>
                    </li>
                    <li className="footer-link-item">
                      <Link className="link">Women Skincare</Link>
                    </li>
                    <li className="footer-link-item">
                      <Link className="link">Gifts & Sets</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="text-center h-100">
                  <h4 className="footer-title">keep in touch with beautya</h4>
                  <p className="footer-desc">
                    Join the Beautya newsletter and be first to hear about news,
                    offers and skincare advice
                  </p>
                  <form className="footer-form">
                    <div className="footer-form-tabel">
                      <span></span>
                      <p className="footer-desc">
                        By submitting your email, you agree to receive
                        advertising emails from Beautya.
                      </p>
                      <div className="footer-form-email">
                        <label
                          className="footer-form-label"
                          htmlFor="footer-input"
                        >
                          Email Address
                        </label>
                        <input type="text" id="footer-form-input" />
                      </div>
                      <button className="footer-form-btnSubmit rounded-1" type="submit">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="col-12 footer-second mt-5">
          <section className="d-flex flex-column flex-md-row justify-content-between align-items-center my-5 footer-second-container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  <FaMapMarkerAlt className="icon-contact" />
                </span>
                <p className="text-white mb-0 fs-4">
                  Dr. Richardson, California
                </p>
              </div>
              <p className="footer-dash mx-3"></p>
              <div className="footer-phone d-flex justify-content-between align-items-center">
                <span>
                  <FaPhoneAlt className="icon-contact" />
                </span>
                <p className="text-white mb-0 fs-4">1-802-526-2463</p>
              </div>
            </div>

            <div className="d-flex justify-content-around align-item-center mt-5 mt-md-0">
              <Link>
                <FaLinkedinIn className="socialMedia" />
              </Link>
              <Link>
                <FaFacebookF className="socialMedia" />
              </Link>
              <Link>
                <FaTwitter className="socialMedia" />
              </Link>
              <Link>
                <FaInstagram className="socialMedia" />
              </Link>
              <Link>
                <FaPinterestP className="socialMedia" />
              </Link>
            </div>
          </section>
        </div>
        <div className="col-12 footer-third">
          <section className="footer-third-container d-flex flex-column flex-md-row justify-content-between align-items-center py-5">
            <div className="footer-third-itemOne">
              <span className="text-white fs-5 me-2">©</span>
              <span className="text-white fs-5">
                2023 Beautya. All Rights Reserved.
              </span>
            </div>
            <div className="footer-thirds-itemTwo mt-4 mt-md-0">
              <span className="text-white fs-5 me-5">Terms & Conditions</span>
              <span className="text-white fs-5">Privacy Policy</span>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
