import React from 'react';
const useLocalStorage = (itemName, initialValue)=>{
        console.log("initialvalue: "+initialValue);
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
      
        if (!localStorageItem){
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          console.log("contenido");
          parsedItem = JSON.parse(localStorageItem);
        }
      
        const [item, setItem] = React.useState(parsedItem);
        
        const saveItem = (newItem) => {
            localStorage.setItem(itemName, JSON.stringify(newItem));
            setItem(newItem);
        };
        return [item,saveItem];
      };

      export default useLocalStorage;