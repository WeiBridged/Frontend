import { NavLink } from "react-router-dom";

const Navbar = ({
  handleConnectMetamask,
  connectedAddrValue,
  userAccountAddress,
}) => {
  console.log(connectedAddrValue, "user", userAccountAddress);
  return (
    <div className="container-fluid m-0 py-2 bg-black align-middle text-center text-banner">
      <a href="/#/" className="text-white hov">
        Home
      </a>
      <a href="/#/chainlink" className="text-white hov">
        Mock Chainlink Keepers Bridge
      </a>
      <a href="/#/debridge" className="text-white hov">
        deBridge
      </a>
      <a href="/#/weibridged" className="text-white hov">
        WeiBridged
      </a>
      <a href="/#/gaslesslimitorders" className="text-white hov">
        Gasless Limit Order
      </a>
    </div>
  );
};

export default Navbar;
