import casual from "casual";

const Author = {
  firstname: () => casual.first_name,
  lastname: () => casual.last_name
};

export default Author;
