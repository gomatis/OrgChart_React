import TreeNode from "./TreeNode/TreeNode";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Tree () {

    const {filteredEmployees, reporteeMap} = useContext(DataContext);

    // const [isVertical, setIsVertical] = useState(false); // To Do allow toggle between vertical/horizontal
    const isVertical = false;

    const constructTreeFromList = (employeeList) => {
        if(reporteeMap && Object.keys(reporteeMap).length > 0) {
            // identify root of a tree by checking which employee's manager is not an employee in filtered team
            let root = Object.keys(reporteeMap).filter(managerID => {
                return !employeeList.some(emp => emp.id === managerID);
            })
            const rootEmployeeID = reporteeMap[root][0];
            return generateSubtree(reporteeMap, employeeList, rootEmployeeID);
        }
    };

    const generateSubtree = (reporteeMap, employeeList, currentEmployeeID) => {
        const currentEmployee = employeeList.filter(employee => employee.id === currentEmployeeID)[0];
        let childNodes = reporteeMap[currentEmployee.id];
        if(childNodes && childNodes.length > 0) {
            let subtree = childNodes.map( (childNode) => {
                return (<ul key={`ul-${childNode}`}>
                    {generateSubtree(reporteeMap, employeeList, childNode)}
                </ul>);
            })
            return (<li>{<TreeNode key={`tn_${currentEmployee.id}`} employee={currentEmployee} />} <div className="row">{subtree}</div></li>)
        } else {
            return (<li key={`li-${currentEmployeeID}`}>{<TreeNode key={`tn_${currentEmployee.id}`} employee={currentEmployee} />}</li>);
        }
    }

    return (
        <div className={isVertical ? "Tree-container vertical" : "Tree-container horizontal"}>
            <ul>
                {/* {filter === '-1' ? <p> All Employees</p> : <p>{filter} Employees</p> } */}
                {constructTreeFromList(filteredEmployees)}
            </ul>
        </div>
    );
}

export default Tree;