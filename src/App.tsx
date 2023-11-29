import "./App.css";
import Home from "./Views/Home";
import Inventory from "./Views/Inventory";
import Help from "./Views/Help";
import ResourceList from "./Views/ResourceList";
import AccessLogs from "./Views/AccessLogs";
import CreateAccount from "./Views/CreateAccount";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/">
            <Route index element={<Home/>}></Route>
            <Route path="inventory" element={<Inventory/>}></Route>
            <Route path="help" element={<Help/>}></Route>
            <Route path="resourcelist" element={<ResourceList/>}></Route>
            <Route path="accesslogs" element={<AccessLogs/>}></Route>
            <Route path="createaccount" element={<CreateAccount/>}></Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
