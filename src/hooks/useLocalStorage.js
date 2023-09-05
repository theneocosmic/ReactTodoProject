import React from 'react';
const useLocalStorage = (itemName, initialValue)=>{
        const [item, setItem] = React.useState(initialValue);
        const [loading,setLoading] = React.useState(true);
        const [error,setError] = React.useState(false);
        
        React.useEffect(()=>{
          setTimeout(() => {
            try {
              const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;
            if (!localStorageItem){
              console.log("vacio");
              console.log(initialValue);
              localStorage.setItem(itemName, JSON.stringify(initialValue));
              parsedItem = initialValue;
            } else {
              console.log("contenido");
              parsedItem = JSON.parse(localStorageItem);
              setItem(parsedItem);
            }
  
            setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
              setError(error);
            }
          }, 3000);
        },[]);

        
      
        // const [item, setItem] = React.useState(parsedItem);
        
        const saveItem = (newItem) => {
            localStorage.setItem(itemName, JSON.stringify(newItem));
            setItem(newItem);
        };
        return {
          item,
          saveItem,
          loading,
          error
        };
      };

      export default useLocalStorage;