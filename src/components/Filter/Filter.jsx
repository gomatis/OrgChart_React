import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Filter({label=""}) {

    const { setFilter, teams } = useContext(DataContext);
    return (
        <div className="Filter">
            <p>{label} :</p>
            <select defaultValue={-1} onChange={(e) => setFilter(e.target.value)}>
                <option key={'-1'} value='-1'>All</option>
                {(teams && teams.length > 0) ? teams.map(value => <option key={value}>{value}</option>) : <option>No options available</option>}
            </select>
        </div>
    );
}

export default Filter;