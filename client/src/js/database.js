import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// added logic to post to database
export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  console.log("content:", content);
  const request = store.add({ jate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// added getDb method to get all data
export const getDb = async () => {
  console.log('Get all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  let returnResult;
  try {
    returnResult = result[result.length - 1].jate;
  }
  catch {
    returnResult = null;
  }
  console.log('result.value', returnResult);
  return returnResult;
};

initdb();
