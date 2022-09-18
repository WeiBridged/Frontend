import "../index.scss";
import React, { useState, useEffect } from "react";

import Select from "react-select";
import polygonIcon from "../assets/icons/polygon.svg";
import ethereumIcon from "../assets/icons/meth.svg";
import arbIcon from "../assets/icons/arbitrum.svg";
import avaxIcon from "../assets/icons/avax.svg";

import Web3 from "web3";
import { DataContext } from "../DataContext";

function YourIcon() {
  return <img src={polygonIcon} width={20} height={20}></img>;
}

const chainOptions = [
  {
    value: {
      chainId: 137,
      tokenContractAddr: "0x0000000000000000000000000000000000000000",
    },
    label: (
      <>
        <img src={polygonIcon} width={20} height={20}></img> Polygon
      </>
    ),
    color: "#00B8D9",
    isFixed: true,
  },
  {
    value: {
      chainId: 42161,
      tokenContractAddr: "0x0000000000000000000000000000000000000000",
    },
    label: (
      <>
        <img src={arbIcon} width={20} height={20}></img> Arbitrum
      </>
    ),
    color: "#0052CC",
  },
  {
    value: {
      chainId: 1,
      tokenContractAddr: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    },
    label: (
      <>
        <img src={ethereumIcon} width={20} height={20}></img> Ethereum
      </>
    ),
    color: "#5243AA",
  },
  {
    value: {
      chainId: 43114,
      tokenContractAddr: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041",
    },
    label: (
      <>
        <img src={avaxIcon} width={20} height={20}></img> Avalanche
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
  const [errorMsg, setErrorMsg] = useState("");

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
  const [formattedInput, setFormattedInput] = useState(0);

  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);
  let web3 = new Web3(window.web3.currentProvider);

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
    let formattedInput = srcChainTokenInAmount * 10 ** 18;
    const liveUrl = `https://deswap.debridge.finance/v1.0/estimation?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${formattedInput}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto`;
    console.log(liveUrl, "LIVE URL CALLED");
    const res = await fetch(liveUrl);
    const data = await res.json();
    setEstimateSwapData(data);
    let transaction = await getTransaction();
    return transaction;
  };
  /*   useEffect(() => {
    fetchSwapEstimation();
  }, []); */

  const getTransaction = async () => {
    let formattedInput = srcChainTokenInAmount * 10 ** 18;
    const liveUrl = `https://deswap.debridge.finance/v1.0/transaction?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${formattedInput}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto&dstChainTokenOutRecipient=${dstChainTokenOutRecipient}&dstChainFallbackAddress=${dstChainFallbackAddress}`;
    fetch(liveUrl)
      .then((response) => response.json())
      .then((response) => setGetTransactionData(response))
      .catch((err) => console.error(err));
  };

  console.log(estimateSwapData, "BÄÄ est swap data");
  console.log(getTransactionData, "BÄÄ gettransaction data");
  console.log(srcChainTokenInAmount, "TOKEN IN AMOUNT");

  const initiateSwap = async () => {
    let paramObj = {
      srcChainId: srcChainId,
      srcChainTokenIn: srcChainTokenIn,
      srcChainTokenInAmount: srcChainTokenInAmount,
      dstChainId: dstChainId,
      dstChainFallbackAddress: dstChainFallbackAddress,
      dstChainTokenOut: dstChainTokenOut,
      dstChainTokenOutRecipient: dstChainTokenOutRecipient,
    };
    console.log();
    if (
      srcChainId &&
      srcChainTokenIn &&
      srcChainTokenInAmount &&
      dstChainId &&
      dstChainFallbackAddress &&
      dstChainTokenOut &&
      dstChainTokenOutRecipient
    ) {
      console.log("INSIDE IF INIT SWAPPPPP");
      let transactionData = await fetchSwapEstimation();
      console.log("TRANSACTIONDATAAAA", transactionData);
    }
  };

  if (1) {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, 1000);
  }

  const handleSelectChain = async (asset, type) => {
    if (type === "src") {
      console.log("inside SRC");
      setSrcChainId(asset.value.chainId);
      setSrcChainTokenIn("0x0000000000000000000000000000000000000000");

      setSelectedFromChain(asset);
    }
    //set destination chain (TO)
    else {
      setDstChainId(asset.value.chainId);
      setDstChainTokenOut("0x0000000000000000000000000000000000000000");
      setSelectedToChain(asset);
      // TODO check here if user is on right account, the dstChainId is the same as connected chainid in wallet

      let connectedChainId = await web3.eth.net.getId();
      console.log(connectedChainId, "CONNECTED CHAIN ID", asset.value.chainId);
      if (
        userAccountAddress !== "" ||
        connectedChainId === 137 ||
        connectedChainId === 1 ||
        connectedChainId === 43114 ||
        connectedChainId === 42161
      ) {
        setDstChainTokenOutRecipient(userAccountAddress);
        setDstChainFallbackAddress(userAccountAddress);
      } else {
        setErrorMsg(
          "Source chain chosen does not match connected chain. Please connect to chainId " +
            asset.value.chainId +
            " in your wallet"
        );
      }
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
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedFromChain}
              onChange={(val) => handleSelectChain(val, "src")}
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
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedToChain}
              onChange={(value) => handleSelectChain(value, "dst")}
            />
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
        {errorMsg}
      </div>{" "}
    </div>
  );
};

export default DeBridge;
