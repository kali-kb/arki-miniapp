// import React from 'react';

import SearchPage from '../pages/SearchPage';
import EmployerRegistration from '../pages/forms/EmployerTypeForm';
import PrivateClientForm from '../pages/forms/PrivateClientForm';
import CompanyRegistration from '../pages/forms/CompanyRegistrationForm'
const routes = [
  { path: '/', Component: SearchPage },
  { path: '/employer-type', Component: EmployerRegistration},
  { path: '/private-client-form', Component: PrivateClientForm},
  { path: '/company-registration', Component: CompanyRegistration }
];

export default routes;
