import { useEffect, useState } from "react";
import User from "./User";

const getAddressFromApiResponse = (user) => {
    if(user.location){
        return `${user.location?.street?.name} ${user.location?.city}`.trim();
    }
}
function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        fetch("https://randomuser.me/api/?results=10")
        .then(response => response.json())
        .then(data => {
            setUsers(data.results);
        })
        .catch(error => {
                    console.error(error);
        });
    }, []);

  return (
    <div>
      {users.map((user) => (
        <User
          key={user.login.uuid}
          name={user.name?.first}
          surname={user.name?.last}
          address={getAddressFromApiResponse(user)}
          email={user.email}
          registeredAt={user.registered?.date.toString()}
          profileImg={user.picture.thumbnail}
        />
      ))}
    </div>
  );
}

export default UserList;
