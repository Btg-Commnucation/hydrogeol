import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PageType, RootState } from "./components/Page";
import ky from "ky";
import { setPage } from "./feature/page.slice";
import Loading from "./components/Loading";

const App = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<PageType>();
  const { page }: { page: PageType[] } = useSelector(
    (state: RootState) => state.page
  );
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line no-async-promise-executor
  const getPage = new Promise(async (resolve, reject) => {
    try {
      const response = await ky("better-rest-endpoints/v1/pages", {
        prefixUrl: import.meta.env.VITE_FETCH_URL,
      }).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const handlePage = (payload: PageType[]) => {
    payload.map((item) => {
      console.log(item.permalink);
      if (item.permalink === "https://admin.hydrogeol.com/") {
        setData(item);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(page).length === 0 && page.constructor === Object) {
      getPage
        .then((response) => dispatch(setPage(response)))
        .then((response) => handlePage(response.payload));
    } else {
      handlePage(page);
    }
  }, []);

  return (
    <>
      <Header />
      {!isLoading ? (
        <section className="hero-banner">
          <div className="left"></div>
          <div className="right"></div>
        </section>
      ) : (
        <Loading />
      )}
      <Footer />
    </>
  );
};

export default App;
