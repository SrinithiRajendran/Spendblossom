import "./index.css";
import { IoFlowerSharp, IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ walletBalance }) => {
  return (
    <nav className="bg-gradient-to-r font-mono from-[#020300] to-[#000000] p-4 items-center ">
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-[#d4f6cd] font-bold fontstyle flex items-center wallet-balance">
            <span className="text-[#f460a5] ">S</span>pend
            <span className="text-[#f460a5]">B</span>l
            <IoFlowerSharp className="text-sm mt-1 text-[#b32460]" />
            ss
            <IoFlowerSharp className="mt-1 text-sm text-[#b32460]" />m
          </h1>
        </Link>
        <div className="flex items-center">
          <IoWallet className="mr-2 text-[#ffffff] wallet-balance" />
          <h1 className="text-[#f122a5] font-bold mr-2 nav-balance ">
            Wallet Balance :{" "}
          </h1>
          <p className="font-bold text-[#6ede72] wallet-balance2">
            ₹ {walletBalance}
          </p>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  walletBalance: PropTypes.number.isRequired,
};
export default Navbar;
