import { Routes, Route } from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Logout } from './Components/Logout/Logout';

import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <div className="App">
            <AuthProvider>

                <Header />
                {/* <!-- Main Content --> */}

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />

                   {/*  <Route path='/catalog' element={<Catalog />} />
                    <Route path='/catalog/:gameId' element={<GameDetails />} />
                    
                    
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
            </AuthProvider>
        </div>
    );
}

export default App;
