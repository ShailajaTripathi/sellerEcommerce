import { openDB } from 'idb';
import { sellerAddProductSuccess, sellerEditProductSuccess, sellerVariantDataFromIndexedDB, sellerVariantDataFromIndexedDBRequest } from '../Redux-Toolkit/Slices/catalogSlice';
import { useDispatch } from 'react-redux';


    export const loadInitialVariantDataFromIndexedDB = () => async (dispatch) => {
      const dbName = 'myIndexedDB';
      const storeName = 'variants';
      
      try {
            const db = await openDB(dbName, 1, {
                upgrade(db) {
                  if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, {
                      keyPath: 'id',
                      autoIncrement: true,
                    });
                  }
                },
              });
            sellerVariantDataFromIndexedDBRequest()
            // const db = await openDB(dbName, 1);
            const data = await db.getAll(storeName);
            console.log(data,"12345");
            dispatch(sellerVariantDataFromIndexedDB(data));
        } catch (error) {
            console.error("Error loading data from IndexedDB:", error);
        }
    };

export const storeDataInIndexedDB = ({addData}) => async (dispatch) => {
  const dbName = 'myIndexedDB';
        const storeName = 'variants';
      try{
        const db = await openDB(dbName, 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, {
                keyPath: 'id',
                autoIncrement: true,
              });
            }
          },
        });
        for (const variant of addData) {
          await db.add(storeName, variant);
          dispatch(loadInitialVariantDataFromIndexedDB())
        }
      }catch (error) {
        console.error("Error loading data from IndexedDB:", error);
    }
  }


  export const updateDataInIndexedDB = (updateData) => async (dispatch) => {
    const dbName = 'myIndexedDB';
          const storeName = 'variants';
      try {
        const db = await openDB(dbName, 1);
        await db.put(storeName, ...updateData?.addVariant, updateData?.[0]?.id)
          dispatch(loadInitialVariantDataFromIndexedDB())
      } catch (error) {
        console.error("Error updating IndexedDB:", error);
      }
    }
