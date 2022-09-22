import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";

import React, { useState } from "react";
import Web3 from "web3";
import HomeWrap from "./pages/HomeWrap";

import Navbar from "./components/Navbar";

import LimitOrders from "./pages/LimitOrders";
import DeBridge from "./components/DeBridge";
import ChainlinkBridge from "./components/ChainlinkBridge";
import Weibridged from "./components/Weibridged";
import { ethers } from "ethers";
import { rpcURL } from "./.config";

const MyContext = React.createContext();

function App() {
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const [connectedAddrValue, setConnectedAddrValue] = useState("");

  const provider = new ethers.providers.JsonRpcProvider(rpcURL);

  const handleConnectMetamask = async () => {
    console.log("I AM TRYIING ");

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    // const network = await web3.eth.net.getNetworkType();
    App.web3Provider = window.ethereum;
    await window.ethereum.enable();
    //Fetch account data:
    const accountFromMetaMask = await web3.eth.getAccounts();
    console.log(accountFromMetaMask, "account in app.js before set state");
    setUserAccountAddress(accountFromMetaMask);
    const name = await provider.lookupAddress(accountFromMetaMask);
    if (name) {
      setConnectedAddrValue(name);
    } else {
      setConnectedAddrValue(
        String(accountFromMetaMask).substr(0, 5) +
          "..." +
          String(accountFromMetaMask).substr(38, 4)
      );
    }

    console.log(userAccountAddress, "user metamask address after set state");
  };

  return (
    <DataContext.Provider value={{ userAccountAddress: userAccountAddress }}>
      <body class="stretched device-xl bg-white no-transition">
        {" "}
        <div className="container-fluid m-0 py-2 align-middle text-center text-banner">
          <button
            onClick={() => handleConnectMetamask()}
            className="btn-light mm"
          >
            {userAccountAddress ? connectedAddrValue : "Connect Wallet"}
          </button>
        </div>
        <Navbar
          handleConnectMetamask={handleConnectMetamask}
          connectedAddrValue={connectedAddrValue}
          userAccountAddress={userAccountAddress}
        />
        <Routes>
          <Route path="/" element={<HomeWrap />} />
          <Route path="/debridge" element={<DeBridge />} />
          <Route path="/gaslesslimitorders" element={<LimitOrders />} />
          <Route path="/chainlink" element={<ChainlinkBridge />} />
          <Route path="/weibridged" element={<Weibridged />} />
        </Routes>
        {/*         <Footer></Footer>
         */}{" "}
      </body>
    </DataContext.Provider>
  );
}

export default App;
