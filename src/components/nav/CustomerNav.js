import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()
    // <link> creates hyperlink for us, builds the log out function with a custom onClick event; onClick, in this case, removes an item from the database called "honey_user", then redirects user to the base route of the application
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

