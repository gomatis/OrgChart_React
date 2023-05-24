import { useContext, useEffect, useState } from "react";
import ListItem from "../ListItem";
import Filter from "../Filter";
import Search from "../Search";
import containsValue from "../../utils";
import { DataContext } from "../../context/DataContext";

function List() {

    const {filteredEmployees, filter } = useContext(DataContext);

    const [searchedEmployees, setSearchedEmployees] = useState(filteredEmployees);

    useEffect(()=> {
      setSearchedEmployees(filteredEmployees)
    }, [filteredEmployees]);

    const onSearchTextChange = (newSearchText = "") => {
      if(newSearchText === "") {
        setSearchedEmployees(filteredEmployees);
      }
      const caseIgnoreSearchText = newSearchText.toLowerCase();
      let employeesMatchingSearch = [];
      if(filter !== '-1') {
        employeesMatchingSearch = filteredEmployees.filter((employee) => {
          let exists = employee.team === filter && containsValue(employee, caseIgnoreSearchText);
          return exists;
        })
      } else {
        employeesMatchingSearch = filteredEmployees.filter((employee) => {
          let exists = containsValue(employee, caseIgnoreSearchText);
          return exists;
        })
      }
      setSearchedEmployees(employeesMatchingSearch);
    }

    return (
        <div className="List-wrapper">
          <Filter label="Teams" />
          <Search setSearch={onSearchTextChange}/>
          <ul className="List-container">
              {/* <li key='count'>Showing {searchedEmployees.length} out of {filteredEmployees.length}</li> // TO DO: store total count  */}
              {searchedEmployees ? searchedEmployees.map(employee => <ListItem key={`ListItem-${employee.id}`} itemData={employee} />) : <li key="0"><span>Empty rn</span></li>}
          </ul>
        </div>
    );
}

export default List;