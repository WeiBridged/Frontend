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
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5 app-market">
        <div class="alert alert-secondary" role="alert">
          This service allows you to use 3 different bridges, the Chainlink Mock
          Bridge, the WeiBridged and the deBridge through their swap API.
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
                              <span className="s1">Chainlink Mock Bridge</span>
                            </h4>
                            <p className="p2">
                              Owner adds 1000 wei [ETH] (or another token) to
                              another side of a bridge User requests to bridge
                              1000 wei by paying 1003 wei (3 wei covers the 0.3%
                              fee) After deposit is made, user is added to the
                              user bridge queue Owner detects user in queue
                              Locally store user in queue with Golang variable
                              ⚠️ Assume bridge will not go down with the stored
                              address removed from queue. ⚠️ Dequeue to remove
                              user from the queue. Unlock the added wei [ETH]
                              (or another token) to the user locally stored,
                              then remove user locally.
                            </p>
                            <h4 className="p1">WeiBridged</h4>
                            <p className="p1">
                              -MSG.VALUE to MSG.VALUE bridge logic -Queue in
                              Solidity pushes new user who locked tokens, then
                              serves them first to be bridged, then removed from
                              queue (Goerli to Optimism path) -Added 0.3% bridge
                              fee paid to contract Owner -Able to use Geth and
                              Prysm Goerli synced node locally to read and write
                              to Goerli blockchain -Tested example queue logic
                              library in contract
                            </p>
                            <h4 className="p1">deBridge</h4>
                            <p className="p1">
                              We use deBridge swap API to be able to swap
                              between chains.
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
