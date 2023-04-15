import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";

const NavigationSidebar = () => {
    const { currentUser } = useSelector((state) => state.users);
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[2];
    return (
        <div className="list-group">
                    <Link to="/readit/home" className={`list-group-item ${active === 'home'?'active':''}`}>
                        Home
                    </Link>
                     <Link to="/readit/profile" className={`list-group-item
                                        ${active === 'profile'?'active':''}`}>
                                    Profile
                     </Link>
                      <Link to="/readit/search" className={`list-group-item ${active === 'search'?'active':''}`}>
                                     Search
                      </Link>
                    {!currentUser &&
                        <Link to="/readit/login" className={`list-group-item ${active === 'login'?'active':''}`}>
                            Login
                        </Link>
                    }
                    <Link to="/readit/register" className={`list-group-item ${active === 'register'?'active':''}`}>
                        Register
                    </Link>
                    {currentUser &&
                        <Link to="/readit/logout" className={`list-group-item ${active === 'logout'?'active':''}`}>
                            Logout
                        </Link>
                    }
                </div>
    );
};
export default NavigationSidebar;