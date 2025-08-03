import React, { useState,useEffect } from "react";
import axios from 'axios';

import BuyActionWindow from "./BuyActionWindow";

const api = axios.create({ baseURL: 'http://localhost:3002' });

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
});


// handles opening and closing of window
export const GeneralContextProvider = (props) => {

  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

const [holdings, setHoldings] = useState([]);
 const fetchHoldings = async () => {
    console.log("Fetching holdings...");
    const { data } = await api.get("/allHoldings");
    setHoldings(data);
  };
   useEffect(() => {
    fetchHoldings();
  }, []);

  const handleOpenBuyWindow = (uid) => {
      console.log("2. openBuyWindow called in Context. Setting state to true.");
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        holdings,        
        fetchHoldings, 
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;