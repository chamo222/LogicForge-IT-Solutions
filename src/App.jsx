import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/Home';
import Services from './pages/services/Services';
import Support from './pages/support/Support';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Admin from './pages/admin/Admin';
import GetInTouch from './pages/getintouch/GetInTouch';

const App = () => {
  return (
    <Router>
      <main className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/support" element={<Support />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
           <Route path="/get-in-touch" element={<GetInTouch />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App;