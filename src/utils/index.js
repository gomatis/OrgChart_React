const containsValue = (objToSearch, searchText) => {
    return Object.values(objToSearch).some(val => val.toLowerCase().includes(searchText));
};

export default containsValue;