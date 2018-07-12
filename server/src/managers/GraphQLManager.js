import GraphQLToolsSequelize from "graphql-tools-sequelize";

class GraphQLManager {
	initialize = async (dataManager) => {
		this._dataManager = dataManager;
		this._gts = new GraphQLToolsSequelize(dataManager);
		await this._gts.boot();

		this._schema = `
		schema {
			query: Root
			mutation: Root
		}
		type Root {
			${ this._gts.entityQuerySchema("Root", "", "Ticket" )}
			${ this._gts.entityQuerySchema("Root", "", "User" )}
		}
`;
	}

	getSchema = () => this._schema;
}

export default GraphQLManager;
