import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    makeStyles
} from '@material-ui/core';
import Img from '../partials/Img';

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

const ProductSlider = ({images}) => {
    const classes = useStyles();

    return (
        <Carousel responsive={responsive} infinite >
            {
                images.map(image => (
                    <div key={image.id}>
                        <Img className={classes.slideImg} alt="slider" src={image.url} />
                    </div>
                ))
            }
           
        </Carousel>
    );
}

export default ProductSlider;
