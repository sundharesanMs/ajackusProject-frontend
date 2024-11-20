import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from "./components/Edit";

function App() {
  return (
    <div className="con-image ">
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<AddTask />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;