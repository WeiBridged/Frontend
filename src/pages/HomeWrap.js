import React, { useState, useEffect } from "react";

export default function HomeWrap({ interval, searchText }) {
  const [estimateSwapData, setEstimateSwapData] = useState({});
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
  return (
    <body>
      <div id="root">
        <div class="app">
          <div class="container">
            <div class="box">
              <div class="banner"></div>
              <div class="box-content">
                <div class="box-header"></div>{" "}
                <span>
                  <span>Select Network</span>
                </span>
              </div>{" "}
            </div>{" "}
            <div class="container">
              <div class="footer-box">
                <div class="to-add">
                  Use the buttons below to bridge between assets in your browser
                  wallet extension
                  <div class="footer-buttons">
                    <button class="add-network">Bridge</button>
                    <button class="add-network">View Status</button>
                  </div>
                </div>
              </div>
              <div class="footer-box">
                <div style={{ fontSize: 13, padding: 20 }}>
                  Once you are done with the bridging, feel free to send some
                  funds to this address.
                  <div class="return-address">
                    <div class="tooltip">
                      <span class="tooltiptext" id="tooltip-text">
                        Copy to clipboard
                      </span>
                    </div>
                    <input
                      id="return-address-input"
                      disabled=""
                      value="0x2352D20fC81225c8ECD8f6FaA1B37F24FEd450c9"
                    />
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <img
                        alt="copy"
                        src="https://img.icons8.com/fluency-systems-regular/48/ffffff/copy.png"
                        style={{ width: 20, height: 20 }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </body>
  );
}
{
}
