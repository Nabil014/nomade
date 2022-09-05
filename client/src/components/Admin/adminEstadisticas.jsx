import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Estadistica from '../Estadisticas/Estadisticas.jsx';
import Menu from './menuAdmin';
import NavBar from '../NavBar/NavBar';
import {getGuests} from "../../Redux/Actions/index";
//import styles from './Home.module.css'
import Profile from '../Profile/profile';
export default function Home() {
  useEffect(() => {
    dispatch(getGuests());
  }, [dispatch]);
  let guestId = localStorage.getItem("userInfo");

  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId)._id;
    var userEmail = JSON.parse(guestId).email;
    var user = JSON.parse(guestId)
  }
  const userBusqueda = useSelector((state) => state.userBusqueda);
  const allGuests = useSelector((state) => state.allGuests);
  let arrFilter = userBusqueda.filter(e => e.email === userEmail)

  let stateLodgings = useSelector((state) => state.lodgings);
  let lodgingsVisibles= stateLodgings.filter(e=> e.Visibility===true)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // guardar en estado local la página actual
  const [lodgingPerPage, setLodgingPerPage] = useState(10); // setear en 20 la cantidad de hospedajes por página
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = lodgingsVisibles.slice(
    indexFirstLodging,
    indexLastLodging
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="c1kae56o dir dir-ltr">
       {userToken && allGuests[0]!== undefined && arrFilter[0].isAdmin === true ?
    <div>
    <NavBar
    email={user?user.email: ""} />
    <Menu setCurrentPage={setCurrentPage} paging={paging} lodgingPerPage={lodgingPerPage} currentLodging={currentLodging}/>
    <Estadistica></Estadistica>
    </div>:
    <h1>No puedes ver esta pagina.</h1>}
    </div>
  )
}