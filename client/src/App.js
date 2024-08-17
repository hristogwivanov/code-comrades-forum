import { Routes, Route } from "react-router-dom";
import { auth, firestore } from "./firebase";

import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Logout } from "./Components/Logout/Logout";
import Forum from "./Components/Forum/Forum";
import { ThreadPage } from "./Components/Forum/ThreadPage/ThreadPage";
import { Settings } from "./Components/Settings/Settings";

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
                        {/* <!-- Main Content --> */}

                        <main id="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/forum" element={<Forum />} />
                                <Route
                                    path="/forum/:postId"
                                    element={<ThreadPage />}
                                />
                                <Route
                                    path="/settings"
                                    element={<Settings />}
                                />

                                {/*
                    <Route element={<RouteGuard />}>
                    <Route path='/catalog/:postId/edit' element={
                        <PostOwner>
                        <EditPost />
                        </PostOwner>
                    } />
                    <Route path='/create-game' element={<CreateGame />} />
                </Route> */}
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
