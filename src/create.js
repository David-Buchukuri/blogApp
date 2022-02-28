import { useState, useEffect, useRef } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const isMounted = useRef(true);
  // const abortFetch = new AbortController();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const blog = { title, body, author };
    setTimeout(() => {
      fetch("https://wonderful-blogs-api.herokuapp.com/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
        // signal: abortFetch.signal,
      })
        .then((res) => {
          if (isMounted.current) {
            console.log("first then");
            if (!res.ok) throw new Error("something went wrong");
            setIsPending(false);
            return res.json();
          }
        })
        .then((res) => {
          if (isMounted.current) {
            console.log("second then");
            console.log(res);
          }
        })
        .catch((err) => {
          if (isMounted.current) {
            console.log("error block");
            console.log(err);
            // if (err.name === "AbortError") {
            // console.log(`Abort in fetch`);
            // } else {
            setIsPending(false);
            setError(
              "something went wrong 🤷‍♂️, try again later with different title or author "
            );
            // }
          }
        });
    }, 2000);
  };

  useEffect(() => {
    return () => {
      console.log("abort in useState");
      isMounted.current = false;
      console.log(isMounted);
      // return abortFetch.abort();
    };
  }, []);

  return (
    <div className="create">
      {!error ? (
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
            <button>add blog</button>
          ) : (
            <button disabled="disabled">pending...</button>
          )}
        </form>
      ) : (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default Create;
