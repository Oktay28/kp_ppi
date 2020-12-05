import {useLocation} from 'react-router-dom';

const useUrlParams = () => {
    const {search, pathname} = useLocation();

    const query = new URLSearchParams(search);
    const modal = query.get("modal");

    query.delete("modal");

    function addModal(modal) {
        query.set("modal", modal);
        return `${pathname}?${query.toString()}`;
    }

    return [
        modal,
        addModal,
        `${pathname}?${search && query.toString()}`,
        query
    ];
}

export default useUrlParams;
