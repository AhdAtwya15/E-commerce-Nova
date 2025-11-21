import { Outlet } from "react-router-dom"
import AdminSideBar from "../../Compenets/Admin/AdminSideBar"

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
          <div className="hidden sm:block sm:flex-shrink-0">
            <AdminSideBar />
          </div>
          <div className="flex-1 min-w-0">
            <div className="sm:hidden mb-4 flex justify-start">
              <AdminSideBar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard