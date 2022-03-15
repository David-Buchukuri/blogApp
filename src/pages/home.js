import BlogList from "../components/blogList";
import GetSetData from "../helper/getSetData";

const Home = () => {
  let {
    data: blogs,
    Loading,
    error,
  } = GetSetData("https://wonderful-blogs-api.herokuapp.com/blogs");

  return (
    <div className="home">
      {error && <div className="error-message">{error.message}</div>}
      {Loading && <div className="loading-btn" />}
      {blogs && <BlogList blogs={blogs} title={"All blogs"} />}
    </div>
  );
};

export default Home;
