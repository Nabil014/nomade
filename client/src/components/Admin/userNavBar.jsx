import React, { useEffect } from "react";
import SearchUser from "../SearchUser/SearchUser";
import s from "../NavBar/NavBar.module.css";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../assets/nomadeLogo.svg";
import { FaUserCircle } from "react-icons/fa";
import { ImUserPlus, ImUserCheck } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { TbMessageCircle } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getHostByGuestId, getLodgings } from "../../Redux/Actions/index";

export default function UserNav(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  let guestId = localStorage.getItem("userInfo");
  
  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId).email;
  }

  const email={
    email: userToken
  }
  

  function handleClearState(e) {
    e.preventDefault();
    dispatch(getLodgings());
  }

  const location = window.location.pathname;

  //GET HOST
  useEffect(()=>{
    dispatch(getHostByGuestId(email))
  }, [dispatch])

  const validateHost= useSelector(state=>state.hosts)
  async function handleClick(e){
    console.log(validateHost, 'VALIDATE HOST')
    e.preventDefault();
    if(validateHost[0] && userToken){
      const hostObject = Object.values(validateHost[0])
      const hostId = hostObject[0]
      history.push(`${hostId}/registerlodging`)
    }else if(userToken){
      history.push(`/${userToken}/form`)
    }
    else{
      history.push(`/login`)
    }
  } 

  return (
    <React.Fragment>
      <div className="c1kn6kxw dir dir-ltr">
        <header className="c1kffd0v cxy853f c1g36qz5 dir dir-ltr">
          <div className={s.nav}>
            <div className="c1xsvlgx dir dir-ltr">
              <div className={s.div_logo} onClick={handleClearState}>
                <Link to="/" className="c13cw3wj cbavvlr dir dir-ltr">
                  <div className="l10sdlqs dir dir-ltr">
                    <img
                      alt="bg-button"
                      src={Logo}
                      className={s.logo}
                      width="150"
                      height="60"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div>
              {
                location === '/' || location === '/admin/users'? <SearchUser /> : <div></div>
              }
              
            </div>
            <div className="cylj8v3 dir dir-ltr">
              <div className="c1yo0219 dir dir-ltr">
                <nav className={s.nav_inside}>
                  <div className="_176ugpa">
                  {
                        location === '/'? <button className={s.btn_host} onClick={handleClick}>Hospeda nómades</button> :
                        <Link to="/" className="c13cw3wj cbavvlr dir dir-ltr">
                        <button className={s.btn_host}>Volver</button>
                        </Link>
                      }
                  </div>
                    <div>
                    {
                      location === `/profile/${userToken}` ? <div></div> :
                      <div className={s.container_btn_icon}>
                    <button
                      className={s.button}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserCircle className={s.icon} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      {guestId ? (
                        <div>
                          <li>
                            <Link
                              to= {`/profile/${userToken}`}
                              className="dropdown-item current"
                            >
                              <CgProfile /> Perfil
                            </Link>
                          </li>
                          <li>
                            <Link to="/login" className="dropdown-item">
                              <TbMessageCircle /> Mensajes
                            </Link>
                          </li>
                          <li>

                            <Link to="/favorites" className="dropdown-item">
                              <GrFavorite /> Favoritos
                            </Link>
                          </li>
                          <li onClick={() => {
                                localStorage.removeItem('userInfo')
                              }}>
                            <Link to="/" className="dropdown-item">
                              <RiLogoutCircleLine /> Cerrar sesión
                            </Link>
                          </li>
                        </div>
                      ) : (
                        <div>
                          <li>
                            <Link
                              to="/registerguest"
                              className="dropdown-item current"
                            >
                              <ImUserPlus /> Registrarse
                            </Link>
                          </li>
                          <li>
                            <Link to="/login" className="dropdown-item">
                              <ImUserCheck /> Iniciar sesión
                            </Link>
                          </li>
                        </div>
                      )}
                    </ul>
                  </div>
                      }
                    </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}