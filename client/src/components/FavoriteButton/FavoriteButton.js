import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import s from "./FavoriteButton.module.css";
import { useDispatch, useSelector} from "react-redux"
import { addFavorite, getFavorites, deleteFavorite } from '../../Redux/Actions'

export default function Favorite(props) {
const dispatch= useDispatch()
var userEmail= JSON.parse(props.guestInfo).email;
const favorites = useSelector((state) => state.userFavorites);
console.log(favorites)

let userFavs= {
  userEmail: userEmail,
  lodgingId: props.id,
}

useEffect(() => {
  dispatch(getFavorites(userFavs))
}, [dispatch]);



function handleDelete(e){
  dispatch(deleteFavorite(userFavs))
}

function handleClick(e){
    dispatch(addFavorite(userFavs))  
    dispatch(getFavorites(userFavs))
   
    console.log(userFavs)
 // }

 
  } 
  return (
    <div className={s.favContainer}>
        <button onClick={handleClick}  className={s.favButton}>
            <FaHeart className={s.fav}/>
            </button>
        <button onClick={handleDelete}  >
            X
            </button>
        </div>
  ) 
}


