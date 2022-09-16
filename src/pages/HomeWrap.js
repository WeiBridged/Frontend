import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function HomeWrap({ interval, searchText }) {
  return (
    <>
      <div className="container-fluid text-white text-center page-top bg-top-app-market">
        <div className="container">
          <h1 className="top-page col-12 offset-md-7 col-md-5">WeiBridged</h1>
        </div>
      </div>
      <div className="container-fluid text-white bg-sandstorm d-flex flex-column align-items-center p-3">
        <div className="container">
          <div className="cell-lg-full ingress-content">
            <h4>Connect. Bridge. Done.</h4>
            <p>
              WeiBridged is a secure and well-trusted bridge platform that will
              enable you to reach over 5 different chains in the crypto space.
              Using the WeiBridged is as easy as one two three!
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5 app-market">
        <div class="alert alert-secondary" role="alert">
          Here u can have a thing that Here u can have a thing that Here u can
          have a thing that Here u can have a thing that Here u can have a thing
          that Here u can have a thing that Here u can have a thing that Here u
          can have a thing that Here u can have a thing that
        </div>
        <div className="row">
          <div className="col">
            <article
              id="post-16170"
              className="clearfix post-16170 page type-page status-publish hentry"
              role="article"
            >
              <section className="post_content">
                <div className="vc_row wpb_row vc_row-fluid">
                  <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner">
                      <div className="wpb_wrapper">
                        <div className="wpb_text_column wpb_content_element ">
                          <div className="wpb_wrapper">
                            <h4 className="p1">
                              <span className="s1">Explore Chains</span>
                            </h4>
                            <p className="p2">
                              WeiBridged is a secure and well-trusted bridge
                              platform that will enable you to reach over 5
                              different chains in the crypto space. Using the
                              WeiBridged is as easy as one two three! WeiBridged
                              is a secure and well-trusted bridge platform that
                              will enable you to reach over 5 different chains
                              in the crypto space. Using the WeiBridged is as
                              easy as one two three!
                            </p>
                            <h4 className="p1">We got your back!</h4>
                            <p className="p1">
                              WeiBridged is a secure and well-trusted bridge
                              platform that will enable you to reach over 5
                              different chains in the crypto space. Using the
                              WeiBridged is as easy as one two three! WeiBridged
                              is a secure and well-trusted bridge platform that
                              will enable you to reach over 5 different chains
                              in the crypto space. Using the WeiBridged is as
                              easy as one two three! WeiBridged is a secure and
                              well-trusted bridge platform that will enable you
                              to reach over 5 different chains in the crypto
                              space. Using the WeiBridged is as easy as one two
                              three!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer>
                <p className="clearfix"></p>
              </footer>
            </article>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
