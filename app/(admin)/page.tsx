// import { AdminSidebar } from '@/components/layout/AdminSidebar';
// import { AdminHeader } from '@/components/layout/AdminHeader';

export const metadata = {
  title: "Admin Dashboard - Sattya",
  description: "Admin dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="flex">
      {/* <AdminSidebar /> */}
      <div className="flex-1">
        {/* <AdminHeader /> */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-600">Events</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-600">Blogs</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <p className="text-2xl font-bold">1</p>
              <p className="text-gray-600">Users</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
