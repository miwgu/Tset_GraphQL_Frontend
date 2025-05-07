import React from 'react';
import styles from './UsersList.module.css';

const UsersList = ({ data }) => {
    if (!data || data.length === 0) return <div>No users found!</div>;
    console.log("all users: ", data)

    return (
        <div className={styles.tableContainer}>
            <table className={styles.usersTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
