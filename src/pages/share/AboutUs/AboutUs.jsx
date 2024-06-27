import React, { useEffect } from "react";
import "./aboutus.css";
import { Helmet } from "react-helmet";
export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behaviar: "smoothly" });
  }, []);
  return (
    <div className="about">
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className="container-column">
        <div className="row gx-5 col-overlay">
          <div className="col vh-100 ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid   ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid  ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid  ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid  ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid  ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid  ">
            <div className="inner-col">1</div>
          </div>
          <div className="col vh-100 d-none d-md-grid  ">
            <div className="inner-col">1</div>
          </div>
        </div>
      </div>
      <div className="container-about p-0">
        <main>
          <section className="our-brand">
            <div className="our-brand-container">
              <h1>Our Brand</h1>
              <div className="our-brand-img ">
                <img
                  src={
                    SERVER_URL +
                    "/uploads/others/Rectangle 123341716233285983.png"
                  }
                  alt="about-us"
                />
              </div>
              <p>
                We believe that beauty thrives in diversity and discovery. Our
                purpose is to expand the way the world sees beauty by empowering
                the ExtraOrdinary in each of us.
              </p>
            </div>
          </section>
          <section className="our-brand-desc">
            <div className="heritage">
              <h3>Heritage</h3>
              <div className="heritage-container">
                <p>
                  From the very beginning, our founder believed that Beautya
                  could not only disrupt beauty retail, but that it would have a
                  positive impact on the world. Our story began in 2015 when our
                  founder, Jane, realized that there were very few cosmetic
                  brands that catered to her skin type. She started
                  experimenting with different ingredients and formulations in
                  her kitchen, and soon her friends and family were raving about
                  her products. Encouraged by their feedback, Jane decided to
                  turn her hobby into a business. Today, our team of experts
                  works hard to create cosmetics that are not only effective but
                  also sustainable and ethical.
                </p>
                <div className="heritage-img">
                  <img
                    src={
                      SERVER_URL +
                      "/uploads/others/Frame 260855461716163275157.png"
                    }
                    alt="woman"
                  />
                </div>
              </div>
            </div>
            <div className="our-brand-desc-item">
              <h3>Ethical and Sustainable Beauty:</h3>
              <p>
                At Beautya cosmetic company , we believe that beauty should
                never come at the expense of animals, the environment, or our
                customers' health. That's why we've made sure that our products
                are vegan, curl-free, gluten-free, and packaged in recycled
                materials
              </p>
            </div>
            <div className="our-brand-desc-item">
              <h3>Vegan, Curl-Free</h3>
              <p>
                When we say our products are vegan, we mean that we never use
                any animal-derived ingredients or byproducts in our
                formulations. We believe that cruelty-free beauty is the way of
                the future, and we're proud to be a part of that movement.
              </p>
            </div>
            <div className="our-brand-desc-item">
              <h3>Gluten-Free Products</h3>
              <p>
                For those with sensitivities or allergies to gluten, we've made
                sure that our products are 100% gluten-free. You can use our
                products with confidence, knowing that they are safe and gentle
                on your skin.
              </p>
            </div>
            <div className="our-brand-desc-item">
              <h3>Recycled Packaging</h3>
              <p>
                Finally, we're committed to doing our part for the environment,
                which is why we've packaged our products in recycled materials.
                By choosing our products, you're making a positive impact on the
                planet and reducing your environmental footprint. We're
                dedicated to providing you with high-quality, ethically-sourced
                beauty solutions that you can feel good about using.
              </p>
            </div>
          </section>

          <div className="logo-group">
            <div className="container-column-logo">
              <div className="row gx-5 col-overlay-logo">
                <div className="col vh-100 ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid   ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid  ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid  ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid  ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid  ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid  ">
                  <div className="inner-col-logo"></div>
                </div>
                <div className="col vh-100 d-none d-md-grid  ">
                  <div className="inner-col-logo"></div>
                </div>
              </div>
            </div>
            <div className="row  gx-5  py-3">
              <div className="col-6 text-center mb-5 mb-md-0 col-md-3 ">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="logo-img">
                    <div>
                      <img
                        src={
                          SERVER_URL + "/uploads/others/rabbit1716163307436.png"
                        }
                        alt="rabbit"
                      />
                    </div>
                  </div>
                  <span className="logo-text">No tests on animals</span>
                </div>
              </div>
              <div className="col-6 text-center mb-5 mb-md-0 col-md-3 ">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="logo-img">
                    <div>
                      <img
                        src={
                          SERVER_URL + "/uploads/others/leaf1716163340047.png"
                        }
                        alt="leaf"
                      />
                    </div>
                  </div>
                  <span className="logo-text">
                    No animal-derived ingredients
                  </span>
                </div>
              </div>
              <div className="col-6 text-center  col-md-3 ">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="logo-img">
                    <div>
                      <img
                        src={
                          SERVER_URL + "/uploads/others/wheat1716163314986.png"
                        }
                        alt="wheat"
                      />
                    </div>
                  </div>
                  <span className="logo-text">
                    No gluten, or gluten byproducts
                  </span>
                </div>
              </div>
              <div className="col-6 text-center  col-md-3 ">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="logo-img">
                    <div>
                      <img
                        src={
                          SERVER_URL + "/uploads/others/lamp1716163327985.png"
                        }
                        alt="lamp"
                      />
                    </div>
                  </div>
                  <span className="logo-text">Recyclable packaging</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
