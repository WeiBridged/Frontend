import "../index.scss";
import React, { useState, useEffect } from "react";

import Select from "react-select";
import polygonIcon from "../assets/icons/polygon.svg";
import ethereumIcon from "../assets/icons/meth.svg";
import arbIcon from "../assets/icons/arbitrum.svg";
import avaxIcon from "../assets/icons/avax.svg";

function YourIcon() {
  return <img src={polygonIcon} width={20} height={20}></img>;
}

const chainOptions = [
  {
    value: "80001",
    label: (
      <>
        <img src={polygonIcon} width={20} height={20}></img> Polygon
      </>
    ),
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "421611",
    label: (
      <>
        <img src={arbIcon} width={20} height={20}></img> Arbitrum
      </>
    ),
    color: "#0052CC",
  },
  {
    value: "420",
    label: (
      <>
        <img src={ethereumIcon} width={20} height={20}></img> Ethereum
      </>
    ),
    color: "#5243AA",
  },
  {
    value: "420",
    label: (
      <>
        <img src={avaxIcon} width={20} height={20}></img> Avalanche
      </>
    ),
    color: "#5243AA",
  },
];

const tokenOptions = [
  {
    value: "80001",
    label: (
      <>
        <img src={polygonIcon} width={20} height={20}></img> MATIC
      </>
    ),
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: "421611",
    label: (
      <>
        <img src={arbIcon} width={20} height={20}></img> Arbitrum ETH
      </>
    ),
    color: "#0052CC",
  },
  {
    value: "420",
    label: (
      <>
        <img src={ethereumIcon} width={20} height={20}></img> Ethereum ETH
      </>
    ),
    color: "#5243AA",
  },
  {
    value: "420",
    label: (
      <>
        <img src={avaxIcon} width={20} height={20}></img> AVAX
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
  const [getTransactionData, setGetTransactionData] = useState({});

  const [srcChainId, setSrcChainId] = useState({});
  const [srcChainTokenIn, setSrcChainTokenIn] = useState({});
  const [srcChainTokenInAmount, setSrcChainTokenInAmount] = useState(0);
  const [dstChainId, setDstChainId] = useState({});
  const [dstChainTokenOut, setDstChainTokenOut] = useState({});
  const [dstChainTokenOutRecipient, setDstChainTokenOutRecipient] = useState(
    {}
  );
  const [dstChainFallbackAddress, setDstChainFallbackAddress] = useState({});

  /*   let srcChainId = "1";
  let srcChainTokenIn = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  let srcChainTokenInAmount = "50000000";
  let dstChainId = "137";
  let dstChainTokenOut = "0x0000000000000000000000000000000000000000";
  let dstChainTokenOutRecipient = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  let dstChainFallbackAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; */

  //IMPLEMENTAION FROM DEBRIDGE DOCS: https://docs.debridge.finance/deswap/api-quick-start-guide
  /*   
  srcChainId specifies the Ethereum chain id (1) as the chain swap is being initiated
srcChainTokenIn specifies the USDT token address (0xdAC17F958D2ee523a2206206994597C13D831ec7)
srcChainTokenInAmount specifies the desired input amount: since USDT token contract uses 6 decimals (the number of digits that come after the decimal place when displaying token values on-screen), the simple math: 50 * 10^6 leads to 50000000 as the value representing 50 USDT tokens
dstChainId specified the Polygon network chain id (137) as the target (destination) chain
dstChainTokenOut specifies the address of the target token; since MATIC is not a typical ERC-20 token represented by a smart contract but rather a native coin (a one-of-a-kind token within each EVM chain), we use a null (or zero) address to distinguish it from other tokens.
dstChainTokenOutRecipient, the address target tokens should be transferred to after the swap, and
dstChainFallbackAddress, the address target or intermediary tokens should be transferred in case of a failed swap (e.g., a swap may fail due to slippage constraints). 
*/

  const fetchSwapEstimation = async () => {
    const liveUrl = `https://deswap.debridge.finance/v1.0/estimation?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${srcChainTokenInAmount}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto`;
    const res = await fetch(liveUrl);
    const data = await res.json();
    setEstimateSwapData(data);
    await getTransaction();
  };
  /*   useEffect(() => {
    fetchSwapEstimation();
  }, []); */

  const getTransaction = async () => {
    fetch(
      `https://deswap.debridge.finance/v1.0/transaction?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${srcChainTokenInAmount}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto&dstChainTokenOutRecipient=${dstChainTokenOutRecipient}&dstChainFallbackAddress=${dstChainFallbackAddress}`
    )
      .then((response) => response.json())
      .then((response) => setGetTransactionData(response))
      .catch((err) => console.error(err));
  };

  console.log(estimateSwapData, "BÄÄ est swap data");
  console.log(getTransactionData, "BÄÄ gettransaction data");
  console.log("inside debridge compontonent");

  const initiateSwap = async () => {
    if (
      srcChainId &&
      srcChainTokenIn &&
      srcChainTokenInAmount &&
      dstChainId &&
      dstChainFallbackAddress &&
      dstChainTokenOut &&
      dstChainTokenOutRecipient
    ) {
      await fetchSwapEstimation();
      console.log(getTransactionData, "should be set on click");
    }
  };

  const handleSelectChain = (type) => {
    if (type === "src") {
    }
    //set destination chain (TO)
    else {
    }
  };
  const handleSelectToken = (type) => {
    if (type === "src") {
    }
    //set destination chain (TO)
    else {
    }
  };

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
            value={srcChainTokenInAmount}
            onInput={(e) => setSrcChainTokenInAmount(e.target.value)}
          />{" "}
          <div className="col">
            {" "}
            <label for="cars">Coin/Token</label>
            <Select
              options={tokenOptions}
              value={selectedFromToken}
              onChange={() => handleSelectToken("src")}
            />
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedFromChain}
              onChange={() => handleSelectChain("src")}
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
            value={0}
          />{" "}
          <div className="col">
            {" "}
            <label for="cars">Coin/Token</label>
            <Select
              options={chainOptions}
              value={selectedToToken}
              onChange={() => handleSelectToken("dst")}
            />
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedToChain}
              onChange={() => handleSelectChain("dst")}
            />{" "}
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
