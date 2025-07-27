import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumeBuilderT1 from './ResumeBuilderT1';
import ResumeBuilderT2 from './ResumeBuilderT2';
// import ResumeBuilderT3 from './ResumeBuilderT3';

const ResumeBuilder = () => {
  const location = useLocation();
  const { template } = location.state || {};

  switch (template) {
    case 't1':
      return <ResumeBuilderT1 />;
    case 't2':
      return <ResumeBuilderT2 />;
    // case 't3':
    //   return <ResumeBuilderT3 />;
    default:
      return <div>Please select a template first.</div>;
  }
};

export default ResumeBuilder;
