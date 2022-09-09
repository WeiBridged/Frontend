import React, { useState, useEffect } from "react";

export default function Bridge({ interval, searchText }) {
  const [estimateSwapData, setEstimateSwapData] = useState({});
  const [getTransactionData, setGetTransactionData] = useState({});

  return (
    <>
      <div className="container-fluid m-0 py-2 bg-black align-middle text-center text-banner">
        <a href="/#/" className="text-white">
          Start to Bridge
        </a>
      </div>
      <div className="container py-5 app-market">
        <div class="alert alert-secondary" role="alert">
          <div className="row p-1">
            <label>From</label>
            <input
              class="sc-bGbJRg iBXRhG"
              inputmode="decimal"
              title="Token Amount"
              autocomplete="off"
              autocorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              minlength="1"
              maxlength="79"
              spellcheck="false"
            />{" "}
            <div className="col">
              {" "}
              <label for="cars">Coin/Token</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Coin</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col">
              {" "}
              <label for="cars">Network/Chain</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Network</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>{" "}
        <div class="alert alert-secondary" role="alert">
          <div className="row p-1">
            <label>To</label>
            <input
              class="sc-bGbJRg iBXRhG"
              inputmode="decimal"
              title="Token Amount"
              autocomplete="off"
              autocorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              minlength="1"
              maxlength="79"
              spellcheck="false"
            />{" "}
            <div className="col">
              {" "}
              <label for="cars">Coin/Token</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Coin</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col">
              {" "}
              <label for="cars">Network/Chain</label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Network</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>{" "}
        <div class="alert alert-secondary" role="alert">
          Should be an error box, if u are on wrong network etc then should say
          here Here u can have a thing that Here u can have a thing that Here u
          can have a thing that Here u can have a thing that Here u can have a
          thing that Here u can have a thing that Here u can have a thing that
          Here u can have a thing that Here u can have a thing that
        </div>{" "}
      </div>
    </>
  );
}
