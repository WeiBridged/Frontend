import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";

import React, { useState } from "react";
import Web3 from "web3";
import HomeWrap from "./pages/HomeWrap";

import Navbar from "./components/Navbar";

import Owner from "./pages/Owner";
import DeBridge from "./components/DeBridge";
import ChainlinkBridge from "./components/ChainlinkBridge";
import Weibridged from "./components/Weibridged";
import { ethers } from "ethers";

function App() {
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const [connectedAddrValue, setConnectedAddrValue] = useState(" ");

  const handleConnectMetamask = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    // const network = await web3.eth.net.getNetworkType();
    App.web3Provider = window.ethereum;
    console.log(window.ethereum, "wats dis");
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Fetch account data:
    const accountFromMetaMask = await web3.eth.getAccounts();
    setUserAccountAddress(accountFromMetaMask);
    setConnectedAddrValue(
      String(accountFromMetaMask).substr(0, 5) +
        "..." +
        String(accountFromMetaMask).substr(38, 4)
    );
    const name = await provider.lookupAddress(accountFromMetaMask[0]);
    if (name) {
      setConnectedAddrValue(name);
    }
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
          <Route path="/owner_chainlink" element={<Owner />} />
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
