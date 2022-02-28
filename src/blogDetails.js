import { useParams } from "react-router-dom";
import useGetSetData from "./useGetSetData";

const BlogDetails = () => {
  let { id } = useParams();

  const {
    data: blog,
    Loading,
    error,
  } = useGetSetData(`https://wonderful-blogs-api.herokuapp.com/blogs/${id}`);

  return (
    <div className="blog-details">
      {error && <div className="error-message">{error.message}</div>}
      {Loading && <div className="loading-btn" />}
      {blog && (
        <div>
          <h2>{blog[0].title}</h2>
          <p>written by: {blog[0].author} </p>
        </div>
      )}
      {blog && <div style={{ paddingTop: "1rem" }}>{blog[0].body}</div>}
    </div>
  );
};

export default BlogDetails;
