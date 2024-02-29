import React, { useEffect, useState, FC } from "react";
import { getFields } from "../../apiRequests/apiRequests";
import { getFilteredItems } from "../../apiRequests/apiRequests";
import { getItems } from "../../apiRequests/apiRequests";
import Input from "./Input";
import { Iitems } from "../../types/itemTypes";
import "./Filter.scss";
import Select from "./Select";

interface FilterProps {
  setProducts: (arr: Iitems[]) => void;
  setPagesQty: (el: number) => void;
  setLoader: (el: boolean) => void;
}

const Filter: FC<FilterProps> = ({ setProducts, setPagesQty, setLoader }) => {
  const [select, setSelect] = useState<string>("product");
  const [input, setInput] = useState<string>("");
  const [uniqFields, setUniqFields] = useState<string[]>([]);

  const selectHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    setInput("");
  };

  const filterProducts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const filteredIds = await getFilteredItems(select, input);
      const filteredItems = await getItems(filteredIds.result);
      if (filteredItems.result) setLoader(false);
      setPagesQty(1);
      setProducts(filteredItems.result);
    } catch (err) {
      console.log(err);
      filterProducts(e);
    } finally {
      setInput("");
    }
  };

  useEffect(() => {
    const getPossibleValues = async () => {
      try {
        const possibleValues = await getFields(select);
        setUniqFields(possibleValues);
      } catch (err) {
        console.log(err);
        getPossibleValues();
      }
    };
    getPossibleValues();
  }, [select]);

  return (
    <div className="form-container">
      <form onSubmit={filterProducts}>
        <Select select={select} selectHandler={selectHandler} />
        <Input input={input} setInput={setInput} uniqFields={uniqFields} />
        <button className="send-form-btn">Применить</button>
      </form>
    </div>
  );
};

export default Filter;
