import "../index.scss";
import React, { useState, useEffect, useCallback } from "react";

import Select from "react-select";
import polygonIcon from "../assets/icons/polygon.svg";
import ethereumIcon from "../assets/icons/meth.svg";
import arbIcon from "../assets/icons/arbitrum.svg";
import avaxIcon from "../assets/icons/avax.svg";
import { chainOptions } from "../chainOptions";
import convert from "crypto-convert";

import Web3 from "web3";
import { DataContext } from "../DataContext";

//Custom hook to create interval that is clearable
function useInterval(callback, interval) {
  const savedCallback = React.useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (interval !== null) {
      let id = setInterval(tick, interval * 1000);
      return () => clearInterval(id);
    }
  }, [interval]);
}
const DeBridge = () => {
  const [estimateSwapData, setEstimateSwapData] = useState({});
  const [selectedFromChain, setSelectedFromChain] = useState({});
  const [selectedToChain, setSelectedToChain] = useState({});
  const [selectedToToken, setSelectedToToken] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [selectedFromToken, setSelectedFromToken] = useState({});
  const [getTransactionData, setGetTransactionData] = useState(null);

  const [srcChainId, setSrcChainId] = useState({});
  const [srcChainTokenIn, setSrcChainTokenIn] = useState({});
  const [srcChainTokenInAmount, setSrcChainTokenInAmount] = useState(0);
  const [dstChainId, setDstChainId] = useState({});
  const [dstChainTokenOut, setDstChainTokenOut] = useState({});
  const [dstChainTokenOutRecipient, setDstChainTokenOutRecipient] = useState(
    {}
  );
  const [dstChainFallbackAddress, setDstChainFallbackAddress] = useState({});

  const [gasData, setGasData] = useState([]);
  const [inputGasPrice, setInputGasPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [metamaskChainId, setMetamaskChainId] = useState(true);
  const [isRunning, setIsRunning] = useState(true);

  const interval = 15;

  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);
  let web3 = new Web3(window.web3.currentProvider);

  const fetchApiData = async () => {
    const gasInWei = await web3.eth.getGasPrice();
    console.log(gasInWei, "gas in weii");

    //Sets the raw gas state
    console.log("REFETCH!");
    //Set gas data in GWEI instead
    setGasData(gasInWei / 1000000000);
  };

  //Fetch on mounting component
  useEffect(() => {
    fetchApiData();
    web3.eth.getChainId().then((result) => {
      setMetamaskChainId(result);
    });
  }, []);

  //Fetch continously during the interval set
  useInterval(
    () => {
      fetchApiData();
      setCount(count + 1);
    },
    isRunning ? interval : null
  );

  const fetchSwapEstimation = useCallback(async () => {
    try {
      let formattedInput = srcChainTokenInAmount * 10 ** 18;
      const liveUrl = `https://deswap.debridge.finance/v1.0/estimation?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${formattedInput}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto`;
      const res = await fetch(liveUrl);
      const data = await res.json();
      setEstimateSwapData(data);
      let transaction = await getTransaction();
      return transaction;
    } catch (err) {
      err.errorMessage
        ? setErrorMsg(err.errorMessage)
        : setErrorMsg("Something went wrong");
    }
  }, [
    dstChainId,
    dstChainTokenOut,
    srcChainId,
    srcChainTokenIn,
    srcChainTokenInAmount,
  ]);

  const getTransaction = useCallback(async () => {
    let formattedInput = srcChainTokenInAmount * 10 ** 18;
    const liveUrl = `https://deswap.debridge.finance/v1.0/transaction?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${formattedInput}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto&dstChainTokenOutRecipient=${dstChainTokenOutRecipient}&dstChainFallbackAddress=${dstChainFallbackAddress}`;
    fetch(liveUrl)
      .then((response) => response.json())
      .then((response) => {
        response.errorMessage
          ? setErrorMsg(response.errorMessage)
          : setGetTransactionData(response);
      })
      .catch((err) => {
        err.errorMessage
          ? setErrorMsg(err.errorMessage)
          : setErrorMsg("Something went wrong", err);
      });
  }, [
    dstChainFallbackAddress,
    dstChainId,
    dstChainTokenOut,
    dstChainTokenOutRecipient,
    srcChainId,
    srcChainTokenIn,
    srcChainTokenInAmount,
  ]);
  const initiateSwap = async () => {
    /*   let paramObj = {
      srcChainId: srcChainId,
      srcChainTokenIn: srcChainTokenIn,
      srcChainTokenInAmount: srcChainTokenInAmount,
      dstChainId: dstChainId,
      dstChainFallbackAddress: dstChainFallbackAddress,
      dstChainTokenOut: dstChainTokenOut,
      dstChainTokenOutRecipient: dstChainTokenOutRecipient,
    }; */
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
    }
  };

  //TODO: Fix this to a better logic if u have time
  if (getTransactionData) {
    setTimeout(() => {
      try {
        web3.eth.sendTransaction(
          {
            from: userAccountAddress[0],
            to: getTransactionData.tx.to,
            data: getTransactionData.tx.data,
            value: getTransactionData.tx.value,
          },
          function (err, transactionHash) {
            if (err) {
              setErrorMsg(err, " Something went wrong!");
            } else {
              setSuccessMsg(
                "Bridge swap successfull! You will see your tokens in your wallet."
              );
              console.log(transactionHash, "");
            }
          }
        );
      } catch (err) {
        setErrorMsg("Something went wrong", err);
      }
    }, 1000);
  }

  const handleSelectChain = async (asset, type) => {
    if (type === "src") {
      setSrcChainId(asset.value.chainId);
      setSrcChainTokenIn("0x0000000000000000000000000000000000000000");

      setSelectedFromChain(asset);
    }
    //set destination chain (TO)
    else {
      setDstChainId(asset.value.chainId);
      setDstChainTokenOut("0x0000000000000000000000000000000000000000");
      setSelectedToChain(asset);
      let connectedChainId = await web3.eth.net.getId();
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

  const getTickerFromChainId = (chainId) => {
    if (chainId === 137) {
      return "MATIC";
    } else if (chainId === 1) {
      return "ETH";
    } else if (chainId === 42161) {
      return "ETH";
    } else if (chainId === 43114) {
      return "AVAX";
    }
  };

  //TODO: also some ugly logic, fix later
  var convertedAmount = 0;
  if (srcChainId && dstChainId && srcChainTokenInAmount) {
    let tickerSrc = getTickerFromChainId(srcChainId);
    let tickerDst = getTickerFromChainId(dstChainId);

    if (tickerDst === "MATIC") {
      convertedAmount = "~" + (srcChainTokenInAmount * 1735).toString();
    } else if (tickerSrc === "MATIC") {
      convertedAmount = "~" + (srcChainTokenInAmount / 1735).toString();
    } else if (tickerSrc && tickerDst) {
      //TODO does not support matic conversion
      convertedAmount = new convert.from(tickerSrc)
        .to(tickerDst)
        .amount(Number(srcChainTokenInAmount));
    }
  }

  if (gasData === inputGasPrice) {
    alert("Gas limit hit! You can try and swap now. ");
  }

  return (
    <div className="container py-5 app-market">
      <div class="alert alert-secondary" role="alert">
        <div className="row p-1">
          <div className="col">
            <p>
              Latest gas price <b>{gasData}</b> GWEI on chainid{" "}
              <b>{metamaskChainId}</b>
              {}
            </p>
          </div>
          <div className="col">
            <label>Input your desired gas price in GWEI</label>
            <input
              className="input-group mb-3"
              value={inputGasPrice}
              onInput={(e) => setInputGasPrice(e.target.value)}
            ></input>
          </div>
        </div>
      </div>{" "}
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
            readOnly="true"
            value={convertedAmount}
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
      {errorMsg || successMsg ? (
        <div
          className={errorMsg ? "alert alert-error" : "alert alert-secondary"}
          role="alert"
        >
          {errorMsg} {successMsg}
        </div>
      ) : null}
    </div>
  );
};

export default DeBridge;
