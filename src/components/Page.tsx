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

interface RootState {
  page: {
    page: PageType[];
  };
}

export interface PageProps {
  page: PageType;
}

type Image = {
  url: string;
  alt: string;
  ID: number;
};

export type PageType = {
  title: string;
  content: string;
  acf: {
    list_haut_de_page?: string;
    titre_premier_paragraphe?: string;
    image_premier_paragraphe?: Image;
    contenu_premier_paragraphe?: string;
    image_haut_de_page?: Image;
    coordonnees?: string;
    banner_image?: Image;
    logo?: Image;
    mot_fond_bleu?: string;
  };
  template: string;
  slug: string;
};

const Page = () => {
  const { slug } = useParams();
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
      if (item.slug === slug) {
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
  }, [slug]);

  return (
    <>
      <ScrollRestoration />
      <Header />
      {!isLoading ? (
        <>
          {data?.template === "template-contact" && <Contact page={data} />}
          {data?.template === "template-valeurs" && <Valeurs page={data} />}
          {data?.template === "default" && <Default page={data} />}
        </>
      ) : (
        <Loading />
      )}
      <Footer />
    </>
  );
};

export default Page;
