import { FC } from "react";

interface BtnShowAllProps {
  showAllProducts: () => void;
}

const BtnShowAll: FC<BtnShowAllProps> = ({ showAllProducts }) => {
  return (
    <button className="btn-show-all" onClick={showAllProducts}>
      Показать все товары
    </button>
  );
};

export default BtnShowAll;
