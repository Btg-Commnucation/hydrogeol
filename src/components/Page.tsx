import ky from "ky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../feature/page.slice";
import { useParams, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Contact from "./Contact";

type Response = { [key: string]: any };
interface RootState {
  page: {
    page: Response[];
  };
}

const Page = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: any }>();
  const { page }: { page: Response[] } = useSelector(
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

  const handlePage = () => {
    page.map((item) => {
        if( item.slug === slug ) {
            setData(item)
        }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    if (Object.keys(page).length === 0 && page.constructor === Object) {
      getPage
        .then((response) => dispatch(setPage(response)))
        .then(() => handlePage());
    } else {
        handlePage()
    }
  }, [slug]);

  return (
    <>
      <ScrollRestoration />
      <Header />
      {!isLoading ? (
        <>
            {data?.template === "template-contact" && <Contact page={data} />}
        </>
      ) : <h1>{data?.title}</h1>}
      <Footer />
    </>
  );
};

export default Page;
