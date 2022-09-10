import "../index.scss";
import React, { useState, useEffect } from "react";
import Web3 from "web3";

import { goerliABI } from "../constants/chainlinkABI";
import { optimismABI } from "../constants/chainlinkABI";

const ChainlinkBridge = () => {
  const [errorMsg, setErrorMsg] = useState({});
  const [goerliBridgeContract, setGoerliBridgeContract] = useState(null);
  const [optimismBridgeContract, setOptimismBridgeContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      //const network = await web3.eth.net.getNetworkType();
      //await window.ethereum.enable();
      //const addressFromMetamask = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      console.log(chainId);
      if (chainId !== 80001) {
        setErrorMsg("Must be on the Mumbai test network");
      }

      const goerliContract = new web3.eth.Contract(
        goerliABI,
        "0xD06245458e3479aDF4bAA9d390Cf7a335226060B"
      );
      const optimismContract = new web3.eth.Contract(
        optimismABI,
        "0x204D7E79c1B8BeD6b2a533377BE5B4780deD6CE2"
      );
      setGoerliBridgeContract(goerliContract);
      setGoerliBridgeContract(optimismContract);

      console.log(goerliContract, "This is electric contract");
      console.log(optimismContract.methods, "chainlinkContract");

      /*       if (goerliBridgeContract !== null) {
        goerliBridgeContract.methods
          .expirationOccured()
          .call()
          .then((data) => {
            console.log(data, "EXPIRATION OCC??????");
            setExpirationOccurred(data);
          })
          .catch((err) => {
            console.log(err);
          });
        if (optimismContract !== null) {
          optimismContract.methods
            .balanceOf(ELECTRICKEEPER_CONTRACT_ADDRESS)
            .call()
            .then((data) => {
              setElectricKeeperChainlinkBalance(web3.utils.fromWei(data));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } */
    };
    loadBlockchainData();
  }, []);

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
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
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
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
          </div>
        </div>
      </div>{" "}
      <div class="alert alert-secondary" role="alert">
        CGAIINLIINK Should be an error box, if u are on wrong network etc then
        should say here Here u can have a thing that Here u can have a thing
        that Here u can have a thing that Here u can have a thing that Here u
        can have a thing that Here u can have a thing that Here u can have a
        thing that Here u can have a thing that Here u can have a thing that
      </div>{" "}
    </div>
  );
};

export default ChainlinkBridge;
