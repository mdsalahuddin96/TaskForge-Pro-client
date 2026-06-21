import { getUserSession, requiredRole } from "@/lib/core/session";
import TasksTable from "./TasksTable";
import { getTaskByClientId } from "@/lib/api/getTaskByClientId";

export default async function MyTasksView() {
  const user=await getUserSession()
  const tasks=await getTaskByClientId(user?.id)
  return (
    <TasksTable tasks={tasks}/>
  );
}