const formattedDate = (dateString) =>
  dateString ? new Date(dateString).toDateString() : "";

function User(props){
    const { name, surname, address, email, registeredAt, profileImg } = props;

    return (
      <div className="User">
        <ul>
          <li>
            <img src={profileImg} alt="profile" />
          </li>
          <li>
            <strong>Name: </strong>
            {name || "Name was not passed"}
          </li>
          <li>
            <strong>Surname: </strong>
            {surname || "Surname  was not passed"}
          </li>
          <li>
            <strong>Address: </strong>
            {address || "brak"}
          </li>
          <li>
            <strong>Email: </strong>
            {email}
          </li>
          <li>
            <strong>Registered: </strong>
            {formattedDate(registeredAt)}
          </li>
        </ul>
      </div>
    );
}

export default User;