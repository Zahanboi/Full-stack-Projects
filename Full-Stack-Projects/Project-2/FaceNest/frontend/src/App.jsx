import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from "./pages/landingPage"
import Authentication from "./pages/authentication"
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home'
import History from './pages/history'
import MeetContext from './contexts/meetContext'
import NotFound from './pages/NotFound';

function App() {

  return (
    <div>
     <Router>
       <AuthProvider>
      <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/home' element={<HomeComponent />} />
            <Route path='/history' element={<History />} />
            <Route path='/meet/:url' element={<MeetContext />} />
            <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
     </Router>
    </div>
  )
}

export default App
