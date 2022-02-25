import BlogList from "./blogList";
import useGetSetData from "./useGetSetData";

const Home = () => {
  const {
    data: blogs,
    Loading,
    error,
  } = useGetSetData(
    "https://my-json-server.typicode.com/David-Buchukuri/fake-db/blogs"
  );

  return (
    <div className="home">
      {error && <div className="error-message">{error.message}</div>}
      {Loading && <div className="loading-btn" />}
      {blogs && <BlogList blogs={blogs} title={"All blogs"} />}
    </div>
  );
};

export default Home;
