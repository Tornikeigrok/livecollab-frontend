import HomePage from './Components/HomePage';
import  DeliveryPage  from './Components/DeliveryPage';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import { AccountPage } from './Components/AccountPage';
function App(){
  return (
   <>
   <Routes>
    <Route path="/" element={<WelcomePage />}/>
    <Route path='/HomePage' element={<HomePage />} />
    <Route path='/DeliveryPage' element={<DeliveryPage />} />
    <Route path='/AccountPage' element={<AccountPage />}/>
   </Routes>
   </>
  );
}
export default App;

