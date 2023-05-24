function Search({setSearch}) {
    const onInputChange = (event) => {
        // to handle any min 3 char search limitation
        setSearch(event.target.value);
    }
    return (
        <div className="Search">
            <p>Search :</p>
            <input type="text" onChange={onInputChange} />
        </div>
    );
}

export default Search;