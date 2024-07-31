import React, { useEffect } from 'react';

const SalesInfo = () => {
  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await fetch('/api/monthly-sales');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const salesData = await response.json();
        console.log(salesData); // Log the array to the console
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchMonthlySales();
  }, []);

  return (
   <></>
  );
};

export default SalesInfo;
