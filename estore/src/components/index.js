import React from "react";
import { Route } from "react-router-dom";
import MainContainer from "./MainContainer";

const LandingPage = () => {
  return (
    <>
      <Route exact path="/" component={MainContainer} />
    </>
  );
};

export default LandingPage;
