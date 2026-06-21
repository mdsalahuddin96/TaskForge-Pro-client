import { getUserSession, requiredRole } from "@/lib/core/session";
import TasksTable from "./TasksTable";
import { getTasks } from "@/lib/api/getTasks";

export default async function MyTasksView() {
  const user=await getUserSession()
  const tasks=await getTasks(user?.id)
  return (
    <TasksTable tasks={tasks}/>
  );
}