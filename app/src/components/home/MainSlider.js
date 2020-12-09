import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    makeStyles
} from '@material-ui/core';
import Img from '../partials/Img';

const useStyles = makeStyles(theme => ({
    slideImg: {
        height: "600px",
        width: "100%",
        objectFit: "cover",
        objectPosition: "left center",
        [theme.breakpoints.down("xs")]: {
            height: "300px"
        }
    },
    slideLegend: {
        position: "absolute",
        fontSize: "30px",
        color: theme.palette.primary.contrastText,
        fontWeight: "bold",
        left: "50%",
        bottom: "20%",
        transform: "translateX(-50%)",
        padding: "30px",
        borderRadius: "8px",
        backgroundColor: "rgba(0, 0, 0, .5)",
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    }
}))

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

const MainSlider = () => {
    const classes = useStyles();

    return (
        <Carousel responsive={responsive} infinite >
            <div>
                <Img className={classes.slideImg} alt="slider" src="/public/images/slide1.jpg" />
            </div>
            <div>
                <Img className={classes.slideImg} alt="slider" src="/public/images/slide2.jpg" />
            </div>
            <div>
                <Img className={classes.slideImg} alt="slider" src="/public/images/slide3.jpg" />
            </div>
        </Carousel>
    );
}

export default MainSlider;
