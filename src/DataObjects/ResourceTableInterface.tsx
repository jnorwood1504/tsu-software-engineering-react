import axios from "axios";

export interface ResourceTableRow {
        id: Number,
        Resources: String,
        ResourcesName: String,
        ResourcesAddress: Number,
        ResourcesCurrentNum: Number,
        ResourceMaxNum: Number
    }


    export interface ResourceTableJsonObject {
        id: -1,
        resources: " ",
        resources_name: " ",
        resources_address: 1,
        resources_current_num: 1,
        resource_max_num: 1
    }


    export async function getResourceTable() {
        const response = await axios.get(
          'http://localhost:8040/resources',
          {}
        );

        return response;
    }
