import Login from './Components/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatRoom from './Components/ChatRoom';

import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './Components/Modal/AddRoomModal';

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<ChatRoom />} />
                    </Routes>

                    <AddRoomModal />
                </AppProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
