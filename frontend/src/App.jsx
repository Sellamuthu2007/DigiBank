import './App.css'
import SecondHero from "./pages/landingPage.jsx";
import Notfound from "./pages/NotFound.jsx";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import InstitutionRegister from "./auth/institution/InstitutionRegister.jsx";
import InstitutionLogin from "./auth/institution/InstitutionLogin.jsx";
import InstitutionDashboardEnhanced from "./pages/Institution_page/InstitutionDashboardEnhanced.jsx";

import StudentRegister from "./auth/student/StudentRegister.jsx";
import UserLogin from "./auth/student/userLogin.jsx";
import Student_dashboard from "./pages/Student_page/Student_dashboard.jsx";

import OrganizationRegister from "./auth/organization/OrganizationRegister.jsx";
import OrganizationLogin from "./auth/organization/OrganizationLogin.jsx";
import OrganizationDashboardEnhanced from "./pages/Organization_page/OrganizationDashboardEnhanced.jsx";

import VerifyCertificatePage from "./pages/VerifyCertificatePage.jsx";

function App() {
  return (
   <Router>
      <Routes>
        <Route path='/' element={<SecondHero/>} errorElement={<Notfound/>}/>
        
        <Route path='/student-register' element={<StudentRegister/>}/>
        <Route path='/user-login' element={<UserLogin/>}/>
         <Route path='/student-dashboard' element={<Student_dashboard/>}/>


        <Route path='/institution-register' element={<InstitutionRegister/>}/>
        <Route path='/institution-login' element={<InstitutionLogin/>}/>
        <Route path='/institution-dashboard' element={<InstitutionDashboardEnhanced/>}/>
        
        <Route path='/organization-register' element={<OrganizationRegister/>}/>
        <Route path='/organization-login' element={<OrganizationLogin/>}/>
        <Route path='/organization-dashboard' element={<OrganizationDashboardEnhanced/>}/>

        <Route path='/verify/:certificateId' element={<VerifyCertificatePage/>}/>
      </Routes>
   </Router>
  );
}

export default App;
