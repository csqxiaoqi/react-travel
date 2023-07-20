import React from "react";
import styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from 'antd';
import carousel1 from '../../assets/images/carousel_1.jpg'
import carousel2 from '../../assets/images/carousel_2.jpg'
import carousel3 from '../../assets/images/carousel_3.jpg'
export const Carousel:React.FC = ()=>{
    return(
        <AntCarousel className={styles.slider} autoplay>
            <Image src={carousel1}></Image>
            <Image src={carousel2}></Image>
            <Image src={carousel3}></Image>
        </AntCarousel>
    )
}