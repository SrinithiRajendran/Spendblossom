import Navbar from "../Navbar";
import MoneyForm from "../MoneyForm";
import Filters from "../Filters";
import PropTypes from "prop-types";

const Home = ({
  totalIncome,
  totalExpenses,
  walletBalance,
  onAddEntry,
  entries,
  onRemoveEntry,
  isPopupVisible,
  closeRemovePopup,
  handleRemoveEntry,
  entryToRemove,
}) => {
  return (
    <div>
      <Navbar walletBalance={walletBalance} />
      <div className="flex justify-between  font-mono p-5 totalfont">
        <div className="flex flex-col border-2 border-[#c1c0c0] rounded-[10px] p-4 w-[48%]">
          <h1 className="text-sm text-[#4f0438] mb-4 md:text-xl">
            Total Income
          </h1>
          <p className="font-bold text-xl md:text-3xl text-[green]">
            {totalIncome}
          </p>
        </div>
        <div className="flex flex-col border-2 border-[#c1c0c0] rounded-[10px] p-4 w-[48%]">
          <h1 className="text-[#4f0438] text-sm mb-4 md:text-xl">
            Total Expenses
          </h1>
          <p className="font-bold text-xl md:text-3xl text-[#cd0909]">
            {totalExpenses}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-between p-1">
        <MoneyForm onAddEntry={onAddEntry} />
        <div className="hidden md:block w-full md:w-[58%]">
          <Filters
            entries={entries}
            onRemoveEntry={onRemoveEntry}
            isPopupVisible={isPopupVisible}
            closeRemovePopup={closeRemovePopup}
            handleRemoveEntry={handleRemoveEntry}
            entryToRemove={entryToRemove}
          />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  entries: PropTypes.array.isRequired,
  onRemoveEntry: PropTypes.func.isRequired,
  walletBalance: PropTypes.number.isRequired,
  isPopupVisible: PropTypes.bool.isRequired,
  closeRemovePopup: PropTypes.func.isRequired,
  handleRemoveEntry: PropTypes.func.isRequired,
  entryToRemove: PropTypes.object,
  onAddEntry: PropTypes.func.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};
export default Home;
