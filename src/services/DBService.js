import { openDB } from 'idb';

// demo1: Getting started
const db = () => {
  openDB('bookDB', 1, {
    upgrade(db) {
      db.createObjectStore('books');
    },
  });
}
export default db;