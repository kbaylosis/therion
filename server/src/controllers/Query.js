import casual from "casual";

import books from "../mocks/Books.json";

class Query {
	books = () => books
	book = () => ({
		title: casual.title,
		content: casual.sentence,
		author: {
			firstname: "Test",
			lastname: "Okay",
		},
	})
}

export default Query;
