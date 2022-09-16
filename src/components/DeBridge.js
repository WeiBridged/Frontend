import "../index.scss";
import React, { useState, useEffect } from "react";

import Select from "react-select";
import polygonIcon from "../assets/icons/polygon.svg";
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
const DeBridge = () => {
  const [estimateSwapData, setEstimateSwapData] = useState({});
  const [selectedFromChain, setSelectedFromChain] = useState({});
  const [selectedToChain, setSelectedToChain] = useState({});
  const [selectedToToken, setSelectedToToken] = useState({});

  const [selectedFromToken, setSelectedFromToken] = useState({});
  const [getTransactionData, setGetTransactionData] = useState({});

  let srcChainId = "1";
  let srcChainTokenIn = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  let srcChainTokenInAmount = "50000000";
  let dstChainId = "137";
  let dstChainTokenOut = "0x0000000000000000000000000000000000000000";
  let dstChainTokenOutRecipient = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  let dstChainFallbackAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  //IMPLEMENTAION FROM DEBRIDGE DOCS: https://docs.debridge.finance/deswap/api-quick-start-guide
  /*   srcChainId specifies the Ethereum chain id (1) as the chain swap is being initiated
srcChainTokenIn specifies the USDT token address (0xdAC17F958D2ee523a2206206994597C13D831ec7)
srcChainTokenInAmount specifies the desired input amount: since USDT token contract uses 6 decimals (the number of digits that come after the decimal place when displaying token values on-screen), the simple math: 50 * 10^6 leads to 50000000 as the value representing 50 USDT tokens
dstChainId specified the Polygon network chain id (137) as the target (destination) chain
dstChainTokenOut specifies the address of the target token; since MATIC is not a typical ERC-20 token represented by a smart contract but rather a native coin (a one-of-a-kind token within each EVM chain), we use a null (or zero) address to distinguish it from other tokens.
dstChainTokenOutRecipient, the address target tokens should be transferred to after the swap, and
dstChainFallbackAddress, the address target or intermediary tokens should be transferred in case of a failed swap (e.g., a swap may fail due to slippage constraints). 

*/

  useEffect(() => {
    const fetchSwapEstimation = async () => {
      const liveUrl = `https://deswap.debridge.finance/v1.0/estimation?srcChainId=${srcChainId}&srcChainTokenIn=${srcChainTokenIn}&srcChainTokenInAmount=${srcChainTokenInAmount}&slippage=1&dstChainId=${dstChainId}&dstChainTokenOut=${dstChainTokenOut}&executionFeeAmount=auto`;
      const res = await fetch(liveUrl);
      const data = await res.json();
      setEstimateSwapData(data);
      await getTransaction();
    };
    fetchSwapEstimation();
  }, []);

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
            <Select
              options={chainOptions}
              value={selectedFromToken}
              onChange={setSelectedFromToken}
            />
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedFromChain}
              onChange={setSelectedFromChain}
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
          />{" "}
          <div className="col">
            {" "}
            <label for="cars">Coin/Token</label>
            <Select
              options={chainOptions}
              value={selectedToToken}
              onChange={setSelectedToToken}
            />
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptions}
              value={selectedToChain}
              onChange={setSelectedToChain}
            />{" "}
          </div>
        </div>
      </div>{" "}
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
