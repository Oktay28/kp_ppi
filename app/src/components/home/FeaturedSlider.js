import React, {useEffect} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    makeStyles
} from '@material-ui/core';
import {useFeaturedProductsLazyQuery} from './graphql';
import Loader from '../partials/Loader';
import Img from '../partials/Img';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    slideImg: {
        height: "600px",
        width: "100%",
        objectFit: "cover",
        objectPosition: "top center"
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
        backgroundColor: "rgba(0, 0, 0, .5)"
    },
    slide: {
        padding: "30px",
        cursor: "pointer",
        display: "block"
    }
}))

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

const FeaturedSlider = () => {
    const classes = useStyles();

    const [fetchProducts, {data}] = useFeaturedProductsLazyQuery();

    useEffect(() => {
        fetchProducts();
    }, [])

    if(!data) {
        return <Loader />
    }

    const products = data.featuredProducts || [];

    return (
        <Carousel responsive={responsive} infinite  autoPlay={true}
        timer={3000}
        animation={"slide"}
        indicators={true}
        timeout={300}
        navButtonsAlwaysVisible={true} >
            {
                products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className={classes.slide}>
                        <Img className={classes.slideImg} alt="slider" src={product.image} />
                    </Link>
                ))
            }
         
        </Carousel>
    );
}

export default FeaturedSlider;
