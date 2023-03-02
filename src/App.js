import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";
function App() {
    return (
        <Router>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route element={<ChatRoom />} path={"/"} />
                        <Route element={<Login />} path={"/login"} />
                    </Routes>
                    <AddRoomModal />
                    <InviteMemberModal />
                </AppProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
