// import {
//     Text,
//   } from 'braid-design-system';
import React, { Fragment } from 'react';
import * as User from '../Hook/User';

export default () => {

    const [users, setUsers]: [any[], (users: any[]) => void] = React.useState([{}]);

    React.useEffect(() => {
        User.getDetail().then((response) => {
            setUsers(response);
        })
    }, []);

    return (<Fragment>
        <div>
            <span>Users</span>
            {
                users.length > 0? (
                    users.map((user:any) => {
                        <span>user.name</span>
                    })
                ): <span>no user</span>
            }
        </div>
    </Fragment>)
};