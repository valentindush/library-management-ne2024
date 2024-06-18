import { Navigate, Route, Routes } from "react-router-dom";
import BooksPage from "./Books";
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
                        <Route path="/" element={<Navigate to={"/books"} />} />
                        <Route path="/books" element={<BooksPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}