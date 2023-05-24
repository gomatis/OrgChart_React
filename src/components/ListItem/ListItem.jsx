function ListItem({itemData}) {
    return (
        <li key={itemData.id} className="ListItem">
            <p><span className="label">Name : </span> <span className="value name">{itemData.name} </span></p>
            <p><span className="label">Designation : </span> <span className="value designation">{itemData.designation} </span></p>
            <p><span className="label">Team : </span> <span className="value team">{itemData.team} </span></p>
        </li>
    );
}

export default ListItem;