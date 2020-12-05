import {useLocation} from 'react-router-dom';

const useUrlModal = () => {
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    //query.set("modal", "cart");

    console.log(!query.toString())

    function setModal(modal) {
        const stringQuery = query.toString();
        if(modal) {
            if(stringQuery) {
                return `${stringQuery}&modal=${modal}`
            } else {
                return `?`
            }
        } 
    
    }

    return [query, setModal]
}

export default useUrlModal;
