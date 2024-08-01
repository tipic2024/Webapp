import React, { useEffect } from 'react';
import { getAPICall } from '../../util/api';

const SalesInfo = () => {
  useEffect(() => {
    const fetchMonthlySales = async () => {
     
        const response = getAPICall('/api/monthlyReport');
        console.log(response);
       
    };

    fetchMonthlySales();
  }, []);

  return (
   <></>
  );
};

export default SalesInfo;
