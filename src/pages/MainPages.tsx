import { useEffect, useState, useCallback } from "react";
import { getIds } from "../apiRequests/apiRequests";
import { getItems } from "../apiRequests/apiRequests";
import { Iitems } from "../types/itemTypes";
import Header from "../components/Header/Header";
import Table from "../components/Table/Table";
import { Pagination } from "@mui/material";
import Loader from "../components/UI/Loader";
import Filter from "../components/Filter/Filter";
import Footer from "../components/UI/Footer";
import BtnShowAll from "../components/UI/BtnShowAll";

const MainPages = () => {
  const [products, setProducts] = useState<Iitems[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [pagesQty, setPagesQty] = useState<number>(1);
  const [loader, setLoader] = useState(true);

  const allProducts = useCallback(async () => {
    try {
      const result = await getIds(0);
      const producsQty = Math.floor(result.length / 50);
      setPagesQty(producsQty);
    } catch (err) {
      console.log(err);
      allProducts();
    }
  }, []);

  const getProductsId = useCallback(async () => {
    try {
      const result = await getIds(offset, 50);
      return result;
    } catch (e) {
      console.log(e);
      getProductsId();
    }
  }, [offset]);

  const getProductItems = useCallback(async () => {
    try {
      const result = await getProductsId();
      const products = await getItems(result);
      if (products.result) setLoader(false);
      setProducts(products.result);
    } catch (err) {
      console.log(err);
      getProductItems();
    }
  }, [getProductsId]);

  const turnPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoader(true);
    if (value === 1) setOffset(0);
    if (value === 2) setOffset(50);
    if (value > 2) setOffset((value - 1) * 50);
  };

  const showAllProducts = () => {
    setOffset(0);
    setLoader(true);
    allProducts();
    getProductItems();
  };

  useEffect(() => {
    allProducts();
    getProductItems();
  }, [getProductItems, allProducts]);

  return (
    <div>
      <Header />
      <BtnShowAll showAllProducts={showAllProducts} />
      <div className="main-container">
        <div className="wrapper">
          <Filter
            setProducts={setProducts}
            setPagesQty={setPagesQty}
            setLoader={setLoader}
          />
          {!loader ? <Table products={products} /> : <Loader />}
        </div>
        {pagesQty > 1 ? (
          <Pagination
            count={pagesQty}
            onChange={turnPage}
            className="pagination"
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default MainPages;
