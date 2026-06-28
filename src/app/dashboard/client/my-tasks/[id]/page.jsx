
import TaskDetailsManagementClient from "./TaskDetailsManagementClient";
import { getTaskDetails } from "@/lib/api/getTaskDetails";


export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  const taskData=await getTaskDetails(id)

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TaskDetailsManagementClient taskData={taskData} />
      </div>
    </div>
  );
}