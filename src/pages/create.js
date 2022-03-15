import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const isMounted = useRef(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const blog = { title, body, author };
    setTimeout(() => {
      fetch("https://wonderful-blogs-api.herokuapp.com/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      })
        .then((res) => {
          if (isMounted.current) {
            if (!res.ok) throw new Error("something went wrong");
            setIsPending(false);
            setError(false);
            setSuccess("thanks for posting 😎");
            return res.json();
          }
        })

        .catch((err) => {
          if (isMounted.current) {
            console.log(err);
            setIsPending(false);
            setError(
              "something went wrong 🤷‍♂️, try again later with different title or author "
            );
          }
        })
        .finally(() => {
          setTimeout(() => navigate("/"), 3000);
        });
    }, 2000);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="create">
      {!error && !success ? (
        <form onSubmit={handleSubmit}>
          <label>blog title:</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>blog body:</label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
          ></textarea>

          <label>blog author:</label>
          <input
            type="text"
            value={author}
            placeholder="anonimus"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />

          {!isPending ? (
            <button className="button">add blog</button>
          ) : (
            <button className="button" disabled="disabled">
              pending...
            </button>
          )}
        </form>
      ) : (
        <div className="display-message error">{error}</div>
      )}
      {success && <div className="display-message success">{success}</div>}
    </div>
  );
};

export default Create;
