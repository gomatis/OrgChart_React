import "./ListItem.scss";

function ListItem({itemData}) {
    return (
        <li key={itemData.id} className="ListItem">
            <span>Name : {itemData.name}</span>
            <span>Designation : {itemData.designation}</span>
            <span>Team : {itemData.team}</span>
        </li>
    );
}

export default ListItem;