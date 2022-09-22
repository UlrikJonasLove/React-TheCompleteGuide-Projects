import { Card } from "../UI/Card";
import css from "./style/Users.module.css";

export const UsersList = (props) => {
  return (
    <Card className={css.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age}) years old
          </li>
        ))}
      </ul>
    </Card>
  );
};
