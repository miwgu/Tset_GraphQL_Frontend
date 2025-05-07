import React, { useEffect, useState } from 'react';
import { useDataFetch } from "../Data/DataFetchProvider";
import UsersList from "./UsersList";
import styles from './Users.module.css';

const Users = () => {
      const { useGetUsers } = useDataFetch();
      const { data, loading, error } = useGetUsers();

      useEffect(() => {
        if (data) {
          console.log("Users: ", data.users);
        }
      }, [data]);

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      return (
          <div className={styles.container} >
              <h2 className={styles.titleContent}>
                All Users
              </h2>
              <div className={styles.content}>
                <UsersList data={data.users} />
              </div>
          </div>
      );
    };
  

export default Users