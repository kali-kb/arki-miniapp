/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from "react";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { initNavigator } from "@telegram-apps/sdk-react";
import { SDKProvider } from '@telegram-apps/sdk-react';
import CompanyRegistrationForm from "./pages/forms/CompanyRegistrationForm";
import PrivateClientForm from "./pages/forms/PrivateClientForm";
import EmployerType from "./pages/forms/EmployerTypeForm";
import router from "./navigation/routes"
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import "./App.css";





// function App() {

//   return (
//     <>
//       <EmployerType />
//     </>
//   );
// }




function App() {
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <>
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          {router.map((route) => <Route key={route.path} {...route} />)}
          {/* <Route path={'*'} element={<Navigate href={'/'}/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
