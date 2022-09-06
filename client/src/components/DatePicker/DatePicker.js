import { end } from "@popperjs/core";
import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getBookingByLodgingId,
  getDetail,
  settingDate,
} from "../../Redux/Actions";
import styles from "./DatePicker.module.css";
import getDatesInRange from "../Booking/controller";

export default function DatePickerOk({ lodId }) {
  //SELECT STATES FROM REDUX
  const availibity = useSelector((state) => state.bookings);
  const lodging = useSelector((state) => state.detail);
  const services = lodging.services;
  const lodgingId = lodging._id;
  const price = lodging.price;
  const dispatch = useDispatch();
  const history = useHistory();
  const [info, setInfo] = useState({
    lodgingId: lodId,
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
    pets: false,
  });

  useEffect(() => {
    dispatch(getDetail(lodgingId));
    dispatch(getBookingByLodgingId(info));
  }, [dispatch]);

  //GET INFO GUEST
  const guestInfo = localStorage.getItem("userInfo");
  let user = JSON.parse(guestInfo);

  //AVAILIBITY LODGINGS
  const unavailableDates = availibity.map((e) =>
    e.allDates.map((d) => new Date(d).toDateString())
  );
  const unavailableDatesMap = unavailableDates.flat();
  const disabledDates = unavailableDatesMap.map((e) => new Date(e));

  //GET Q PETS
  const lodgingServices = [];
  for (const property in services) {
    if (services[property] === true) {
      lodgingServices.push(property);
    }
  }
  const pets = lodgingServices.filter((e) => e === "pets");

  function handleCheckBox(e) {
    setInfo({ ...info, pets: e.target.checked });
  }

  async function handleClick(e) {
    const alldates = getDatesInRange(info.checkIn, info.checkOut);
    const isFound = unavailableDatesMap.some((date) =>
      alldates.includes(new Date(date).toDateString())
    );
    if (isFound) {
      return alert("Fecha no disponible");
    } else {
      localStorage.setItem("bookingInfo", JSON.stringify(info));
      localStorage.setItem("priceBooking", JSON.stringify(price));
      dispatch(getBookingByLodgingId(info));
      if (user) {
        history.push(`/booking/${lodgingId}`);
      } else {
        history.push(`/login`);
      }
    }
  }

  return (
    <div className="sticky-md-top p-5 container text-center">
      <div className="card w-100">
        <div className="card-body">
          <h3 className="fs-3">
            $ {lodging.currency}
            {lodging.price} noche
          </h3>
          <div className={styles.review}>Ver reseñas</div>
          <div className="p-2">
            <div className="fs-5">Elige la fecha</div>
            <div className>
              <div className="d-flex p-0">
                <div className="d-inline p-2">
                  <div className>Llegada</div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(info.checkIn)}
                    onChange={(currentDate) =>
                      setInfo({
                        ...info,
                        checkIn: new Date(currentDate).toDateString(),
                      })
                    }
                    selectsStart
                    startDate={new Date(info.checkIn)}
                    endDate={new Date(info.checkOut)}
                    excludeDates={disabledDates}
                    selectsEnd
                    minDate={new Date()}
                  />
                </div>
                <div className className="d-inline p-2">
                  <div>Salida</div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={new Date(info.checkOut)}
                    onChange={(currentDate) =>
                      setInfo({
                        ...info,
                        checkOut: new Date(currentDate).toDateString(),
                      })
                    }
                    selectsStart
                    startDate={new Date(info.checkIn)}
                    endDate={new Date(info.checkOut)}
                    excludeDates={disabledDates}
                    selectsEnd
                    minDate={new Date(info.checkIn)}
                  />
                </div>
              </div>
              <div className="dropdown w-100">
                <button
                  className={styles.dropdown}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <label className={styles._7eq2v2}>Huespedes</label>
                  <div>{`${info.guests}`}</div>
                </button>
                <div className="dropdown-menu w-100 p-3">
                  <div className="d-flex flex-row">
                    <div className={styles.div_guests_Description}>
                      <div>Huespedes</div>
                    </div>
                    <div className={styles.container_btn}>
                      {/* <button onClick={handleDecrement}>-</button>
                          <div>{`${info.guests}`}</div>
                          <button onClick={handleIncrement}>+</button> */}
                      <input
                        type="number"
                        name="adults"
                        min={1}
                        max={lodging.guests}
                        onChange={(e) =>
                          setInfo({ ...info, guests: e.target.value })
                        }
                        defaultValue={info.guests}
                      ></input>
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className={styles.div_guests_Description}>
                      <div>Mascota</div>
                      <input
                        type="checkbox"
                        checked={info.pets}
                        disabled={!pets.includes("pets")}
                        onChange={handleCheckBox}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {<button onClick={(e) => handleClick(e)}>Continuar</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
