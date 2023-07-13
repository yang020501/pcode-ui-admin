import { useRef } from 'react'
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/auth.slice';
import { getAuth } from '@/selectors/auth.selector';

const NavbarHeader = (props: any) => {
    let dispatch = useDispatch()

    const { profile } = useSelector(getAuth);

    const menuRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    const closeSideMenu = () => {
        let valid = document.activeElement ? document.activeElement.id : ""
        if (!(valid === "navbaricon")) {
            menuRef.current ? menuRef.current.classList.remove('active') : null
            iconRef.current ? iconRef.current.classList.remove('active') : null
            window.removeEventListener('click', closeSideMenu)
        }
        else {
            window.removeEventListener('click', closeSideMenu)
        }
    }

    const menuToggle = () => {
        menuRef.current ? menuRef.current.classList.toggle('active') : null
        iconRef.current ? iconRef.current.classList.toggle('active') : null
        window.addEventListener('click', closeSideMenu)
    }
    return (
        <div className='navbarheader'>

            <div className="navbarheader-navbar">

                <div className="navbarheader-navbar-icon" onClick={menuToggle} ref={iconRef} >
                    <input id='navbaricon' type="text" style={{ width: "100%", height: "100%", position: "absolute", display: "", opacity: "0", cursor: "pointer" }} />
                    <ReorderIcon />
                </div>
                <div className="navbarheader-navbar-bread">


                </div>
            </div>

            <div className="navbarheader-side">
                <div className="navbarheader-side-sidemenu" ref={menuRef}>
                    <div className="navbarheader-side-sidemenu-header">
                        <div className="navbarheader-side-sidemenu-header-item bold">
                            <div>
                                {/* <Avatar alt="Avatar" variant='rounded' src={userValue.avatar ? userValue.avatar : require('../asset/pictures/avatar.jpg')} > N</Avatar> */}
                                <Avatar alt="Avatar" variant='rounded' src={profile?.avatar}> {profile?.username.charAt(0).toUpperCase() || 'A'}</Avatar>
                            </div>
                            {profile?.fullName ? profile.fullName : "User"}
                        </div>
                        <div className="navbarheader-side-sidemenu-header-item">
                            <Link to={"/profile"}>
                                <SettingsIcon style={{ width: "24px" }} />
                                Profile Settings
                            </Link>

                        </div>
                        <div className="navbarheader-side-sidemenu-header-item" >
                            <Link to={"/login"} onClick={() => { dispatch(logout()) }}>
                                <LogoutIcon />
                                Log Out
                            </Link>
                        </div>
                    </div>
                    {/* <div className="divider">

                    </div>
                    <div className="navbarheader-side-sidemenu-body">
                        {

                            <div className="navbarheader-side-sidemenu-body-item">
                                <Link to={"/admin"}>
                                    Dashboard
                                </Link>
                            </div>
                        }
                    </div> */}
                </div>
            </div>
        </div>

    )
}

NavbarHeader.propTypes = {

}

export default NavbarHeader
