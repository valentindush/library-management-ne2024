import { Navigate, Route, Routes } from "react-router-dom";
import EmployeesPage from "./Employee";
import LaptopsPage from "./Laptop";
import Header from "../components/Header";
import CustomSidebar from "../components/sidebar/Sidebar";

export default function Home() {

    return (
        <div className="flex h-screen">
            <CustomSidebar />
            <div className="w-full overflow-auto">
                <Header />
                <div className="p-4 px-8">
                    <Routes>
                        <Route path="/" element={<Navigate to={"/employees"} />} />
                        <Route path="/employees" element={<EmployeesPage />} />
                        <Route path="/laptops" element={<LaptopsPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}