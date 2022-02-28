import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((elem) => (
        <div className="blog-preview" key={elem.id}>
          <Link to={`blogs/${elem.id}`}>
            <h3>{elem.title}</h3>
            <p>author: {elem.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
