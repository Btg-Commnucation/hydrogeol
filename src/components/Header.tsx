import { useEffect, useRef, useState } from "react";
import ky from "ky";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../feature/menu.slice";
import NavLink from "./NavLink";

type Response = { [key: string]: any };
interface RootState {
  menu: {
    options: { options: Response };
  };
}

const Header = () => {
  const dispatch = useDispatch();
  const { options }: { options: Response } = useSelector(
    (state: RootState) => state.menu
  );
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLHtmlElement | null>(null);

  // eslint-disable-next-line no-async-promise-executor
  const getOptions = new Promise<Response[]>(async (resolve, reject) => {
    try {
      const response: Response[] = await ky(
        "better-rest-endpoints/v1/options/acf",
        {
          prefixUrl: import.meta.env.VITE_FETCH_URL,
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  const extractSlugFromUrl = (url: string): string => {
    const urlObj = new URL(url);
    let slug = urlObj.pathname;

    if (slug.startsWith("/")) {
      slug = slug.slice(1);
    }
    if (slug.endsWith("/")) {
      slug = slug.slice(0, -1);
    }

    return slug;
  };

  useEffect(() => {
    if (Object.keys(options).length === 0 && options.constructor === Object) {
      getOptions
        .then((response) => dispatch(setOptions(response)))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <header ref={headerRef}>
      <div className="bg"></div>
      <div className="container">
        {!isLoading && (
          <>
            <Link to="/">
              <img
                src={options.image_retour_accueil.url}
                alt={options.image_retour_accueil.alt}
              />
            </Link>
            <NavLink />
            <Link to={`/${extractSlugFromUrl(options.lien_page_contact.url)}`}>
              <img
                src={options.image_contact.url}
                alt={options.image_contact.alt}
              />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
