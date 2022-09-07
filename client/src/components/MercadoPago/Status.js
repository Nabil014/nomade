import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetail, createNewBooking } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Status.module.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios"
import {IoChatbubbles} from 'react-icons/io5'

export default function Status() {
  const dispatch = useDispatch();

  //trae info de la reserva desde el localStorage
  const bookingInfo = localStorage.getItem("booking");
  const booking = JSON.parse(bookingInfo);
  var emailGuest = booking.email;
  const checkIn = new Date(booking.checkIn).toLocaleDateString();
  const checkOut = new Date(booking.checkOut).toLocaleDateString();
  const lodgingId = booking.lodgingId;

  //trae info del pago desde la URL
  const status = useLocation();
  const status1 = status.search;
  const status2 = status1.split("&", 4);
  const paymentId1 = status2[2].split("=");
  const paymentId = paymentId1[1];
  const realStatus1 = status2[3].split("=");
  const realStatus = realStatus1[1];
 const allDatesMap = booking.allDates.map(e=>new Date(e))
  //trae los detalles del alojamiento reservado
  useEffect(() => {
    dispatch(getDetail(lodgingId));
    dispatch(createNewBooking(booking));
    const data = async () => {
      await axios.post(`/api/booking/emailVerified/${emailGuest}`,booking)
   }
   setTimeout(() =>  {data()},3000)
  
  }, [dispatch]);

  const lodging = useSelector((state) => state.detail);
  const title = lodging.title;
  const costNight = lodging.price;
  const picture = lodging.picture;
  const obj = Object.assign({}, picture);
  const picture1 = obj["0"];
  const city = lodging.city;
  const country = lodging.country;

  //DESPACHO ACCION DE RESERVA
  /* if (realStatus === "approved") {
    
  } */
  return (
    <div >
      <NavBar />  
      <div className={styles.contenedorTotal}>

      <div className={styles.container2}>
        {realStatus === "approved" ? (
          <div>
            <div className={styles.container}>
              <div>
                <div className={styles.title}>Tu pago ha sido aprobado</div>
                <div className={styles.link}>
                  Tu estadia en {title} te espera desde el {checkIn} al{" "}
                  {checkOut}.
                </div>
                <div className={styles.link}>
                  ¡Gracias por tu reserva! ¡Que la disfrutes!
                </div>
              </div>
              <div className={styles.foto}>
                <img
                  className={styles.img}
                  src={picture1}
                  alt="img not found"
                />
              </div>
              <div className={styles.link2}>
        <Link  to='/chat'>
          <div className={styles.icono}>
        <IoChatbubbles/>
          </div>
        Comunicate con tu Host</Link>
        </div>
            </div>
          </div>
        ) : (
          <div>
          <div className={styles.title}>
            No se logró realizar tu pago, comunícate con tu entidad bancaria
            para conocer más detalles y vuelve a Nómade, tu estadía en {title}{" "}
            te espera.
          </div>
          <div>
        <Link className={styles.link2} to='/'>Volver a la página principal</Link>
        </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}