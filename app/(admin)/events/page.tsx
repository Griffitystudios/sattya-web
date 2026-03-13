// import { AdminSidebar } from '@/components/layout/AdminSidebar';
// import { AdminHeader } from '@/components/layout/AdminHeader';
// import { getEvents } from '../../../domains/events/queries/getEvents';

// export const metadata = {
//   title: 'Admin Events - Sattya',
//   description: 'Manage events',
// };

// export default async function AdminEventsPage() {
//   const events = await getEvents();

//   return (
//     <div className="flex">
//       <AdminSidebar />
//       <div className="flex-1">
//         <AdminHeader />
//         <main className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold">Events</h1>
//             <a href="/admin/events/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create Event</a>
//           </div>
//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2 text-left">Title</th>
//                 <th className="border p-2 text-left">Date</th>
//                 <th className="border p-2 text-left">Location</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map(event => (
//                 <tr key={event.id}>
//                   <td className="border p-2">{event.title}</td>
//                   <td className="border p-2">{event.date}</td>
//                   <td className="border p-2">{event.location}</td>
//                   <td className="border p-2 text-center">
//                     <a href={`/admin/events/edit/${event.id}`} className="text-blue-500 mr-4">Edit</a>
//                     <button className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>
//       </div>
//     </div>
//   );
// }

import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
