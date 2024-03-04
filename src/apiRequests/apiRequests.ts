import { getTimestamp } from "../utils/getTimestamp";

export const getIds = async (offset: number, limit?: number) => {
  const url = "//api.valantis.store:40000/";
  const timestamp = getTimestamp();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": timestamp,
    },
    body: JSON.stringify({
      action: "get_ids",
      params: { offset, limit },
    }),
  });
  const result = await response.json();
  return result.result;
};

export const getItems = async (idsList: string[]) => {
  const url = "//api.valantis.store:40000/";
  const timestamp = getTimestamp();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": timestamp,
    },
    body: JSON.stringify({
      action: "get_items",
      params: { ids: idsList },
    }),
  });
  const result = await response.json();
  return result;
};

export const getFields = async (field: string) => {
  const url = "//api.valantis.store:40000/";
  const timestamp = getTimestamp();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": timestamp,
    },
    body: JSON.stringify({
      action: "get_fields",
      params: { field: field },
    }),
  });
  const result = await response.json();
  const uniqResult = [...new Set(result.result)] as string[];
  const sortUniqResult = uniqResult.sort((a: string, b: string) =>
    a > b ? 1 : -1
  );
  return sortUniqResult;
};

export const getFilteredItems = async (select: string, input: string) => {
  const url = "//api.valantis.store:40000/";
  const timestamp = getTimestamp();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": timestamp,
    },
    body: JSON.stringify({
      action: "filter",
      params: { [select]: input },
    }),
  });
  const result = await response.json();
  return result;
};
