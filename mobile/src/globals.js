import _ApiFactory from "__src/commons/core/managers/ApiFactory";
import _RequestManager from "__src/managers/RequestManager";
import * as modelDefs from "__src/commons/models";

export const ApiFactory = new _ApiFactory(modelDefs);
export const RequestManager = new _RequestManager();
