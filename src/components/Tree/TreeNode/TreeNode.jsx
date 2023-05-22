import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

function TreeNode ({ employee }) {

    const { updateManager } = useContext(DataContext);

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleOnDrop = (e) => {
        const movedEmployee = JSON.parse(e.dataTransfer.getData("emp"));
        updateManager(movedEmployee, employee);
    }

    const handleOnDragStart = (e) => {
        const movingEmp = JSON.stringify(employee);
        e.dataTransfer.setData('emp', movingEmp);
    }

    return (
        employee.id? 
            <div className="TreeNode" >
                <div>
                    <div className="parent-marker">|</div>
                    <div className="TreeNode-data" draggable="true" onDragStart={handleOnDragStart}>
                        <p className="name">{employee.name}</p>
                        <p>{employee.designation}</p>
                        <p>{employee.team}</p>
                    </div>
                    <div onDrop={handleOnDrop} onDragOver={handleDragOver}>
                        <div className="TreeNode-drop"></div>
                    </div>
                </div>
            </div>
            :
            <div></div>
    );
}

export default TreeNode;