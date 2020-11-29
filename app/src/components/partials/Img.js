import React, {memo} from 'react';
import {CONFIG_HOST} from '../../config.json';

function getImageUrl(src) {
    return `${CONFIG_HOST}${src}`;
}

const Img = ({src, ...rest}) => {
    return (
        <img alt="img" src={getImageUrl(src)} {...rest} />
    );
}

export default memo(Img)
export {
    getImageUrl
}
