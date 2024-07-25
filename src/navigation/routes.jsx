// import React from 'react';

import SearchPage from '../pages/SearchPage';
import EmployerType from '../pages/forms/EmployerTypeForm';
import PrivateClientForm from '../pages/forms/PrivateClientForm';
import CompanyRegistration from '../pages/forms/CompanyRegistrationForm'
import JobPostForm from '../pages/forms/JobPostForm';
import JobPostFormFinalStep from '../pages/forms/JobPostFormFinalStep'
import ProfileBuilderForm from '../pages/forms/ProfileBuilderForm';

const routes = [
  { path: '/', Component: EmployerType},
  { path: '/private-client-form', Component: PrivateClientForm},
  { path: '/company-registration', Component: CompanyRegistration },
  { path: '/job-post-form', Component: JobPostForm },
  { path: '/job-post-form/final-step', Component: JobPostFormFinalStep },
  { path: '/profile-form', Component: ProfileBuilderForm }
];

export default routes;
