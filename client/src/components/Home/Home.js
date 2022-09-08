
import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import AllCards from "../AllCards/AllCards";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Profile from "../Profile/profile";
import Footer from '../Footer/Footer'
import CarouselHome from "../CarouselHome/CarouselHome";
import { IoChevronUpCircleOutline } from "react-icons/io5";


export default function Home() {
  let guestId = localStorage.getItem("userInfo");
  let user = JSON.parse(guestId)
  let stateLodgings = useSelector((state) => state.lodgings);
  let lodgingsVisibles= stateLodgings.filter(e=> e.Visibility===true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  //PAGINATED
  const [currentPage, setCurrentPage] = useState(1); 
  const [lodgingPerPage, setLodgingPerPage] = useState(10); 
  const indexLastLodging = currentPage * lodgingPerPage;
  const indexFirstLodging = indexLastLodging - lodgingPerPage;
  const currentLodging = lodgingsVisibles.slice(
    indexFirstLodging,
    indexLastLodging
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onClickButton = () => {
    setLodgingPerPage(pageMore => pageMore + 10)
  }

  

  const backTop = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
    <div className={styles.first_container}>
      <NavBar email={user ? user.email : ""} />
      <Menu
        setCurrentPage={setCurrentPage}
        paging={paging}
        lodgingPerPage={lodgingPerPage}
        currentLodging={currentLodging}
      />
      <CarouselHome />
      <AllCards
        setCurrentPage={setCurrentPage}
        paging={paging}
        lodgingPerPage={lodgingPerPage}
        currentLodging={currentLodging}
      />
      <div onClick={onClickButton} className={styles.scrolldown}>
        <div className={styles.chevrons}>
          <div className={styles.chevrondown}></div>
          <div className={styles.chevrondown}></div>
        </div>
      </div>
      <div className={styles.containerButton}>
          <IoChevronUpCircleOutline
            className={styles.buttonUp}
            onClick={backTop}
          >
          </IoChevronUpCircleOutline>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}