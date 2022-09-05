import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector} from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom";
import style from "./FormLodging.module.css";
import { postGuest, postLodging, getCountry} from "../../Redux/Actions";
import validate from "./validation";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import NavBar from "../NavBar/NavBar";
import Swal from 'sweetalert'



export default function FormLodging() {
  const [coordinates, setCoordinates] = useState({lat: -34.397,
    lng: 150.644,});
  const [address, setAddress] = useState("");
  const params = useParams()
  const dispatch= useDispatch()
  const countries = useSelector((state) => state.country)
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    title: "",
    lodgingType: "",
    currency:"",
    guests: "",
    rooms: "",
    typeOfRoom:"",
    beds:"",
    bathrooms:"",
    ownBathroom:"",
    price: "",
    city:"",
    country: "",
    address: "",
    numOfGuests:"",
    checkInHour:"",
    checkOutHour:"",
    description: "",
    picture:"",
    latitud:"",
    longitud:""
  })    
  useEffect(() => {
    dispatch(getCountry())
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      mapId: "22d661f3188bcd6d",
    }),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  
  const onChange = (e) => {
    setAddress(e.target.value);
    setInput({...input, address: e.target.value})
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if(data.results.length === 0){
        return Swal(
          'No se encontro la dirección','','warning',{buttons:false,timer:3500}
        )
      }
    setInput({...input, latitud: data.results[0].geometry.location.lat, longitud: data.results[0].geometry.location.lng})
    setCoordinates(data.results[0].geometry.location);
    setErrors({latitud:""})
  };
 
  const handleClickDirection = (e) => {
    onSubmit(e);
  }

  // const handleEditAddres = (e) => {
  //   e.preventDefault()
  //   setInput({...input, address: "", longitud: "", latitud: ""})
  //   setErrors({latitud:"sad"})
  // }
    
  function handleDelete(){
    document.getElementById("file").click()
  }
  
  function handleChange(e){
    if(e.target.name!== "picture")
    {  
      setInput({
        ...input,
        [e.target.name] : e.target.value,
      })
      setErrors(validate({
        ...input,
      [e.target.name] : e.target.value
  }))
}
else{
  
  if(document.getElementById("imgPreview0"))
  {
    for(let i = 0; i<3 ; i++)
    {
      if(document.getElementById("imgPreview" + i))
      {
        document.getElementById("imgPreview" + i).remove();
      }
    }
  }
  for(let i= 0; i<e.target.files.length;i++ )
  {
    let  reader = new FileReader()
    reader.readAsDataURL(e.target.files[i])
    reader.onload = function(){
      let preview = document.getElementById("preview")
      let imagen=document.createElement("img")
      imagen.src = reader.result;
      imagen.style.width = "200px"
      imagen.id= "imgPreview"+ i
      preview.append(imagen)
    }
  }
  if(!document.getElementById("reset"))
  {
    let buttonDelet = document.getElementById("buttonDelet")
    let boton=document.createElement("button")
    boton.type="button"
    boton.id= "reset"
    boton.onclick = handleDelete
    boton.innerHTML = "Cambiar seleccion";
    buttonDelet.append(boton)
  }
  let imgs = Object.entries(e.target.files).length
  setInput({
    ...input,
    [e.target.name] : e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name] : imgs
  }))
}
}

if (!isLoaded) return <div>Loading...</div>;

let hostId = params.hostId
console.log(hostId)
return (
  <div>
    <NavBar />
    <div className={style.containerUser}>
      {/* <form action= {`${process.env.REACT_APP_API}/api/lodging/${hostId}`}  method="POST" encType="multipart/form-data" > */}
      <form
        encType="multipart/form-data"
        action={`http://localhost:3001/api/lodging/${hostId}`}
        method="POST"
      >
        <script src="./preview.js"></script>
        <div className={style.titulo}>
          <h1 className={style.title}>Registra tu alojamiento</h1>
        </div>
        <div className={style.containerForm}>
          <input
            type="text"
            name="title"
            value={input.title}
            placeholder="Titulo del hospedaje"
            onChange={handleChange}
          />
          <p>{errors.title}</p>
          <select onChange={handleChange} name="lodgingType">
            <option disabled selected>
              Tipo de hospedaje
            </option>
            <option>Cabaña</option>
            <option>Albergue</option>
            <option>Hostal</option>
            <option>Hotel</option>
            <option>Casa</option>
            <option>Apartamento</option>
            <option>habitacion</option>
          </select>
          <p>{errors.lodgingType}</p>
          <select onChange={handleChange} name="guests">
            <option disabled selected>
              Huespedes
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>+10</option>
          </select>
          <p>{errors.guests}</p>
          <select onChange={handleChange} name="rooms">
            <option disabled selected>
              habitaciones
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>+5</option>
          </select>
          <p>{errors.rooms}</p>
          <select onChange={handleChange} name="beds">
            <option disabled selected>
              Camas
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>+5</option>
          </select>
          <p>{errors.beds}</p>
          <select onChange={handleChange} name="currency">
            <option disabled selected>
              moneda:
            </option>
            <option>USD</option>
            <option>EUR</option>
            <option>ARS</option>
            <option>CLP</option>
            <option>MXN</option>
          </select>
          <p>{errors.currency}</p>
          <input
            type="number"
            name="price"
            min="1"
            step="any"
            value={input.price}
            placeholder="Precio por noche"
            onChange={handleChange}
          />
          <p>{errors.price}</p>
          <label>
            Baño propio
            <input type="checkbox" onChange={handleChange} name="ownBathroom" />
          </label>
          <select onChange={handleChange} name="bathrooms">
            <option disabled selected>
              Baños
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>+4</option>
          </select>
          <p>{errors.bathrooms}</p>
          <select onChange={handleChange} name="country">
            <option value="" disabled selected>
              País
            </option>
            {countries.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            value={input.city}
            placeholder="Ciudad"
            onChange={handleChange}
          />
          <p>{errors.city}</p>
          <div className={style.containerMap}>
            <GoogleMap
              zoom={15}
              center={coordinates}
              mapContainerStyle={{
                height: "40vh",
                width: "40vw",
              }}
              options={options}
            >
              <MarkerF position={coordinates}></MarkerF>
            </GoogleMap>
            <input
              name="address"
              value={input.address}
              onChange={onChange}
              type="text"
              placeholder="Direccion:"
              className={style.input}
              title="Debes verificar la direccion"
              required={true}
            />
            <p>{errors.address}</p>
            <p>{errors.latitud}</p>
            <input
              value={input.latitud}
              name="latitud"
              onChange={(e) => onChange(e)}
              type="text"
              className={style.inputLtgLtg}
            ></input>
            <input
              value={input.longitud}
              name="longitud"
              onChange={(e) => onChange(e)}
              type="text"
              className={style.inputLtgLtg}
            ></input>
          </div>
          <button onClick={handleClickDirection}>Verificar dirección</button>
          {/* <button onClick={handleEditAddres}>Editar</button> */}
          <textarea
            type="text"
            name="description"
            value={input.description}
            placeholder="Descripcion"
            onChange={handleChange}
          />
          <p>{errors.description}</p>
          <input
            type="file"
            name="picture"
            id="file"
            value={input.picture}
            placeholder="picture"
            onChange={handleChange}
            multiple
          />
          <div id="contenedorHandle">
            <div id="preview"></div>
            <div id="buttonDelet"></div>
          </div>
          <p>{errors.picture}</p>
          <h3>servicios</h3>
          <div className={style.services}>


            <label>WIFI
              <input name="wifi" checked="false" type="checkbox" />
              <span className={style.checkbox} />
            </label>

            {/*  <label>WIFI <input type="checkbox" name="wifi" className=""/></label> */}
            <label>AC
              <input name="ac" checked="false" type="checkbox" />
              <span className={style.checkbox} />
            </label>
            {/* <label>
              AC <input type="checkbox" name="ac" />
            </label> */}

            <label>TV
              <input name="tv" checked="false" type="checkbox" />
              <span className={style.checkbox} />
            </label>

            {/* <label>
              TV <input type="checkbox" name="tv" />
            </label> */}
            <label>
              securidad <input type="checkbox" name="security" />
            </label>
            <label>
              Limpieza <input type="checkbox" name="cleaning" />
            </label>
            <label>
              Estacionamiento <input type="checkbox" name="parking" />
            </label>
            <label>
              Lavanderia <input type="checkbox" name="laundry" />
            </label>
            <label>
              Agua caliente <input type="checkbox" name="hotWater" />
            </label>
            <label>
              cocina <input type="checkbox" name="kitchen" />
            </label>
            <label>
              Piscina <input type="checkbox" name="pool" />
            </label>
            <label>
              Comedor <input type="checkbox" name="dining" />
            </label>
            <label>
              Mascotas <input type="checkbox" name="pets" />
            </label>
          </div>
        </div>
        {Object.entries(errors).length === 0 &&
        input.title !== "" &&
        input.picture !== "" &&
        input.latitud !== "" ? (
          <div>
            <button className={style.button} type="submit">
              Crear hospedaje
            </button>
          </div>
        ) : (
          <div>
            <button className={style.button} disabled type="submit">
              Crear hospedaje
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
);
}