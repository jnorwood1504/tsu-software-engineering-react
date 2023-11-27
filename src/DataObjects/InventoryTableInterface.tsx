import axios from "axios";

export interface InventoryTableRow {
    id: Number,
    InventoryName: String,
    InventoryAddress: String,
    InventoryCount: Number,
    InventoryMaxCount: Number,
    //InventoryColor: String
}

export interface InventoryTableJsonObject {
    id: Number,
    inventory_name: String,
    inventory_address: String,
    inventory_current_num: Number,
    inventory_max_num: Number
}

export async function getInventoryTable() {
    const response = await axios.get(
      'http://localhost:8040/inventory',
      {}
    );

    return response;
}
