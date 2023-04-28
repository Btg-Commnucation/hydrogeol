import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../feature/menu.slice";
import ky from "ky";
import { Link, useParams } from "react-router-dom";

type Response = { ID: number; title: string; slug: string };
interface RootState {
  menu: {
    menu: Response[];
  };
}

const NavLink = () => {
  const { slug } = useParams()
  const dispatch = useDispatch();
  const { menu }: { menu: Response[] } = useSelector(
    (state: RootState) => state.menu
  );
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const menuRef = useRef<HTMLUListElement>(null);

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

  const handleBurger = () => {
      menuRef?.current?.classList.toggle('active');
  }

  return (
    <>
      {!isLoading ? (
        <nav className="menu">
          { windowWidth < 1000 && (
            <div className="burger-menu" onClick={handleBurger}>
              <span className="burger"></span>
              <span className="burger"></span>
              <span className="burger"></span>
            </div>
          ) }
          <ul ref={menuRef} className="menu-container">
            {menu.map(
              (item: { ID: number; title: string; slug: string }) => (
                <li key={item.ID}>
                  <Link to={`/${item.slug}`} className={ slug === item.slug ? 'active' : '' }>{item.title}</Link>
                </li>
              )
            )}
          </ul>
        </nav>
      ) : (
        <nav className="menu">
          { windowWidth < 1000 && (
            <div className="burger-menu" onClick={handleBurger}>
              <span className="burger"></span>
              <span className="burger"></span>
              <span className="burger"></span>
            </div>
          ) }
          <ul ref={menuRef} className="menu-container">
            { Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <a href="#">Chargement</a>
              </li>
            )) }
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavLink;
