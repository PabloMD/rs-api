import { Link } from "react-router-dom";
import './User.scss';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const formattedDate = (dateString) =>
  dateString ? new Date(dateString).toDateString() : "";

function User(props){
    const {
      userId,
      name,
      surname,
      address,
      email,
      registeredAt,
      profileImg,
      location,
      showLocalization
    } = props;

    const locationPos = [location.latitude, location.longitude];
    
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
        {showLocalization && (
          <div className="location">
            <MapContainer
              center={locationPos}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={locationPos}>
                <Popup>{address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    );
}

export default User;