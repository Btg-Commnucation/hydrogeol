/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PageType, RootState } from "./components/Page";
import ky from "ky";
import { setPage } from "./feature/page.slice";
import Loading from "./components/Loading";
import { AcfAccueilType } from "./assets/type";
import { Link } from "react-router-dom";

type AccueilType = {
  title: string;
  content: string;
  acf: AcfAccueilType;
  template: string;
  slug: string;
  permalink: string;
};

const App = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<AccueilType>();
  const { page }: { page: AccueilType[] | PageType[] } = useSelector(
    (state: RootState) => state.page
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAccueilType = (item: AccueilType | PageType): item is AccueilType => {
    return "acf" in item && "titre_premiere_partie" in item.acf;
  };

  const extractPathFromUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;

      // Supprimer le '/' initial et final s'il existe
      return path.replace(/^\/|\/$/g, "");
    } catch (error) {
      console.error("URL invalide:", url);
      return "";
    }
  };

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

  const handlePage = (payload: AccueilType[] | PageType[]) => {
    payload.map((item) => {
      if (item.permalink === "https://admin.hydrogeol.com/") {
        if (isAccueilType(item)) {
          setData(item);
        } else {
          console.error("Item is not of type AccueilType");
        }
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    document.title = `Hydrogéologue Conseil`;
    if (Object.keys(page).length === 0 && page.constructor === Object) {
      getPage
        .then((response) => dispatch(setPage(response)))
        .then((response) => handlePage(response.payload));
    } else {
      handlePage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {!isLoading ? (
        <>
          <section className="hero-banner__front">
            <div className="left">
              <div className="title">
                <img
                  src="/hydrogeol-logo.svg"
                  alt="Logo d'hydrogéolgue conseil. Une goutte"
                  className="logo-front"
                />
                <h1>
                  <span
                    className="initial"
                    dangerouslySetInnerHTML={{ __html: data!.title }}
                  ></span>
                  <span
                    dangerouslySetInnerHTML={{ __html: data!.title }}
                  ></span>
                </h1>
                <div className="eco">
                  <strong>Ce site est éco-conçu</strong>
                  <a href="https://www.ecoindex.fr" target="_blank">
                    ecoindex.fr
                  </a>
                </div>
              </div>

              <img
                src="/full-orange-arrow.svg"
                alt="Flèche orange pointant vers le bas"
                className="arrow"
              />
            </div>
            <div className="right">
              <div className="blue-bg"></div>
              <div
                className="right__content"
                dangerouslySetInnerHTML={{ __html: data!.content }}
              ></div>
            </div>
          </section>
          <section className="first-content__accueil">
            <div className="container">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data!.acf.titre_premiere_partie,
                }}
              ></h2>
              <div className="content">
                <ul className="list-premiere-partie">
                  {data!.acf.liste_premiere_partie.map(
                    (item, index: number) => (
                      <li key={index}>{item.termes}</li>
                    )
                  )}
                </ul>
                <ul className="list-lien">
                  <li>
                    <Link
                      to={extractPathFromUrl(
                        data!.acf.lien_premiere_partie.url
                      )}
                    >
                      {data!.acf.lien_premiere_partie.title}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={extractPathFromUrl(
                        data!.acf.second_lien_premiere_partie.url
                      )}
                    >
                      {data!.acf.second_lien_premiere_partie.title}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="second-part__accueil">
            <div className="container">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data!.acf.titre_seconde_partie,
                }}
              ></h2>
              <img
                src={data!.acf.image_seconde_partie.url}
                alt={data!.acf.image_seconde_partie.alt}
              />
              <div className="right__container">
                <article
                  dangerouslySetInnerHTML={{
                    __html: data!.acf.texte_seconde_partie,
                  }}
                ></article>
                <ul className="list-container">
                  <li>
                    <Link
                      to={extractPathFromUrl(
                        data!.acf.premier_lien_seconde_partie.url
                      )}
                    >
                      {data!.acf.premier_lien_seconde_partie.title}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={extractPathFromUrl(
                        data!.acf.second_lien_seconde_partie.url
                      )}
                    >
                      {data!.acf.second_lien_seconde_partie.title}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
      <Footer />
    </>
  );
};

export default App;
