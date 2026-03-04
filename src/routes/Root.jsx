import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Loader from "../components/shared/Loader";

const Root = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar />
      {navigation.state === "loading" && <Loader />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
