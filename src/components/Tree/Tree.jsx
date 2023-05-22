import TreeNode from "./TreeNode/TreeNode";
import "./Tree.scss";
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
            console.log('managerMap', managerMap);
            console.log('employeeList', employeeList);

            // identify root of a tree by checking which employee's manager is not an employee in filtered team
            let root = Object.keys(managerMap).filter(managerID => {
                return !employeeList.some(emp => emp.id === managerID);
            })
            const rootEmployeeID = managerMap[root][0];
            console.log('rootEmployeeID --->', rootEmployeeID);
            return generateSubtree(managerMap, employeeList, rootEmployeeID);
        }

        // setTree(managerMap);
        // return managerMap;
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
            return (<li>{<TreeNode key={`tn_${currentEmployee.id}`} employee={currentEmployee} />}{subtree}</li>)
        } else {
            return (<li key={`li-${currentEmployeeID}`}>{<TreeNode key={`tn_${currentEmployee.id}`} employee={currentEmployee} />}</li>);
        }
    }

    return (
        <div className="Tree-container">
            <div className="Tree-title">
                {/* {filter === '-1' ? <p> All Employees</p> : <p>{filter} Employees</p> } */}
                {constructTreeFromList(filteredEmployees)}
            </div>
        </div>
    );
}

export default Tree;