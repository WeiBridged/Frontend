import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";

import { isMobile } from "react-device-detect";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import HomeWrap from "./pages/HomeWrap";

import Navbar from "./components/Navbar";

import LimitOrders from "./pages/LimitOrders";
import DeBridge from "./components/DeBridge";
import ChainlinkBridge from "./components/ChainlinkBridge";

const MyContext = React.createContext();

function App() {
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const [connectedAddrValue, setConnectedAddrValue] = useState("");

  const handleConnectMetamask = async () => {
    console.log("I AM TRYIING ");
    let that = this;
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    //Fetch account data:
    const accountFromMetaMask = await web3.eth.getAccounts();
    console.log(accountFromMetaMask, "account in app.js before set state");
    setUserAccountAddress(accountFromMetaMask);
    setConnectedAddrValue(
      String(accountFromMetaMask).substr(0, 5) +
        "..." +
        String(accountFromMetaMask).substr(38, 4)
    );

    console.log(userAccountAddress, "user metamask address after set state");
  };

  return (
    <DataContext.Provider value={{ userAccountAddress: userAccountAddress }}>
      <body class="stretched device-xl bg-white no-transition">
        {" "}
        {/*      <button
          onClick={() => handleConnectMetamask()}
          className="btn-light mm"
        >
          {userAccountAddress ? connectedAddrValue : "Connect Wallet"}
        </button> */}
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
        </Routes>
        {/*         <Footer></Footer>
         */}{" "}
      </body>
    </DataContext.Provider>
  );
}

export default App;
