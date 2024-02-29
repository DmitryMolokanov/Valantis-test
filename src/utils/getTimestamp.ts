import { MD5 } from "crypto-js";

export const getTimestamp = () => {
  const date = new Date();
  const password = "Valantis";
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day: string | number = date.getDate();
  if (day < 10) day = `0${day}`;

  const tamestamp = MD5(`${password}_${year}${month}${day}`).toString();
  return tamestamp;
};
