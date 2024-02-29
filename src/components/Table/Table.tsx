import { FC, useEffect, useState } from "react";
import { Iitems } from "../../types/itemTypes";
import "./Table.scss";

interface TableProps {
  products: Iitems[];
}

const Table: FC<TableProps> = ({ products }) => {
  const [uniqProducts, setUniqProducts] = useState<Iitems[]>();

  useEffect(() => {
    const uniqueIds = new Set();

    const unique = products.filter((el) => {
      const isDuplicate = uniqueIds.has(el.id);
      uniqueIds.add(el.id);
      if (!isDuplicate) {
        return true;
      }
      return false;
    });
    setUniqProducts(unique);
  }, [products]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="td-id">ID</th>
            <th className="td-product">Название</th>
            <th>Цена</th>
            <th>Бренд</th>
          </tr>
        </thead>
        <tbody>
          {uniqProducts?.map((item: Iitems) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product}</td>
                <td className="td-price">{item.price}</td>
                <td className="td-brand">{item.brand}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
