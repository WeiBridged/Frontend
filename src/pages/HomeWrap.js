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
    <>
      <div className="container-fluid m-0 py-2 bg-black align-middle text-center text-banner">
        <a href="/#/" className="text-white">
          Try out the WeiBridged platform today!
        </a>
      </div>
      <div className="container-fluid text-white text-center page-top bg-top-app-market">
        <div className="container">
          <h1 className="top-page col-12 offset-md-7 col-md-5">WeiBridged</h1>
        </div>
      </div>
      <div className="container-fluid text-white bg-sandstorm d-flex flex-column align-items-center p-3">
        <div className="container">
          <div className="cell-lg-full ingress-content">
            <h4>Connect. Bridge. Done.</h4>
            <p>
              WeiBridged is a secure and well-trusted bridge platform that will
              enable you to reach over 5 different chains in the crypto space.
              Using the WeiBridged is as easy as one two three!
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5 app-market">
        <div class="alert alert-secondary" role="alert">
          Here u can have a thing that Here u can have a thing that Here u can
          have a thing that Here u can have a thing that Here u can have a thing
          that Here u can have a thing that Here u can have a thing that Here u
          can have a thing that Here u can have a thing that
        </div>
        <div className="row">
          <div className="col">
            <article
              id="post-16170"
              className="clearfix post-16170 page type-page status-publish hentry"
              role="article"
            >
              <section className="post_content">
                <div className="vc_row wpb_row vc_row-fluid">
                  <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner">
                      <div className="wpb_wrapper">
                        <div className="wpb_text_column wpb_content_element ">
                          <div className="wpb_wrapper">
                            <h4 className="p1">
                              <span className="s1">Explore Chains</span>
                            </h4>
                            <p className="p2">
                              WeiBridged is a secure and well-trusted bridge
                              platform that will enable you to reach over 5
                              different chains in the crypto space. Using the
                              WeiBridged is as easy as one two three! WeiBridged
                              is a secure and well-trusted bridge platform that
                              will enable you to reach over 5 different chains
                              in the crypto space. Using the WeiBridged is as
                              easy as one two three!
                            </p>
                            <h4 className="p1">We got your back!</h4>
                            <p className="p1">
                              WeiBridged is a secure and well-trusted bridge
                              platform that will enable you to reach over 5
                              different chains in the crypto space. Using the
                              WeiBridged is as easy as one two three! WeiBridged
                              is a secure and well-trusted bridge platform that
                              will enable you to reach over 5 different chains
                              in the crypto space. Using the WeiBridged is as
                              easy as one two three! WeiBridged is a secure and
                              well-trusted bridge platform that will enable you
                              to reach over 5 different chains in the crypto
                              space. Using the WeiBridged is as easy as one two
                              three!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer>
                <p className="clearfix"></p>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
