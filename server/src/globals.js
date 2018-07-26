import _DataManager from "./core/managers/DataManager";
import _GraphQLManager from "./core/managers/GraphQLManager";

export const DataManager = new _DataManager();
export const GraphQLManager = new _GraphQLManager();

module.exports = { DataManager, GraphQLManager };
