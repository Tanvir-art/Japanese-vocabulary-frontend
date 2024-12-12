
import { useGetUsersQuery, useUpdateUserRoleMutation } from "../../redux/api/authApi";
// import { toast } from "react-toastify";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
}


const UserManagement: React.FC = () => {
    const { data: users = [], isLoading, isError } = useGetUsersQuery({});
    const [updateUserRole] = useUpdateUserRoleMutation();
    // const [selectedUser, setSelectedUser] = useState("");

    const handleRoleChange = async (id: string, role: string) => {
        try {
            await updateUserRole({ id, role }).unwrap();
            //   toast.success(`User role updated to ${role}`);
            // setSelectedUser("");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            //   toast.error("Failed to update user role");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to fetch users</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">User Management</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md rounded">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{user.role}</td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex space-x-2">
                                        {user.role === "user" ? (
                                            <button
                                                onClick={() => handleRoleChange(user._id, "admin")}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            >
                                                Promote to Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRoleChange(user._id, "user")}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Demote to User
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
