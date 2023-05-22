import TreeNode from "./TreeNode/TreeNode";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Tree () {

    const {filteredEmployees} = useContext(DataContext);

    const constructTreeFromList = (employeeList) => {
        const managerMap = {};
        if(employeeList && employeeList.length) {
            for(let employee of employeeList) {
                if(managerMap.hasOwnProperty(employee.managerID)){
                    managerMap[employee.managerID].push(employee.id);
                } else {
                    managerMap[employee.managerID] = [employee.id];
                }
            }
           
            // identify root of a tree by checking which employee's manager is not an employee in filtered team
            let root = Object.keys(managerMap).filter(managerID => {
                return !employeeList.some(emp => emp.id === managerID);
            })
            const rootEmployeeID = managerMap[root][0];
            return generateSubtree(managerMap, employeeList, rootEmployeeID);
        }
    };

    const generateSubtree = (managerMap, employeeList, currentEmployeeID) => {
        // return <p>{managerMap.length} --- {currentEmployee.id}</p>
        const currentEmployee = employeeList.filter(employee => employee.id === currentEmployeeID)[0];
        let childNodes = managerMap[currentEmployee.id];
        if(childNodes && childNodes.length > 0) {
            let subtree = childNodes.map( (childNode) => {
                return (<ul key={`ul-${childNode}`}>
                    {generateSubtree(managerMap, employeeList, childNode)}
                </ul>);
            })
            return (<li>{<TreeNode key={`tn_${currentEmployee.id}`} employee={currentEmployee} />} <div className="row">{subtree}</div></li>)
        } else {
            return (<li key={`li-${currentEmployeeID}`}>{<TreeNode key={`tn_${currentEmployee.id}`} employee={currentEmployee} />}</li>);
        }
    }

    return (
        <div className="Tree-container">
            <ul>
                {/* {filter === '-1' ? <p> All Employees</p> : <p>{filter} Employees</p> } */}
                {constructTreeFromList(filteredEmployees)}
            </ul>
        </div>
    );
}

export default Tree;