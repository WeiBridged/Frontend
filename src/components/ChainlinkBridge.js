import "../index.scss";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { goerliABI } from "../constants/chainlinkABI";
import { optimismABI } from "../constants/chainlinkABI";
import ethereumIcon from "../assets/icons/meth.svg";
import { DataContext } from "../DataContext";

const ChainlinkBridge = () => {
  const [errorMsg, setErrorMsg] = useState({});
  const [goerliBridgeContract, setGoerliBridgeContract] = useState(null);
  const [optimismBridgeContract, setOptimismBridgeContract] = useState(null);
  const optimismAddress = "0x204D7E79c1B8BeD6b2a533377BE5B4780deD6CE2";
  const goerliAddress = "0xD06245458e3479aDF4bAA9d390Cf7a335226060B";
  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);

  const [selected, setSelected] = React.useState("");
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
      if (chainId !== 80001) {
        setErrorMsg("Must be on the Mumbai test network");
      }

      const goerliContract = new web3.eth.Contract(goerliABI, goerliAddress);
      const optimismContract = new web3.eth.Contract(
        optimismABI,
        optimismAddress
      );
      setGoerliBridgeContract(goerliContract);
      setOptimismBridgeContract(optimismContract);

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

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  //Different arrays for different dropdowns
  const polygon = ["Ethereum Goerli"];
  const optimism = ["Ethereum Goerli"];
  const goerli = ["Polygon Mumbai", "Optimsim Goerli"];

  let type = null;
  let options = null;

  //Setting Type variable according to dropdown
  if (selected === "Polygon Mumbai") {
    type = polygon;
  } else if (selected === "Optimism Goerli") {
    type = optimism;
  } else if (selected === "Ethereum Goerli") {
    type = goerli;
  }

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  console.log(goerliBridgeContract, "GOERLI CONTRACT");
  console.log(optimismBridgeContract, "OPTIMISM");

  const clickAddLiqudity = () => {
    let web3 = new Web3(window.web3.currentProvider);
    web3.eth.sendTransaction({
      to: optimismAddress,
      data: optimismBridgeContract.methods.ownerAddBridgeLiqudity().encodeABI(),
      value: 1000,
      //TODO, make it come from metamask, should not be hardcoded
      from: "0xb81B9B88e764cb6b4E02c5D0F6D6D9051A61E020",
    });
  };

  const initiateSwap = () => {
    let web3 = new Web3(window.web3.currentProvider);
    /*    web3.eth.sendTransaction({
      to: optimismAddress,
      data: optimismBridgeContract.methods.ownerAddBridgeLiqudity().encodeABI(),
      value: 1000,
      //TODO, make it come from metamask, should not be hardcoded
      from: "0xb81B9B88e764cb6b4E02c5D0F6D6D9051A61E020",
    }); */
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
            <select
              className="form-select"
              onChange={changeSelectOptionHandler}
            >
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
            <select className="form-select">
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
          <label>Add Liqudity Amount</label>
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
            <button
              onClick={() => clickAddLiqudity()}
              className="btn"
              style={{ backgroundColor: "cadetblue" }}
            >
              Add Liqudity
            </button>
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
