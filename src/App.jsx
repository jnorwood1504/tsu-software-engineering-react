"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const Home_1 = __importDefault(require("./Views/Home"));
const Inventory_1 = __importDefault(require("./Views/Inventory"));
const profile_1 = __importDefault(require("./Views/profile"));
const Help_1 = __importDefault(require("./Views/Help"));
const ResourceList_1 = __importDefault(require("./Views/ResourceList"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/">
            <react_router_dom_1.Route index element={<Home_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="inventory" element={<Inventory_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="home" element={<Home_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="help" element={<Help_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="resourcelist" element={<ResourceList_1.default />}></react_router_dom_1.Route>
          </react_router_dom_1.Route>
        </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
