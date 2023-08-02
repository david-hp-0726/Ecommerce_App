import "./App.css";
import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import SearchResult from "./pages/SearchResult";
import Orders from "./pages/Orders";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import Login from "./pages/Login";
import { db, auth } from "./firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";

function App() {
  const [{ user, orders }, dispatch] = useStateValue();
  // Set User
  useEffect(() => {
    // will only run once when the app component loads...
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({ type: "SET_WARNING_DISPLAY_TRUE" });
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Set Basket
  useEffect(() => {
    console.log(user);
    const basketRef = doc(db, "basket", user ? user.uid : "20040726");
    const unsubscribe = onSnapshot(basketRef, (querySnapshot) => {
      const basketItems = [];
      const queryResult = querySnapshot.data();
      if (queryResult) {
        queryResult.items.forEach((item) => {
          basketItems.push(item);
        });
      }
      dispatch({
        type: "SET_BASKET",
        basket: basketItems,
      });
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  // Set Orders
  useEffect(() => {
    const ordersRef = doc(db, "orders", user ? user.uid : "20040726");
    const unsubscribe = onSnapshot(ordersRef, (querySnapshot) => {
      const queryResult = querySnapshot.data();
      let allOrders = [];
      if (queryResult) {
        allOrders = queryResult.allOrders;
      }
      dispatch({
        type: "SET_ORDERS",
        orders: allOrders,
      });
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/searchResult"
            element={
              <>
                <Header />
                <SearchResult />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/purchaseSuccess"
            element={
              <>
                <Header />
                <PurchaseSuccess />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
