import casual from "casual";

import books from "../mocks/Books.json";

const Query = {
	books: () => books,
	book: () => ({
		title: casual.title,
		content: casual.sentence,
		author: {
			fullname: ""
		}
	})
};

export default Query;
