import { useEffect, useState } from "react";
import User from "./User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDetails from "./UserDetails";
import ReactPlaceholder from "react-placeholder/lib";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";

const getAddressFromApiResponse = (user) => {
    if(user.location){
        return `${user.location?.street?.name} ${user.location?.city}`.trim();
    }
}

const USERS_LIMIT = 10;

const awesomePlaceholder = Array(USERS_LIMIT)
  .fill(true)
  .map((e, i) => i)
  .map((_i, index) => (
    <div key={index} style={{ display: "flex", marginBottom: 10, padding: 15 }}>
      <RectShape color="rgb(205, 205, 205)" style={{ width: 50, height: 50 }} />
      <TextBlock rows={4} color="rgb(205, 205, 205)" style={{maxWidth: 500 }} />
    </div>
  ));

function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        fetch(`https://randomuser.me/api/?results=${USERS_LIMIT}`)
          .then((response) => response.json())
          .then((data) => {
            setTimeout(function () {
              setUsers(
                data.results.map((user) => ({
                  userId: user.login.uuid,
                  name: user.name?.first,
                  surname: user.name?.last,
                  address: getAddressFromApiResponse(user),
                  email: user.email,
                  registeredAt: user.registered?.date.toString(),
                  profileImg: user.picture.thumbnail,
                }))
              );
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <ReactPlaceholder
              type="media"
              rows={4}
              ready={users.length}
              customPlaceholder={awesomePlaceholder}
            >
              <div className="UserList">
                {users.map((user) => (
                  <User
                    key={user.userId}
                    userId={user.userId}
                    name={user.name}
                    surname={user.surname}
                    address={user.address}
                    email={user.email}
                    registeredAt={user.registeredAt}
                    profileImg={user.profileImg}
                  />
                ))}
              </div>
            </ReactPlaceholder>
          </Route>
          <Route path="/users/:id">
            <UserDetails users={users} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default UserList;
