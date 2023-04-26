import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../feature/menu.slice";
import ky from "ky";
import { Link } from "react-router-dom";

type Response = { ID: number; title: string; slug: string };
interface RootState {
  menu: {
    menu: Response[];
  };
}

const NavLink = () => {
  const dispatch = useDispatch();
  const { menu }: { menu: Response[] } = useSelector(
    (state: RootState) => state.menu
  );
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line no-async-promise-executor
  const getMenu = new Promise<Response[]>(async (resolve, reject) => {
    try {
      const response: Response[] = await ky(
        "better-rest-endpoints/v1/menus/menu-principal",
        {
          prefixUrl: import.meta.env.VITE_FETCH_URL,
        }
      ).json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  useEffect(() => {
    if (Object.keys(menu).length === 0 && menu.constructor === Object) {
      getMenu
        .then((response) => dispatch(setMenu(response)))
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <nav className="menu">
          <ul className="menu-container">
            {menu.map(
              (item: { ID: number; title: string; slug: string }) => (
                <li key={item.ID}>
                  <Link to={`/${item.slug}`}>{item.title}</Link>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavLink;
