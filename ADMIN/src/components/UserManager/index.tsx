import React, { useEffect, useState } from "react";
import userApi from "../../api/User.Api";
import "./index.css";
import LoadingComponent from "../Loading";
import { ISearchUser } from "../../types/type";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // Get All User
  const getApiUser = async () => {
    try {
      const response = await userApi.getAllUser();
      const managerUser = response.data;
      console.log(managerUser);
      setUsers(managerUser);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getApiUser();
  }, []);

  // Call Api Block User
  const handleBlockUser = async (id: any) => {
    const userId: any = await userApi.getUserById(id);

    if (!userId) {
      console.log("User không tồn tại");
      return;
    }

    // Kiểm tra vai trò "admin"
    if (userId.data.role === "admin") {
      toast.error("Không thể block người dùng với vai trò 'admin'");
      return;
    }

    // Đảo ngược trạng thái block
    const idBlockUser = userId.data.isBlocked === true ? false : true;
    userId.isBlocked = idBlockUser;

    await userApi.blockUser(id, userId);
    getApiUser();
  };

  // search value
  const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response: any = await userApi.searchUser({
        lastname: e.target.value,
      } as ISearchUser);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper-home">
      <LoadingComponent />
      <ToastContainer/>
      <div className="content-home mt-550">
        <h2>Manager User</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search for user..."
          onChange={handleOnchange}
        ></input>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FistName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users?.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <button
                        className="btn-edit"
                        id="btn"
                        onClick={() => {
                          handleBlockUser(user._id);
                        }}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
