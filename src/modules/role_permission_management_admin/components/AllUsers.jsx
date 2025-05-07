import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../controller/role_permission_controller";
import UserCard from "./UserCard";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const users = await getAllUsers();
      setAllUsers(users || []); // Fallback to empty array if users is undefined
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Typography className="text-center text-xl col-span-full">
          Loading users...
        </Typography>
      ) : error ? (
        <Typography className="text-center text-xl col-span-full text-red-500">
          {error}
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {allUsers.length === 0 ? (
            <Typography className="text-center text-xl col-span-full">
              No users found!
            </Typography>
          ) : (
            allUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsers;