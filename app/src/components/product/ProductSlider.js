import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    slideImg: {
        height: "700px",
        width: "100%",
        objectFit: "cover",
        [theme.breakpoints.down('sm')]: {
            height: "400px"
        },
    },

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

const ProductSlider = () => {
    const classes = useStyles();

    return (
        <Carousel responsive={responsive} infinite >
            <div>
                <img className={classes.slideImg} alt="slider" src="https://scx2.b-cdn.net/gfx/news/hires/2017/goes16satell.jpg" />
            </div>
            <div>
                <img className={classes.slideImg} alt="slider" src="https://photojournal.jpl.nasa.gov/jpeg/PIA23689.jpg" />
            </div>
            <div>
                <img className={classes.slideImg} alt="slider" src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_960_720.jpg" />
            </div>
        </Carousel>
    );
}

export default ProductSlider;
