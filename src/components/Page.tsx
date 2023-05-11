import ky from "ky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../feature/page.slice";
import { useParams, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Contact from "./Contact";
import Valeurs from "./Valeurs";
import Loading from "./Loading";
import Default from "./Default";
import { AcfType } from "../assets/type";
import Qualifications from "./Qualifications";
import ErrorPage from "./ErrorPage";

export interface RootState {
  page: {
    page: PageType[];
  };
}

export interface PageProps {
  page: PageType;
}

export type PageType = {
  title: string;
  content: string;
  acf: AcfType;
  template: string;
  slug: string;
  permalink: string;
};

const Page = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<PageType>();
  const { page }: { page: PageType[] } = useSelector(
    (state: RootState) => state.page
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
      if (item.slug === slug) {
        console.log("here");
        setData(item);
        setIsLoading(false);
      } else {
        setIsError(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (data) {
      const decodeTitle = decodeURIComponent(data.title)
        .replace("&#038;", "&")
        .replace("&rsquo;", "'");
      document.title = `${decodeTitle} - Hydrogéologue`;
    }
  }, [data]);

  return (
    <>
      <ScrollRestoration />
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <Header />
          {!isLoading ? (
            <>
              {data?.template === "template-contact" && <Contact page={data} />}
              {data?.template === "template-valeurs" && <Valeurs page={data} />}
              {data?.template === "default" && <Default page={data} />}
              {data?.template === "template-qualifications" && (
                <Qualifications page={data} />
              )}
            </>
          ) : (
            <Loading />
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
