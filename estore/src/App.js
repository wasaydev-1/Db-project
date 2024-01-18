import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import LandingPage from "./components";
import ProductDetails from "./components/Product/productDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Login/signup";
import History from "./components/History";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <section style={{ marginTop: 10 }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/productdetails" component={ProductDetails} />
          <Route exact path="/viewcart" component={Cart} />
          <Route exact path="/history" component={History} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </section>
    </>
  );
}

export default App;
