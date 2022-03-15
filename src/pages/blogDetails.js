import { useParams } from "react-router-dom";
import GetSetData from "../helper/getSetData";
import trash from "../images/trash.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  let { id } = useParams();

  const {
    data: blog,
    Loading,
    error,
  } = GetSetData(`https://wonderful-blogs-api.herokuapp.com/blogs/${id}`);

  const displayMessage = () => {
    if (deleted === "error") {
      return <div className="display-message error">error while deleting</div>;
    } else if (deleted === "success") {
      return (
        <div className="display-message success">deleted successfully</div>
      );
    }
    return;
  };

  const handleDelete = (id) => {
    setDisabled(true);
    fetch(`https://wonderful-blogs-api.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("error while deleting");

        setDeleted("success");
      })
      .catch((err) => {
        console.log(err);
        setDeleted("error");
      })
      .finally(() => {
        setTimeout(() => navigate("/"), 3000);
      });
  };

  return (
    <div className="blog-details">
      {error && !deleted && (
        <div className="error-message">{error.message}</div>
      )}
      {Loading && !deleted && <div className="loading-btn" />}
      {blog && !deleted && (
        <div>
          <h2>{blog[0].title}</h2>
          <p>written by: {blog[0].author} </p>
        </div>
      )}
      {blog && !deleted && (
        <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          {blog[0].body}
        </div>
      )}

      {blog && !deleted && (
        <button
          disabled={disabled}
          onClick={() => handleDelete(blog[0].id)}
          className="button"
        >
          <p>delete blog</p>
          <img src={trash} alt="icon" />
        </button>
      )}
      {displayMessage()}
    </div>
  );
};

export default BlogDetails;
