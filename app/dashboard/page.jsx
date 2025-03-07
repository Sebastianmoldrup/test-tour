import FileInput from "../components/FileInput";
import { DashboardProvider } from "./DashboardContext";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <FileInput />
      </div>
    </DashboardProvider>
  );
}
