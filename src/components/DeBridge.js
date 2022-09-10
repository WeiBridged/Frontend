import "../index.scss";
import React, { useState, useEffect } from "react";

import Select from "react-select";
import polygonIcon from "../assets/icons/polygon.svg";
import ChainlinkBridge from "./ChainlinkBridge";
function YourIcon() {
  return <img src={polygonIcon} width={20} height={20}></img>;
}

const chainOptions = [
  {
    value: "80001",
    label: (
      <>
        <YourIcon /> Polygon Mumbai
      </>
    ),
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "420",
    label: (
      <>
        <YourIcon /> Optimism Görli Testnet
      </>
    ),
    color: "#0052CC",
  },
  {
    value: "420",
    label: (
      <>
        <YourIcon /> Ethereum Görli
      </>
    ),
    color: "#5243AA",
  },
];
const DeBridge = () => {
  const [estimateSwapData, setEstimateSwapData] = useState({});
  const [selectedFromChain, setSelectedFromChain] = useState({});
  const [selectedToChain, setSelectedToChain] = useState({});
  const [selectedToToken, setSelectedToToken] = useState({});

  const [selectedFromToken, setSelectedFromToken] = useState({});
  console.log("inside debridge compontonent");
  return (
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
            <Select
              options={chainOptions}
              value={selectedFromToken}
              onChange={setSelectedFromToken}
            />
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedFromChain}
              onChange={setSelectedFromChain}
            />
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
            <Select
              options={chainOptions}
              value={selectedToToken}
              onChange={setSelectedToToken}
            />
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedToChain}
              onChange={setSelectedToChain}
            />{" "}
          </div>
        </div>
      </div>{" "}
      <div class="alert alert-secondary" role="alert">
        DEEBRIDGE Should be an error box, if u are on wrong network etc then
        should say here Here u can have a thing that Here u can have a thing
        that Here u can have a thing that Here u can have a thing that Here u
        can have a thing that Here u can have a thing that Here u can have a
        thing that Here u can have a thing that Here u can have a thing that
      </div>{" "}
    </div>
  );
};

export default DeBridge;
