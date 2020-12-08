import React from 'react';
import MainSlider from './MainSlider';
import {Link} from 'react-router-dom';
import Img from '../partials/Img';
import FeaturedSlider from './FeaturedSlider';

import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    banner: {
        width: "100%",
        objectFit: "cover",
        transformOrigin: "center center",
        transition: "all .3s",
        cursor: "pointer",
        "&:hover": {
            transform: "scale(1.02)"
        }
    }
}));

const Home = () => {

    const classes = useStyles();

    return (
        <div>
            <div className="mb-45">
                <MainSlider />
            </div>

            <div>
                <Link to="/products?discount=1">
                    <Img src="/public/images/sale.png" className={classes.banner} />
                </Link>
            </div>

            <div className="mb-45">
                <FeaturedSlider />
            </div>

        </div>
    );
}

export default Home;
