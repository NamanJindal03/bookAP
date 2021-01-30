import { openDB } from "idb";

export const idb = {
  db1: openDB("bookDB", 1)
};