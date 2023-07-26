import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import SearchResult from "./SearchResult";

function App() {
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
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route
            path="/searchResult"
            element={
              <>
                <Header />
                <SearchResult />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
