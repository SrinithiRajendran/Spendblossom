import Navbar from "../Navbar";
import Filters from "../Filters";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoMdArrowRoundBack } from "react-icons/io";
const Entries = ({
  entries,
  onRemoveEntry,
  walletBalance,
  isPopupVisible,
  closeRemovePopup,
  handleRemoveEntry,
  entryToRemove,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar walletBalance={walletBalance} />
      <div className="py-2 font-mono">
        <div className="mb-8">
          <div className="absolute left-4">
            <IoMdArrowRoundBack
              className="text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
        <Filters
          entries={entries}
          onRemoveEntry={onRemoveEntry}
          isPopupVisible={isPopupVisible}
          closeRemovePopup={closeRemovePopup}
          handleRemoveEntry={handleRemoveEntry}
          entryToRemove={entryToRemove}
        />
      </div>
    </>
  );
};

Entries.propTypes = {
  entries: PropTypes.array.isRequired,
  onRemoveEntry: PropTypes.func.isRequired,
  walletBalance: PropTypes.number.isRequired,
  isPopupVisible: PropTypes.bool.isRequired,
  closeRemovePopup: PropTypes.func.isRequired,
  handleRemoveEntry: PropTypes.func.isRequired,
  entryToRemove: PropTypes.object,
};

export default Entries;
