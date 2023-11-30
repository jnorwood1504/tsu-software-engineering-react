"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
require("../App.css");
require("./Inventory.css");
const InventoryTableInterface_1 = require("../DataObjects/InventoryTableInterface");
const InventoryTableConstants_1 = require("../DataConstants/InventoryTableConstants");
require("bulma/css/bulma.min.css");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const clientDb_json_1 = __importDefault(require("../DataConstants/clientDb.json"));
const data = clientDb_json_1.default;
function Main() {
    const [tableData, setTableData] = (0, react_1.useState)([InventoryTableConstants_1.INIT_INVENTORY_RESULT_DATA]);
    const [modalInventoryData, setmodalInventoryData] = (0, react_1.useState)(InventoryTableConstants_1.INIT_INVENTORY_RESULT_DATA);
    const [isModalActive, setIsModalActive] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const goToResources = () => navigate("/resourcelist");
    //A function that supports the creation of the inventory table.
    function setInventoryTable() {
        try {
            (0, InventoryTableInterface_1.getInventoryTable)().then(function (response) {
                let inventoryTableArray = [];
                //Define the output of my objects to the array.
                response.data.forEach((element) => {
                    inventoryTableArray.push({
                        id: (element.id ? element.id : null),
                        InventoryName: (element.inventory_name ? element.inventory_name : ""),
                        InventoryAddress: (element.inventory_address ? element.inventory_address : ""),
                        InventoryCount: (element.inventory_current_num ? element.inventory_current_num : null),
                        InventoryMaxCount: (element.inventory_max_num ? element.inventory_max_num : null),
                    });
                });
                //Overwrite the table data.
                setTableData(inventoryTableArray);
            }, (error) => {
                console.log(error);
            });
        }
        catch (_a) { }
    }
    function toggleModal() {
        setIsModalActive(!isModalActive);
    }
    function showModal(key) {
        let inventoryRow = tableData.at(key);
        setmodalInventoryData(inventoryRow);
        toggleModal();
    }
    const Modal = ({ closeModal, modalState }) => {
        if (!modalState) {
            return null;
        }
        return (<div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <div className="modal-card-head is-radiusless">
            <p className="modal-card-title">Inventory Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalInventoryData.id ? modalInventoryData.id.toString() : "")}</p>
              {modalInventoryData.InventoryName &&
                <>
                  <label className="has-text-weight-medium">Inventory Name: </label>
                  <p>{(modalInventoryData.InventoryName ? modalInventoryData.InventoryName : "")}</p>
                </>}
            </div>
            <div className="column">
              {modalInventoryData.InventoryAddress &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalInventoryData.InventoryAddress ? modalInventoryData.InventoryAddress : "")}</p>
                </>}
              {modalInventoryData.InventoryCount &&
                <>
                  <label className="has-text-weight-medium">Number of Inventories: </label>
                  <p className="mb-3">{(modalInventoryData.InventoryCount ? modalInventoryData.InventoryCount.toString() : "")}</p>
                </>}
              {modalInventoryData.InventoryMaxCount &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalInventoryData.InventoryMaxCount ? modalInventoryData.InventoryMaxCount.toString() : "")}</p>
                </>}
            </div>
          </section>
        </div>
      </div>);
    };
    //The useEffect is a function that runs whenever the set data changes or when loading the page.
    (0, react_1.useEffect)(() => {
        setInventoryTable();
    }, []);
    return (<>
      <h1 className="is-size-3 pb-5 bg-black">Amazon Homepage</h1>
      <div className="box columns is-centered is-radiusless">
        <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
    {/*                     <th><FontAwesomeIcon icon={faCoffee}/></th> */}
    {/*                     <th><FontAwesomeIcon icon={faFaceSmile} color="orange"/></th> */}
                    <th>#</th>
                    <th>Inventory Name</th>
                    <th>Inventory Address</th>
                    <th>Current Resources #</th>
                    <th>Max Resources #</th>
                    <th>Inventory Status</th>
                  </tr>
                </thead>

                <tbody>
    {/*                   {tableData.map((row:any, i:number) => */}
    {/*                   Icon icon1 = <FontAwesomeIcon icon={faFaceSmile} className= "a"/> */}
    {/*                   Icon icon2 = faFaceSmile; */}
                  {data.inventory.map((row, i) => <tr id={(row.id ? row.id.toString() : "")}>
                      <td>{(row.id ? row.id.toString() : "")}</td>
                      <td className="red">{(row.inventory_name ? row.inventory_name : "")}</td>
                      <td className="bgfillred">{(row.inventory_address ? row.inventory_address : "")}</td>
                      <td className="bgfill">{(row.inventory_current_num ? row.inventory_current_num.toString() : "")}</td>
                      <td className="bgfill">{(row.inventory_max_num ? row.inventory_max_num.toString() : "")}</td>
                       {(() => {
                let myval = (row.inventory_current_num / row.inventory_max_num) * 100;
                console.log(myval);
                if (myval <= 10) {
                    return (<td className="a">{<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faFaceFrown}/>}</td>);
                }
                else if (myval > 10 && myval < 39) {
                    return (<td>{<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faFaceMeh} className="b"/>}</td>);
                }
                else if (myval > 39 && myval < 69) {
                    return (<td>{<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faFaceSurprise} className="c"/>}</td>);
                }
                else if (myval > 69 && myval < 100) {
                    return (<td>{<react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faFaceSmile} className="d"/>}</td>);
                }
            })()}
                      <td className="red"><button className="button is-dark is-info" onClick={goToResources /*() => showModal(i)*/}>View Resource List</button></td>
        {/*}                       <td className= "bgfill"><button className="button is-dark" onClick={() => showModal(i)}>Edit Client Details</button></td>*/}
                    </tr>)}
                </tbody>
            </table>
            <Modal closeModal={toggleModal} modalState={isModalActive.valueOf()}/>
        </div>
      </div>
    </>);
}
exports.default = Main;
