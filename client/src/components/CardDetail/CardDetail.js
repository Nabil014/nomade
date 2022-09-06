import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getGuests , getDetail, getGuestByEmail, deleteLodging} from "../../Redux/Actions/index";
import Carousel from "react-bootstrap/Carousel";
import GoogleMapDetail from "../GoogleMapsDetail/GoogleMapsDetail";
import Card from "react-bootstrap/Card";
import DatePickerOk from "../DatePicker/DatePicker";
import styles from "./CardDetail.module.css";
import { AiOutlineWifi, AiFillCar } from "react-icons/ai";
import { lodgingReviews } from "../../Redux/Actions/index";
import NavBar from "../NavBar/NavBar";
import s from '../DatePicker/DatePicker.module.css'

import {
  GiThermometerCold,
  GiCookingPot,
  GiWashingMachine,
  GiShower,
} from "react-icons/gi";
import {
  MdLocalDining,
  MdOutlinePets,
  MdOndemandVideo,
  MdCleaningServices,
  MdSecurity,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import ConditionalReview from "./ConditionalReview/ConditionalReview";
import CarouselItem from "react-bootstrap/esm/CarouselItem";

export default function CardDetail(props) {
  const dispatch = useDispatch();
  const lodgingId = props.match.params._id;
  const history = useHistory()
  let guestId = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!guestId) {
  } else {
    var userToken = JSON.parse(guestId)._id;
    var userEmail = JSON.parse(guestId).email;
  }
  useEffect(() => {
    dispatch(getGuests());
    dispatch(getDetail(lodgingId));
    dispatch(getGuestByEmail(userEmail))
    dispatch(lodgingReviews());

  }, [dispatch]);
  const myLodging = useSelector((state) => state.detail);
  let stateLodgings = useSelector((state) => state.allLodgingsReviews);
  const allGuests = useSelector((state) => state.allGuests);
  let detailReview = stateLodgings.map((e) =>
    e.lodgingId === lodgingId ? [e.comments, e.rating] : false
  );
  let filtrado = detailReview.filter((e) => e !== false);

  // const servicios = useSelector((state) => state.detail.services)

  const servicios = myLodging.services;
  console.log(allGuests)
  console.log(userEmail)
  let arrFilter = allGuests.filter(e => e.email === userEmail)
  console.log(arrFilter)


  const lodgingServices = [];
  const lodgingNoServices = [];

  for (const property in servicios) {
    if (servicios[property] === true) {
      lodgingServices.push(property);
    } else {
      lodgingNoServices.push(property);
    }
  }

  //variables necesarias para carrusel de imagenes
  const picture = myLodging.picture;
  // const obj = Object.assign({}, picture);
  // const picture1 = obj["0"];
  // const picture2 = obj["1"];
  // const picture3 = obj["2"];
  console.log(picture)

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //Botón de reserva
  const handleBooking = (e) => {};

  //renderizado
  function handleSubmit(e){
    e.preventDefault()
    dispatch(deleteLodging(props.match.params._id))  
    history.push("/")
  }

  return (
    <div className="_16grqhk">
      <NavBar />
      {myLodging === undefined ? (
        <p>Loading...</p>
      ) : (
        <div className={styles._le6wlg}>
          <div className={styles.container}>
            <div className="_88xxct">
              <div className="plmw1e5 mq5rv0q dir dir-ltr">
                <div className={styles.carousel}>
                  <div className="_168ht2w">
                    <Carousel
                      activeIndex={index}
                      onSelect={handleSelect}
                      className="_168ht2w"
                    >
                    {
                      picture?
                      picture.map((e)=>
                      <Carousel.Item className="_168ht2w">
                      <img
                        className="d-block w-100"
                        src={e}
                        alt="slide"
                      /></Carousel.Item>)
                      :
                      <div>No pudimos proveer las imágenes</div>
                    }
                    
                    </Carousel>
                  </div>
                </div>
              </div>

              <div>
                <h5 className={styles.city}>{myLodging.city}</h5>
              </div>

              <div className={styles.padding}>
                <h3 className={styles.titles}>Alojamiento</h3>
                <hr className={styles.hr}></hr>
                <div>
                  <h4>{myLodging.title}</h4>
                  <h4>{myLodging.lodgingType}</h4>
                </div>
              </div>

              <div className={styles.padding}>
                <h3 className={styles.titles}>Descripción</h3>
                <hr className={styles.hr}></hr>
                <h4>{myLodging.description}</h4>
              </div>

              <div className={styles.padding}>
                <h3 className={styles.titles}>Servicios Incluidos</h3>
                <hr className={styles.hr}></hr>

                <div className={styles.flexcontainer2}>
                  <div className={styles.flexcontainer4}>
                    <div>
                      <AiOutlineWifi />
                    </div>
                    <div>
                      {lodgingServices.includes("wifi") ? (
                        <p className={styles.p1}>Wifi</p>
                      ) : (
                        <p className={styles.p2}>Wifi</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <GiThermometerCold />
                    </div>
                    <div>
                      {lodgingServices.includes("ac") === true ? (
                        <p className={styles.p1}>Aire Acondicionado</p>
                      ) : (
                        <p className={styles.p2}>Aire Acondicionado</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <GiShower />
                    </div>
                    <div>
                      {lodgingServices.includes("hotWater") === true ? (
                        <p className={styles.p1}>Agua Caliente</p>
                      ) : (
                        <p className={styles.p2}>Agua Caliente</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <MdOndemandVideo />
                    </div>
                    <div>
                      {lodgingServices.includes("tv") === true ? (
                        <p className={styles.p1}>Televisión</p>
                      ) : (
                        <p className={styles.p2}>Televisión</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <MdSecurity />
                    </div>
                    <div>
                      {lodgingServices.includes("security") === true ? (
                        <p className={styles.p1}>Seguridad</p>
                      ) : (
                        <p className={styles.p2}>Seguridad</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <AiFillCar />
                    </div>
                    <div>
                      {lodgingServices.includes("parking") === true ? (
                        <p className={styles.p1}>Estacionamiento</p>
                      ) : (
                        <p className={styles.p2}>Estacionamiento</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <MdCleaningServices />
                    </div>
                    <div>
                      {lodgingServices.includes("cleaning") === true ? (
                        <p className={styles.p1}>Limpieza</p>
                      ) : (
                        <p className={styles.p2}>Limpieza</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <GiWashingMachine />
                    </div>
                    <div>
                      {lodgingServices.includes("laundry") === true ? (
                        <p className={styles.p1}>Lavandería</p>
                      ) : (
                        <p className={styles.p2}>Lavandería</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <GiCookingPot />
                    </div>
                    <div>
                      {lodgingServices.includes("kitchen") === true ? (
                        <p className={styles.p1}>Cocina</p>
                      ) : (
                        <p className={styles.p2}>Cocina</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <MdLocalDining />
                    </div>
                    <div>
                      {lodgingServices.includes("dining") === true ? (
                        <p className={styles.p1}>Comedor</p>
                      ) : (
                        <p className={styles.p2}>Comedor</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <FaSwimmingPool />
                    </div>
                    <div>
                      {lodgingServices.includes("pool") === true ? (
                        <p className={styles.p1}>Piscina</p>
                      ) : (
                        <p className={styles.p2}>Piscina</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.flexcontainer4}>
                    <div>
                      <MdOutlinePets />
                    </div>
                    <div>
                      {lodgingServices.includes("pets") === true ? (
                        <p className={styles.p1}>Mascotas</p>
                      ) : (
                        <p className={styles.p2}>Mascotas</p>
                      )}
                    </div>
                  </div>
                  <GoogleMapDetail />
                </div>
              </div>
            </div>
            <div>
              <DatePickerOk lodId={lodgingId} />

              <h3 className={styles.h3}>Reseñas</h3>
              <div className={styles.modal}>
                <div className={styles.reviews}>
                  {filtrado[0] !== undefined ? (
                    <div>
                      {filtrado.map((e) => (
                        <div className={styles.texto}>
                          <label className={styles.estrellas} value={e[1]}>
                            {e[1] === 5
                              ? "★★★★★ "
                              : e[1] === 4
                              ? "★★★★ "
                              : e[1] === 3
                              ? "★★★ "
                              : e[1] === 2
                              ? "★★ "
                              : e[1] === 1
                              ? "★ "
                              : false}
                          </label>
                          <label value={e[0]}>{e[0]}</label>
                          <hr></hr>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.aun}>
                      <h5>{"Aún no hay reseñas"}</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container_btn}>
        
          <button className={styles.button}><Link className={styles.link} to="/">Volver</Link></button>
        
          <ConditionalReview lodId={lodgingId} email={userEmail} userToken1={userToken} />

        <Link
          to={
            userToken
              ? `/complaint/${userToken}/${props.match.params._id}`
              : "/login"
          }
          className="nav-link py-2 px-0 px-lg-2"
        >
          <button className={styles.buttonDenunciar}>Denunciar hospedaje</button>
        </Link>
        {
          userToken && allGuests[0]!== undefined && arrFilter[0].isAdmin === true ?
          <form onSubmit={(e)=>handleSubmit(e)}> 
          <button className={styles.buttonDenunciar} type='submit'>Borrar alojamiento</button>
          </form>:
          <div></div>
        }
      </div>
    </div>
  );
}
