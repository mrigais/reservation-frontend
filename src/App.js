import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';

import UpdateSetting from './UpdateSetting';
import CreateReservation from './CreateReservation';
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/setting' element={<UpdateSetting/>} exact/>
          <Route path='/create-reservation' element={<CreateReservation/>} exact/>
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
