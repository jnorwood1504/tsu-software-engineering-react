"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("../App.css");
const ResourceTableInterface_1 = require("../DataObjects/ResourceTableInterface");
const ResourceTableConstants_1 = require("../DataConstants/ResourceTableConstants");
const clientDb_json_1 = __importDefault(require("../DataConstants/clientDb.json"));
const data = clientDb_json_1.default;
function Main() {
    const [tableData, setTableData] = (0, react_1.useState)([ResourceTableConstants_1.INIT_RESULT_RESOURCE_DATA]);
    const [modalResourceData, setmodalResourceData] = (0, react_1.useState)(ResourceTableConstants_1.INIT_RESULT_RESOURCE_DATA);
    const [isModalActive, setIsModalActive] = (0, react_1.useState)(false);
    //A function that supports the creation of the resource table.
    function setResourceTable() {
        try {
            (0, ResourceTableInterface_1.getResourceTable)().then(function (response) {
                let resourceTableArray = [];
                //Define the output of my objects to the array.
                response.data.forEach((element) => {
                    resourceTableArray.push({
                        id: (element.id ? element.id : null),
                        Resources: (element.resources ? element.resources : ""),
                        ResourcesName: (element.resources_name ? element.resources_name : ""),
                        ResourcesAddress: (element.resources_address ? element.resources_address : null),
                        ResourcesCurrentNum: (element.resources_current_num ? element.resources_current_num : null),
                        ResourceMaxNum: (element.resource_max_num ? element.resource_max_num : null)
                    });
                });
                //Overwrite the table data.
                setTableData(resourceTableArray);
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
        let resourceRow = tableData.at(key);
        setmodalResourceData(resourceRow);
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
            <p className="modal-card-title">Resource Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Resource ID #: 2</label>
              <p className="mb-3">{(modalResourceData.id ? modalResourceData.id.toString() : "")}</p>
              {modalResourceData.Resources &&
                <>
                  <label className="has-text-weight-medium">Resource Name: 14z</label>
                  <p>{(modalResourceData.Resources ? modalResourceData.Resources : "")}</p>
                </>}
            </div>
            <div className="column">
              {modalResourceData.ResourcesName &&
                <>
                  <label className="has-text-weight-medium">Current Number of Resources: 30</label>
                  <p className="mb-3">{(modalResourceData.ResourcesName ? modalResourceData.ResourcesName : "")}</p>
                </>}
              {modalResourceData.ResourcesCurrentNum &&
                <>
                  <label className="has-text-weight-medium">Max Number of Resources: 31</label>
                  <p className="mb-3">{(modalResourceData.ResourcesCurrentNum ? modalResourceData.ResourcesCurrentNum.toString() : "")}</p>
                </>}
              {modalResourceData.ResourceMaxNum &&
                <>
                  <label className="has-text-weight-medium">Max Number of Resources: </label>
                  <p>{(modalResourceData.ResourceMaxNum ? modalResourceData.ResourceMaxNum.toString() : "")}</p>
                </>}
            </div>
          </section>
        </div>
      </div>);
    };
    //The useEffect is a function that runs whenever the set data changes or when loading the page.
    (0, react_1.useEffect)(() => {
        setResourceTable();
    }, []);
    return (<>
      <h2 className="is-size-2 pb-6 has-text-weight-medium bg-black"> Resource List</h2>
      <div className="box columns is-centered is-radiusless">
        <div className="column is-12 px-0 py-0">
            <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Resource Status</th>
                    <th>Resource Name</th>
                    <th>Resource Address</th>
                    <th>Current Number of Resources</th>
                    <th>Max Number of Resources</th>
                    <th><div className="container is-fluid mt-5">
    {/*                     <progress className="progress is-link" value="20" max="100">60%</progress> */}
          </div></th>
                  </tr>
                </thead>
                <tbody>
    {/*                   {tableData.map((row:any, i:number) => */}
                  {data.resources.map((row, i) => <tr id={(row.id ? row.id.toString() : "")}>
                      <td>{(row.id ? row.id.toString() : "")}</td>
                      {(() => {
                let myval = (row.resources_current_num / row.resources_max_num) * 100;
                console.log(myval);
                if (myval <= 10) {
                    return (<td><progress className="progress is-danger" value={(row.resources_current_num / row.resources_max_num) * 100} max="100" color="red"></progress></td>);
                }
                else if (myval > 10 && myval < 39) {
                    return (
                    //                                     <td className= "bgfill">{<FontAwesomeIcon icon={faFaceSurprise} className= "c"/>}</td>
                    <td><progress className="progress is-link" value={(row.resources_current_num / row.resources_max_num) * 100} max="100" color="red"></progress></td>);
                }
                else if (myval > 39 && myval < 69) {
                    return (
                    //                                 <td className= "bgfill">{<FontAwesomeIcon icon={faFaceSurprise} className= "c"/>}</td>
                    <td><progress className="progress is-warning" value={(row.resources_current_num / row.resources_max_num) * 100} max="100" color="red"></progress></td>);
                }
                else if (myval > 69 && myval <= 100) {
                    return (
                    //                                     <td className= "bgfill">{<FontAwesomeIcon icon={faFaceSurprise} className= "c"/>}</td>
                    <td><progress className="progress is-success is-dark" value={(row.resources_current_num / row.resources_max_num) * 100} max="100" color="red"></progress></td>);
                }
            })()}
        {/*                       <td><progress className="progress is-info" value={(row.resources_current_num/row.resources_max_num)*100} max="100"></progress></td> */}
        {/*                       <td><progress className="progress is-info" value={(row.resources_current_num/row.resources_max_num)*100} max="100" color="green"></progress></td> */}
                      <td>{(row.resources_name ? row.resources_name : "")}</td>
                      <td>{(row.resources_address ? row.resources_address : "")}</td>
                      <td>{(row.resources_current_num ? row.resources_current_num.toString() : "")}</td>
                      <td>{(row.resources_max_num ? row.resources_max_num.toString() : "")}</td>
                       <td><button className="button is-small is-info" onClick={() => showModal(i)}>View Resource Details</button></td>
                    </tr>)}
                </tbody>
            </table>
            <Modal closeModal={toggleModal} modalState={isModalActive.valueOf()}/>
        </div>
      </div>
    </>);
}
exports.default = Main;
