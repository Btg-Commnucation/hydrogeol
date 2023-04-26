import ky from "ky";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../feature/menu.slice";

type Response = { [key: string]: any };
interface RootState {
  menu: {
    options: { options: Response };
  };
}

const Footer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { options }: { options: Response } = useSelector(
    (state: RootState) => state.menu
  );

  // eslint-disable-next-line no-async-promise-executor
  const getFooter = new Promise(async (resolve, reject) => {
    try {
      const response = await ky("better-rest-endpoints/v1/options/acf", {
        prefixUrl: import.meta.env.VITE_FETCH_URL,
      }).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  useEffect(() => {
    if (Object.keys(options).length === 0 && options.constructor === Object) {
      getFooter
        .then((response) => dispatch(setOptions(response)))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <footer>
      {!isLoading && (
        <div className="container">
          <img src={options.logo_blanc.url} alt={options.logo_blanc.alt} className="logo-footer" />
          <div className="footer-text" dangerouslySetInnerHTML={{ __html: options.coordonnees }}></div>
          <img src={options.image_decoration.url} alt={options.image_decoration.alt} className="decoration" />
        </div>
      )}
    </footer>
  );
};

export default Footer;
