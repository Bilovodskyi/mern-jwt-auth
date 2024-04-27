import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    async function logoutHandler() {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <header className="w-full flex gap-6 absolute text-white p-3">
            <NavLink to="/">Home</NavLink>
            {userInfo ? (
                <>
                    <Link to="/profile">
                        <div>Hi, {userInfo.name}!</div>
                    </Link>
                    <button onClick={logoutHandler}>Logout</button>
                </>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </header>
    );
};

export default Header;
