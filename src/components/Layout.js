import { NavLink, Outlet } from "react-router-dom";
import css from './Layout.module.css'

export const Layout = () => {
    return (
        <>
            <header>
                <nav className={css.navigate}>
                    <NavLink to='/'
                        className={({ isActive }) => (isActive ? `${css.navLink} ${css.active}` : css.navLink)} >
                        Home
                    </NavLink>
                    <NavLink to='/movies'
                        className={({ isActive }) => (isActive ? `${css.navLink} ${css.active}` : css.navLink)} >
                        Movies
                    </NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </>
    )
}