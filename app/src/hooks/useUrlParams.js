import {useLocation} from 'react-router-dom';

const useUrlParams = () => {
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    return query;
}

export default useUrlParams;
