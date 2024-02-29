import { ChangeEvent, FC } from "react";

interface SelectProps {
  select: string;
  selectHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const Select: FC<SelectProps> = ({ select, selectHandler }) => {
  return (
    <div className="select-container">
      <label>Категория:</label>
      <select
        value={select}
        onChange={(e) => selectHandler(e)}
        className="select"
      >
        <option value="product">Название товара</option>
        <option value="price">Цена</option>
        <option value="brand">Бренд</option>
      </select>
    </div>
  );
};

export default Select;
