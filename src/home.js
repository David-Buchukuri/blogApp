import { useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: "dev ops", body: "body 2", author: "john", id: 2 },
    { title: "data engineering", body: "body 1", author: "kael", id: 1 },
    { title: "backend  development", body: "body 3", author: "kevin", id: 3 },
  ]);

  return (
    <div className="home">
      {blogs.map((elem) => (
        <div className="blog-preview" key={elem.id}>
          <h3>{elem.title}</h3>
          <p>author: {elem.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
