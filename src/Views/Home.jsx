"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("../App.css");
const ClientTableInterface_1 = require("../DataObjects/ClientTableInterface");
const ClientTableConstants_1 = require("../DataConstants/ClientTableConstants");
function Main() {
    const [tableData, setTableData] = (0, react_1.useState)([ClientTableConstants_1.INIT_RESULT_DATA]);
    const [modalClientData, setmodalClientData] = (0, react_1.useState)(ClientTableConstants_1.INIT_RESULT_DATA);
    const [isModalActive, setIsModalActive] = (0, react_1.useState)(false);
    //A function that supports the creation of the client table.
    function setClientTable() {
        try {
            (0, ClientTableInterface_1.getClientTable)().then(function (response) {
                let clientTableArray = [];
                //Define the output of my objects to the array.
                response.data.forEach((element) => {
                    clientTableArray.push({
                        id: (element.id ? element.id : null),
                        ClientName: (element.client_name ? element.client_name : ""),
                        AddressState: (element.state ? element.state : ""),
                        InventoryCount: (element.num_of_inventories ? element.num_of_inventories : null),
                        ContactCount: (element.num_of_contacts ? element.num_of_contacts : null)
                    });
                });
                //Overwrite the table data.
                setTableData(clientTableArray);
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
        let clientRow = tableData.at(key);
        setmodalClientData(clientRow);
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
            <p className="modal-card-title">Client Information</p>
            <button className="delete is-pulled-right" aria-label="close" onClick={closeModal}></button>
          </div>
          <section className="modal-card-body columns">
            <div className="column">
              <label className="has-text-weight-medium">Number: </label>
              <p className="mb-3">{(modalClientData.id ? modalClientData.id.toString() : "")}</p>
              {modalClientData.ClientName &&
                <>
                  <label className="has-text-weight-medium">Client Name: </label>
                  <p>{(modalClientData.ClientName ? modalClientData.ClientName : "")}</p>
                </>}
            </div>
            <div className="column">
              {modalClientData.AddressState &&
                <>
                  <label className="has-text-weight-medium">State: </label>
                  <p className="mb-3">{(modalClientData.AddressState ? modalClientData.AddressState : "")}</p>
                </>}
              {modalClientData.InventoryCount &&
                <>
                  <label className="has-text-weight-medium">Number of Inventories: </label>
                  <p className="mb-3">{(modalClientData.InventoryCount ? modalClientData.InventoryCount.toString() : "")}</p>
                </>}
              {modalClientData.ContactCount &&
                <>
                  <label className="has-text-weight-medium">Number of Contacts: </label>
                  <p>{(modalClientData.ContactCount ? modalClientData.ContactCount.toString() : "")}</p>
                </>}
            </div>
          </section>
        </div>
      </div>);
    };
    //The useEffect is a function that runs whenever the set data changes or when loading the page.
    (0, react_1.useEffect)(() => {
        setClientTable();
    }, []);
    return (<>
      <h2 className="is-size-2 pb-6 has-text-weight-medium">Client List</h2>
      <td><button className="button is-dark" onClick={() => showModal}>Add Client</button></td>
      <div className="box columns is-centered is-radiusless">
        <div className="column is-12 px-0 py-0"> 
            <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client Name</th>
                    <th>State</th>
                    <th>Number of Inventories</th>
                    <th>Number of Contacts</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => <tr id={(row.id ? row.id.toString() : "")}>
                      <td>{(row.id ? row.id.toString() : "")}</td>
                      <td>{(row.ClientName ? row.ClientName : "")}</td>
                      <td>{(row.AddressState ? row.AddressState : "")}</td>
                      <td>{(row.InventoryCount ? row.InventoryCount.toString() : "")}</td>
                      <td>{(row.ContactCount ? row.ContactCount.toString() : "")}</td>
                      <td><button className="button is-dark" onClick={() => showModal(i)}>Observe Client Details</button></td>
                    </tr>)}
                  {tableData.map((row, i) => <td><button className="button is-dark" onClick={() => showModal(i)}>Add Client</button></td>)}
                </tbody>
            </table>
            <Modal closeModal={toggleModal} modalState={isModalActive.valueOf()}/>
        </div>
      </div>
    </>);
}
exports.default = Main;
