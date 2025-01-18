import React, { lazy, Suspense } from "react";
import "./App.scss";

const Header = lazy(() => import("HomeApp/Header"));
// import Footer from "./Footer";

function App() {
  return (
    <div className="main">
      <Suspense fallback={<div>loading header...</div>}>
        <Header subtitle="for main" bgColor="grey" />
      </Suspense>
      <div className="mainContent">Ini main nya loh</div>
    </div>
  );
}

export default App;
