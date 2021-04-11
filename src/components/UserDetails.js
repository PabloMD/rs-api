import { useParams } from "react-router";
import User from "./User";

function UserDetails({ users }) {
  const params = useParams();
  const user = users.find((user) => user.userId === params.id);

  return (
    <div className="UserDetails">
      {user ? (
        <User
          userId={user.userId}
          name={user.name}
          surname={user.surname}
          address={user.address}
          email={user.email}
          registeredAt={user.registeredAt}
          profileImg={user.profileImg}
          showLocalization
        />
      ) : (
        <div>Cannot find that user?</div>
      )}
    </div>
  );
}

export default UserDetails;
