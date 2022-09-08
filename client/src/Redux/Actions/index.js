import axios from "axios";

export const GET_BY_CITY = " GET_BY_CITY";

export function getLodgings(lodgingId) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/api/lodging");

      dispatch({
        type: "GET_LODGINGS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountry() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/api/country");
      dispatch({
        type: "GET_COUNTRY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//MENUcd cli
export function filterTypeHouse(payload) {
  return {
    type: "FILTER_TYPE_HOUSE",
    payload,
  };
}
export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
export function filterByPets(payload) {
  return {
    type: "FILTER_BY_PETS",
    payload,
  };
}

export function orderByLowerCost(payload) {
  return {
    type: "ORDER_BY_LOWEST",
    payload,
  };
}
export function orderByHigherCost(payload) {
  return {
    type: "ORDER_BY_HIGHEST",
    payload,
  };
}

//Aquí termina Menú

export function setLoaderTrue() {
  return {
    type: "LOADER_TRUE",
  };
}

export function setLoaderFalse() {
  return {
    type: "LOADER_FALSE",
  };
}

export function getByCity(city) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/api/lodging?city=${city}`);
      console.log(json.data);
      return dispatch({
        type: "GET_BY_CITY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postGuest(payload) {
  return async function (dispatch) {
    let json = await axios.post("/api/guest", payload);
    return json;
  };
}

//Trae un guest por Id
export function getGuest(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/guest/" + payload);
      return dispatch({
        type: "GET_GUEST",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Filtra el guest por email
export function getGuestByEmail(email) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/api/guest/${email}`);
      return dispatch({
        type: "GET_GUEST_BY_EMAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Filtra el host
export function getHost(hostId) {
  return async function (dispatch) {
    try {
      let json = await axios.get("/api/host/" + hostId);
      return dispatch({
        type: "GET_HOST",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Trae todos los Guests
export function getGuests() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/guest");
      return dispatch({
        type: "GET_ALL_GUESTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Trae un Host por dni
export function getHostByDni(dni) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/api/guest/:${dni}`);
      return dispatch({
        type: "GET_HOST_BY_DNI",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(lodgingId) {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/lodging/detail/" + lodgingId);
      return dispatch({
        type: "GET_LODGING_DETAIL",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postLodging(payload) {
  return async function (dispatch) {
    console.log(payload);
    let json = await axios.post(
      "/api/lodging/62fe7ea0b2a41b94d94fd0f2",
      payload
    );

    return json;
  };
}

export function addFavorite(payload) {
  return async function (dispatch) {
    console.log("actions");

    try {
      let response = await axios.post("/api/favorite/", payload);
      console.log("response", response);
      return dispatch({
        type: "ADD_FAVORITE",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getFavorites(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post("/api/favorite/fav", payload);
      return dispatch({
        type: "GET_FAVORITES",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function deleteFavorite(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.post("/api/favorite/delete", payload);

      console.log(response, "okkkk");
      return dispatch({
        type: "DELETE_FAVORITE",
        payload,
      });
    } catch (err) {
      console.log("hay un error");
    }
  };
}

export function favoriteNumber(payload) {
  return async function (dispatch) {
    try {
      /*  var response = await axios.post('/api/favorite/favoriteNumber', payload)
      console.log(response, payload)
      return dispatch({
        type: "FAVORITE_NUMBER",
        payload: response.data.favoriteNumber
      }) */
    } catch (err) {
      alert("failed to get favorite number");
    }
  };
}
export function settingDate(payload) {
  return {
    type: "SET_DATE",
    payload,
  };
}

export function lodgingReviews() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/lodgingReview");
      return dispatch({
        type: "GET_ALL_LODGINGREVIEWS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// BOOKING
export function createNewBooking(payload) {
  return async function (dispatch) {
    var json = await axios.post("/api/booking", payload);
  };
}

//ACTION QUE SETEA LOS DATOS DEL LODGING EN
export function setDataPostBooking(payload) {
  return {
    type: "SET_DATA_POSTBOOKING",
    payload,
  };
}

//GET BOOKING BY GUEST ID
export function getBookingByGuest(guest) {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/booking/" + guest);
      return dispatch({
        type: "BOOKING_BY_GUEST",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function payBooking(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.post("/api/payment/", payload);
      return dispatch({
        type: "PAY_BOOKING",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBookingByLodgingId(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post("/api/booking/booking", payload);
      return dispatch({
        type: "GET_BOOKING_LODGING_ID",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getFeedback() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/payment?status=");
      console.log(res);
      return dispatch({
        type: "GET_FEEDBACK",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//TRAE HOST POR ID GUEST (EMAIL)
export function getHostByGuestId(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.post("/api/guest/find/host", payload);
      return dispatch({
        type: "GET_HOST_BY_GUEST_ID",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//TRAE GUEST POR HOST ID
export function getGuestByHostId(payload) {
  console.log(payload, 'ES O NO')
  return async function (dispatch) {
    try {
      const res = await axios.post("/api/guest/search/guest/host", payload);
      return dispatch({
        type: "SEARCH_GUEST_BY_HOST_ID",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteLodging(payload) {
  return async function () {
    try {
      const res = await axios.patch("/api/admin/" + payload);
      console.log(res);
      return payload({
        type: "DELETE_LODGING",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(payload) {
  return async function () {
    try {
      const res = await axios.patch("/api/admin/guestvisibility/" + payload);
      console.log(res);
      return payload({
        type: "DELETE_USER",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function hacerAdmin(payload) {
  return async function () {
    try {
      const res = await axios.patch("/api/admin/guestadmin/" + payload);
      console.log(res);
      return payload({
        type: "HACER_ADMIN",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function sacarAdmin(payload) {
  return async function () {
    try {
      const res = await axios.patch("/api/admin/guestadminfalse/" + payload);
      console.log(res);
      return payload({
        type: "SACAR_ADMIN",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getComplaints() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/admin/getcomplaint");
      return dispatch({
        type: "GET_ALL_COMPLAINTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteComplaint(payload) {
  return async function () {
    try {
      const res = await axios.patch("/api/admin/complaintfalse/" + payload);
      console.log(res);
      return payload({
        type: "DELETE_COMPLAINT",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByRangePrice(payload) {
  return {
    type: "FILTER_BY_RANGE_PRICE",
    payload,
  };
}

export function filterByQBeds(payload) {
  return {
    type: "FILTER_BY_Q_BEDS",
    payload,
  };
}

export function filterByQRooms(payload) {
  return {
    type: "FILTER_BY_Q_ROOMS",
    payload,
  };
}

export function filterByQBathrooms(payload) {
  return {
    type: "FILTER_BY_Q_BATHROOMS",
    payload,
  };
}

export function filterByTypeRooms(payload) {
  return {
    type: "FILTER_BY_TYPE_OF_ROOMS",
    payload,
  };
}

export function filterByServices(payload) {
  console.log(payload, "PAYLOAD ACTION");
  return {
    type: "FILTER_BY_SERVICES",
    payload,
  };
}
export function getByUser(user) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/api/admin?email=${user}`);
      return dispatch({
        type: "GET_BY_USER",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBookings() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/booking/");
      return dispatch({
        type: "GET_ALL_BOOKINGS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanFilters() {
  return {
    type: "CLEAN_FILTERS",
  };
}

//FUNCION QUE ALMACENA DATOS DEL USUARIO
/* export function getInfoGuest(){
  return{
    type: 'GET_INFO_LOCAL_STORAGE'
  }
} */

export function cleanDetail(payload){
  
  return{
    type: 'CLEAN_DETAIL',
    payload

  }
}

