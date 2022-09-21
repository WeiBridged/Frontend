import "../index.scss";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { goerliABI } from "../constants/chainlinkABI";
import { optimismABI } from "../constants/chainlinkABI";
import ethereumIcon from "../assets/icons/meth.svg";
import { DataContext } from "../DataContext";
import Select from "react-select";
import { chainOptions, chainOptionsGoerliOptimism } from "../chainOptions";

const ChainlinkBridge = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [srcGoerliBridgeContract, setSrcGoerliBridgeContract] = useState(null);
  const [srcOptimismBridgeContract, setSrcOptimismBridgeContract] =
    useState(null);
  const [selectedDstChain, setSelectedDstChain] = useState("Optimism Goerli");

  const [selectedAddLiquidityChain, setSelectedAddLiquidityChain] = useState(
    {}
  );

  console.log(selectedDstChain, "DSSST CHAIN");
  const web3 = new Web3(window.web3.currentProvider);

  const optimismAddress = "0x0A0FDdB2f265d2De819C616ebe7cFFb7c9175Cdc";
  const goerliAddress = "0xdEa5F3E7d16D98177b66d3E874723C2bb299eeb6";
  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);

  const [srcChainSelected, setSelected] = React.useState("");
  console.log(userAccountAddress, "useracc addrr");
  /*   
for each option there should be a lock, owner has to have funds check that and throw error
button for the locks. 
  Optimism -> goerli
  Mumbai -> goerli
  goerli -> optimism, mumbai  
  */

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      //const network = await web3.eth.net.getNetworkType();
      //await window.ethereum.enable();
      //const addressFromMetamask = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      console.log(chainId);
      if (chainId !== 5) {
        setErrorMsg("Must be on the Goerli test network");
      }

      const goerliContract = new web3.eth.Contract(goerliABI, goerliAddress);
      const optimismContract = new web3.eth.Contract(
        optimismABI,
        optimismAddress
      );
      setSrcGoerliBridgeContract(goerliContract);
      setSrcOptimismBridgeContract(optimismContract);

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

  const selectSrcChain = (event) => {
    setSelected(event.target.value);
  };

  const selectDstChain = (event) => {
    console.log(event.target.value, "wat is val?");
    setSelectedDstChain(event.target.value);
  };
  //Different arrays for different dropdowns
  const polygon = ["Ethereum Goerli"];
  const optimism = ["Ethereum Goerli"];
  const goerli = ["Optimsim Goerli", "Polygon Mumbai"];

  let type = null;
  let options = null;

  //Setting Type variable according to dropdown
  if (srcChainSelected === "Polygon Mumbai") {
    type = polygon;
  } else if (srcChainSelected === "Optimism Goerli") {
    type = optimism;
  } else if (srcChainSelected === "Ethereum Goerli") {
    type = goerli;
  }

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  console.log(srcGoerliBridgeContract, "GOERLI CONTRACT");
  console.log(srcOptimismBridgeContract, "OPTIMISM");
  console.log(options, "options?");

  const clickAddLiqudity = async () => {
    console.log(selectedAddLiquidityChain.value, "INSIDE HEREEEOO");
    let connectedChainId = await web3.eth.net.getId();
    console.log(connectedChainId, "CONNECTED ID");
    if (connectedChainId === 5 && userAccountAddress) {
      console.log("You are here inside chainid 5");
      if (selectedAddLiquidityChain.value === "opt") {
        console.log("Inside opt callt");
        web3.eth.sendTransaction({
          to: optimismAddress,
          data: srcOptimismBridgeContract.methods
            .ownerAddBridgeLiqudity()
            .encodeABI(),
          value: 1000,
          from: userAccountAddress[0],
        });
      } else {
        web3.eth.sendTransaction({
          to: goerliAddress,
          data: srcGoerliBridgeContract.methods
            .ownerAddBridgeLiqudity()
            .encodeABI(),
          value: 1000,
          from: userAccountAddress[0],
        });
      }
    } else {
      setErrorMsg(
        "Please make sure you are connected to the Goerli network in your wallet!"
      );
    }
  };

  console.log(srcChainSelected, "what is selected?");

  const initiateSwap = (type) => {
    if (userAccountAddress) {
      console.log(
        srcChainSelected,
        "SRC CHAIN SELECTED BEFORE",
        selectedDstChain,
        "SELECTED DST CHAIN"
      );
      if (srcChainSelected === "Optimism Goerli") {
        web3.eth.sendTransaction({
          to: optimismAddress,
          data: srcOptimismBridgeContract.methods
            .lockTokensForGoerli()
            .encodeABI(),
          value: 1003,
          from: userAccountAddress[0],
        });
      } else if (srcChainSelected === "Polygon Mumbai") {
        web3.eth.sendTransaction({
          to: goerliAddress,
          data: srcGoerliBridgeContract.methods
            .lockTokensForOptimism()
            .encodeABI(),
          value: 1003,
          from: userAccountAddress[0],
        });
      } else if (srcChainSelected === "Ethereum Goerli") {
        if (selectedDstChain === "Optimism Goerli") {
          console.log(
            srcGoerliBridgeContract,
            "SRC CHAIN SELECTED BEFORE",
            selectedDstChain,
            "SELECTED DST CHAIN"
          );
          web3.eth.sendTransaction({
            to: goerliAddress,
            data: srcGoerliBridgeContract.methods
              .lockTokensForOptimism()
              .encodeABI(),
            value: 1003,
            from: userAccountAddress[0],
          });
        } else if (selectedDstChain === "Polygon Mumbai")
          web3.eth.sendTransaction({
            to: goerliAddress,
            data: srcGoerliBridgeContract.methods
              .lockTokensForOptimism()
              .encodeABI(),
            value: 1003,
            from: userAccountAddress[0],
          });
      }
    } else {
      setErrorMsg("Connect to Goerli");
    }
  };

  return (
    <div className="container py-5 app-market">
      <div class="alert alert-secondary" role="alert">
        <div className="row p-1">
          <h3>User</h3>
        </div>

        <div className="row p-1">
          <label>From</label>
          <input
            className="sc-bGbJRg iBXRhG"
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minLength="1"
            maxLength="79"
            spellCheck="false"
          />{" "}
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <select className="form-select" onChange={selectSrcChain}>
              <option>Choose...</option>
              <option>Polygon Mumbai</option>
              <option>Optimism Goerli</option>
              <option>Ethereum Goerli</option>
            </select>
          </div>
        </div>
        <div className="row p-1">
          <label>To</label>
          <input
            className="sc-bGbJRg iBXRhG"
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minLength="1"
            maxLength="79"
            spellCheck="false"
          />{" "}
          <div className="col">
            {" "}
            <label>Network/Chain</label>
            <select className="form-select" onChange={(e) => selectDstChain(e)}>
              {
                // Render the options based on users first selection
                options
              }
            </select>
          </div>
        </div>
      </div>{" "}
      <div className="col">
        {" "}
        <button
          style={{
            width: "100%",
            marginBottom: 20,
            backgroundColor: "cadetblue",
          }}
          onClick={() => initiateSwap()}
          className="btn"
        >
          Swap
        </button>
      </div>
      <div class="alert alert-secondary" role="alert">
        <div className="row p-1">
          <h3>Owner</h3>
        </div>{" "}
        <div className="row p-1">
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptionsGoerliOptimism}
              value={selectedAddLiquidityChain}
              onChange={setSelectedAddLiquidityChain}
            />
          </div>
          <label>Add Liqudity Amount</label>

          <div className="col">
            {" "}
            <button
              onClick={() => clickAddLiqudity()}
              className="btn"
              style={{ width: "100%", backgroundColor: "cadetblue" }}
            >
              Lock 1000 WEI
            </button>
          </div>
        </div>
      </div>{" "}
      <div class="alert alert-secondary" role="alert">
        {errorMsg}CGAIINLIINK Should be an error box, if u are on wrong network
        etc then should say here Here u can have a thing that Here u can have a
        thing that Here u can have a thing that Here u can have a thing that
        Here u can have a thing that Here u can have a thing that Here u can
        have a thing that Here u can have a thing that Here u can have a thing
        that
      </div>{" "}
    </div>
  );
};

export default ChainlinkBridge;
