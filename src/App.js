import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
         <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
