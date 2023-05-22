import { useContext } from "react";
import "./TreeNode.scss";
import { DataContext } from "../../../context/DataContext";

function TreeNode ({ employee }) {

    const { updateManager } = useContext(DataContext);

    const handleDragOver = (e) => {
        // console.log('over event', e);
        e.preventDefault();
        // e.dataTransfer.dropEffect = "move";
    }

    const handleOnDrop = (e) => {
        // e.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        const movedEmployee = JSON.parse(e.dataTransfer.getData("emp"));
        console.log('dropped', movedEmployee);
        console.log('in', employee);
        updateManager(movedEmployee, employee);
    }

    const handleOnDragStart = (e) => {
        const movingEmp = JSON.stringify(employee);
        e.dataTransfer.setData('emp', movingEmp);
        // e.preventDefault();

        console.log('drag start event', e, movingEmp);
    }

    return (
        employee.id? 
            <div className="TreeNode" >
                <div className="TreeNode-data" draggable="true" onDragStart={handleOnDragStart}>
                    <p> {employee ? employee.id : ''} - {employee.name}</p>
                </div>
                <div className="TreeNode-children" onDrop={handleOnDrop} onDragOver={handleDragOver}>
                    <div>drop zone</div>
                </div>
            </div>
            :
            <div></div>
    );
}

export default TreeNode;