import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import "./styles.scss";

export function PageLayout() {
  return (
    <>
      <Header />
      <div className="pageContainer">
        <Outlet />
      </div>
    </>
  );
}
