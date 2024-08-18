import { Routes, Route } from "react-router-dom";

import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Logout } from "./Components/Logout/Logout";
import Forum from "./Components/Forum/Forum";
import { ThreadPage } from "./Components/Forum/ThreadPage/ThreadPage";
import { Settings } from "./Components/Settings/Settings";
import { Profile } from "./Components/Profile/Profile";
import { RouteGuard } from "./Components/RouteGuard/RouteGuard";

import { AuthProvider } from "./contexts/AuthContext";
import { ForumProvider } from "./contexts/ForumContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <UserProvider>
                    <ForumProvider>
                        <Header />
                        <main id="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                {/* Public routes */}
                                <Route path="/forum" element={<Forum />} />
                                <Route path="/forum/:postId" element={<ThreadPage />} />
                                <Route path="/Profile/:userId" element={<Profile />} />

                                {/* Protected routes under RouteGuard */}
                                <Route element={<RouteGuard />}>
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </ForumProvider>
                </UserProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
