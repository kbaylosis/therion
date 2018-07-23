import DataMgr from "./core/managers/DataManager";
import GraphQLMgr from "./core/managers/GraphQLManager";

export const DataManager = new DataMgr();
export const GraphQLManager = new GraphQLMgr();

module.exports = { DataManager, GraphQLManager };
