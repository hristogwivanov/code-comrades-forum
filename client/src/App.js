import { Routes, Route } from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Logout } from './Components/Logout/Logout';
import { Forum } from './Components/Forum/Forum';

import { AuthProvider } from './contexts/AuthContext';
import {ForumProvider} from './contexts/ForumContext'

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ForumProvider>


                <Header />
                {/* <!-- Main Content --> */}

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/forum' element={<Forum />} />

                        {/*<Route path='/catalog/:gameId' element={<GameDetails />} />
                    
                    
                    <Route element={<RouteGuard />}>
                    <Route path='/catalog/:gameId/edit' element={
                        <GameOwner>
                        <EditGame />
                        </GameOwner>
                    } />
                    <Route path='/create-game' element={<CreateGame />} />
                </Route> */}
                    </Routes>
                </main>

                <Footer />
                </ForumProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
