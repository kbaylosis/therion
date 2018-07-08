import casual from "casual";

class Author {
	fullname = () => (`${ casual.firstname() } ${ casual.lastname() }`)
}

export default new Author();
