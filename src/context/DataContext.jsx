import { createContext, useCallback, useEffect, useState } from "react";

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [filter, setFilter] = useState("-1");
  const [employeesList, setEmployeesList] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const updateEmployee = useCallback((employeeToUpdate) => {
    if (employeeToUpdate) {
      let updatedEmpList = employeesList.map(emp => {
        if (emp.id === employeeToUpdate.id) {
          return employeeToUpdate;
        } else {
          return emp;
        }
      })
      setEmployeesList(updatedEmpList);
    }
  }, [employeesList]);

  const getAllTeams = (employees) => {
    let identifiedTeams = [];
    if (employees && employees.length > 0) {
      employees.forEach(employee => {
        if (!identifiedTeams.includes(employee.team)) {
          identifiedTeams.push(employee.team);
        }
      });
    }
    return identifiedTeams;
  }

  useEffect(()=> {
    // fetch all employees

    setLoading(true);
    fetch('/api/employees')
    .then(res => res.json())
    .then(
      (result) => {
        const empList = result.employees;
        const teamList = getAllTeams(empList);
        setEmployeesList(empList);
        setFilteredEmployees(empList);
        setTeams(teamList);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    )
  }, []);

  useEffect(()=> {
    if(employeesList && employeesList.length> 0) {
      if (filter === '-1') {
        // -1 is the key used to denote no filtering is needed
        setFilteredEmployees(employeesList);
      } else {
        let filteredList = employeesList.filter(employee => (employee.team === filter));
        setFilteredEmployees(filteredList);
      }
    }
  }, [filter, employeesList]);

  const updateManager = (movedEmployee, newManager) => {
    let updatedJson = {
      ...movedEmployee,
      managerID: newManager.id,
      team: newManager.team
      // TO DO: update team for all reportees fo moved employee as well OR reassign the managerID of all reportees to skip-level manager
    };
    setLoading(true);
    fetch(`/api/employees/${movedEmployee.id}`,{
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(updatedJson)
    })
    .then(res => res.json())
    .then(
      (result) => {
        updateEmployee(result.employee);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    )
};


  return <DataContext.Provider 
    value={{ filter, setFilter, filteredEmployees, teams, loading, error, updateManager }}>
      {children}
    </DataContext.Provider>
}

export default DataProvider;
