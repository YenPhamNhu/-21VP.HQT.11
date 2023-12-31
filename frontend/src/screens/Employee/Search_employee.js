import React from 'react';
import SearchPatient from '../../components/search_patient'
import SearchDentist from '../../components/search_dentist'

export default function Home() {
  return (
    <div>
     <SearchPatient/>
     <SearchDentist/>
    </div>
  );
}