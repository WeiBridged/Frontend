import React, { useState, useEffect } from "react";
import Select from "react-select";
import { chainOptionsGoerliOptimism, chainOptionsOwner } from "../chainOptions";
export default function Owner({
  selectedWithdrawal,
  setSelectedWithdrawal,
  selectedAddLiquidityChain,
  setSelectedAddLiquidityChain,
  clickAddLiqudity,
  handleWithdrawClick,
}) {
  const [estimateSwapData, setEstimateSwapData] = useState({});
  const [getTransactionData, setGetTransactionData] = useState({});

  return (
    <>
      <div class="alert alert-secondary" role="alert">
        <div className="row p-1">
          <h3>Owner</h3>
        </div>{" "}
        <div className="row p-1">
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
            <Select
              options={chainOptionsGoerliOptimism}
              value={selectedAddLiquidityChain}
              onChange={setSelectedAddLiquidityChain}
            />
          </div>
          <label>Add Liqudity Amount</label>

          <div className="col">
            {" "}
            <button
              onClick={() => clickAddLiqudity()}
              className="btn"
              style={{
                width: "100%",
                backgroundColor: "cadetblue",
                marginBottom: 30,
              }}
            >
              Add Bridge Liquidity ETH
            </button>
          </div>
        </div>
        <div className="row p-1"></div>
        <div
          style={{
            marginTop: 15,
          }}
          className="row p-1"
        ></div>
        <div className="row p-1">
          <div className="col">
            {" "}
            <label for="cars"> Withdraw</label>
            <Select
              options={chainOptionsOwner}
              value={selectedWithdrawal}
              onChange={setSelectedWithdrawal}
            />
          </div>
          <button
            style={{
              width: "100%",
              backgroundColor: "cadetblue",
              marginTop: 30,
            }}
            onClick={handleWithdrawClick}
            className="btn"
          >
            Withdraw
          </button>
        </div>
      </div>
      <div class="alert alert-sand" role="alert">
        <label for="cars">
          {" "}
          Send MATIC to this address [for Mumbai to Goerli bridge]
        </label>
        <a
          style={{
            width: "30%",
            backgroundColor: "cadetblue",
            marginLeft: "15%",
          }}
          href=" https://goerli.etherscan.io/address/0x420E50B601E92933638b29DD273d8b692CdB3a9D"
          class="btn"
        >
          0x420...3a9D
        </a>
      </div>
      <div class="alert alert-sand" role="alert">
        <label for="cars">
          {" "}
          Send WETH to this address [for Goerli to Mumbai bridge]
        </label>
        <a
          style={{
            width: "30%",
            backgroundColor: "cadetblue",
            marginLeft: "15%",
          }}
          href="https://goerli.etherscan.io/address/0x5BFef6EA00a2B15c97Ddd68b76F03200a010e627"
          class="btn"
        >
          0x5BF...e627
        </a>
      </div>
    </>
  );
}
