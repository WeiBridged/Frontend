import React, { useState, useEffect } from "react";
import Select from "react-select";
import polygonIcon from "../assets/icons/polygon.svg";
import ChainlinkBridge from "../components/ChainlinkBridge";
import DeBridge from "../components/DeBridge";
import ERC20Bridge from "../components/ERC20Bridge";
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
export default function Bridge({ interval, searchText }) {
  const [estimateSwapData, setEstimateSwapData] = useState({});
  const [selectedFromChain, setSelectedFromChain] = useState({});
  const [selectedToChain, setSelectedToChain] = useState({});
  const [selectedFromToken, setSelectedFromToken] = useState({});
  const [showChainlinkBridge, setShowChainlinkBridge] = useState(false);
  const [showDeBridge, setShowDeBridge] = useState(false);
  const [showERC20Bridge, setShowERC20Bridge] = useState(true);

  const [selectedToToken, setSelectedToToken] = useState({});

  const whichBridgeToRender = () => {
    if (showChainlinkBridge) {
      console.log("inside chainlink");

      return <ChainlinkBridge></ChainlinkBridge>;
    } else if (showERC20Bridge) {
      console.log("inside erc20");

      return <ERC20Bridge></ERC20Bridge>;
    } else {
      console.log("inside debridge");
      return <DeBridge></DeBridge>;
    }
  };

  const onTabBarClick = (type) => {
    if (type === "chainlink") {
      setShowDeBridge(false);
      setShowERC20Bridge(false);
      setShowChainlinkBridge(true);
    } else if (type === "erc20") {
      console.log("inside erc20");
      setShowDeBridge(false);
      setShowERC20Bridge(true);
      setShowChainlinkBridge(false);
    } else {
      console.log("inside debridge");
      setShowDeBridge(true);
      setShowERC20Bridge(false);
      setShowChainlinkBridge(false);
    }
  };

  return (
    <>
      <div className="container-fluid m-0 py-2 bg-black align-middle text-center text-banner">
        <button
          onClick={() => onTabBarClick("chainlink")}
          className="btn transparent"
          style={showChainlinkBridge ? { backgroundColor: "cadetblue" } : null}
        >
          Mock Chainlink Keepers Bridge
        </button>
        <button
          onClick={() => onTabBarClick("debridge")}
          className="btn transparent"
          style={showDeBridge ? { backgroundColor: "cadetblue" } : null}
        >
          deBridge
        </button>
        <button
          onClick={() => onTabBarClick("erc20")}
          className="btn transparent"
          style={showERC20Bridge ? { backgroundColor: "cadetblue" } : null}
        >
          WeiBridged Golang Communication
        </button>
      </div>
      {whichBridgeToRender()}
    </>
  );
}
