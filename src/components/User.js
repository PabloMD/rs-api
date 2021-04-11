import { Link } from "react-router-dom";
import './User.scss';

const formattedDate = (dateString) =>
  dateString ? new Date(dateString).toDateString() : "";

function User(props){
    const { userId, name, surname, address, email, registeredAt, profileImg } = props;

    return (
      <div className="User">
        <div>
          <img src={profileImg} alt="profile" />
        </div>
        <ul>
          <li>
            <strong>Name: </strong>
            <Link to={`/users/${userId}`}>{name || "Name was not passed"}</Link>
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