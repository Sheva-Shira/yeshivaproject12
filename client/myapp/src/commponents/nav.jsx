import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeToken } from "../features/auth/authSlice"
import apiSlice from "../app/apiSlice"
const Nav = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogoutClick = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
    const a=5
    return (
        <nav>
            <ul>
                ….
                {isUserLoggedIn && <li> <a
                    onClick={handleLogoutClick} > Logout </a></li>}
            </ul>
        </nav>
    )
}
export default Nav