import React from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";
function CreateInventory() {
const navigate = useNavigate();
const goToInventory = () => navigate("/inventory");
  return (
    <div className="Login">
      <div className="LoginBox">
       <div className="LoginHeader">Add Inventory</div>
         <div className="inputs"/>
          <input className="inv #" placeholder="Inventory #"/>
           <input
            className="inventory"
            placeholder="Inventory Name"
            />
            <input className="inventory" 
            placeholder="Inventory Address"/>
            <input
            className="inventory"
            placeholder="Current Amount"
            />
            <input
            className="inventory"
            placeholder="Max Amount"
            />
        </div>
          <div style={{display:"flex", justifyContent:"left"}}>
            {/*<button className="submitbutton">Sign-Up</button>*/}
        <button onClick={goToInventory} className="submitbutton">Add</button>
          </div>
         </div>
        );
        }
  export default CreateInventory;
