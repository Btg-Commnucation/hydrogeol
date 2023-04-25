import { useEffect, useState } from "react"
import ky from "ky"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setMenu } from "../feature/menu.slice"

type Response = { [key: string]: unknown }

const Header = () => {
    const dispatch = useDispatch()
    const menu = useSelector((state: Response) => state.menu)
    const [isLoading, setIsLoading] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const getMenu = new Promise((resolve, reject) =>{
        try {
            const response: Response[] = ky(
                "better-rest-endpoints/v1/menus/menu-principal",
                {
                    prefixUrl: import.meta.env.VITE_FETCH_URL
                }
            ).json()
        } catch (error) {
            reject(error)
        }
    } )

    useEffect(() => {
        console.log(getMenu)
    })

  return (
    <header>
      <a href="#">
        <img src="" alt="" />
      </a>
      <nav className="menu"></nav>
      <a href="#">
        <img src="" alt="" />
      </a>
    </header>
  );
};

export default Header;
