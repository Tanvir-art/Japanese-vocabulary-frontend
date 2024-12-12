

const AdminHome = () => {
    return (
        <div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded shadow hover:shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-600">120</p>
                </div>
                <div className="bg-white p-6 rounded shadow hover:shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800">Total Lessons</h2>
                    <p className="text-3xl font-bold text-blue-600">25</p>
                </div>
                <div className="bg-white p-6 rounded shadow hover:shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800">Total Vocabularies</h2>
                    <p className="text-3xl font-bold text-blue-600">450</p>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
