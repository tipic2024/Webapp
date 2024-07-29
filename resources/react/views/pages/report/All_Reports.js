import { CButton, CFormSelect, CTabs, CTabList, CTabPanel, CTabContent, CTab } from '@coreui/react';
import React, { useState, useCallback } from 'react';
import { Year, Custom, Months, Quarter, Week } from './Dates';
import { getAPICall } from '../../../util/api';

function All_Reports() {
  const [selectedOption, setSelectedOption] = useState('3');
  const [stateCustom, setStateCustom] = useState({ start_date: '', end_date: '' });
  const [stateMonth, setStateMonth] = useState({ start_date: '', end_date: '' });
  const [stateQuarter, setStateQuarter] = useState({ start_date: '', end_date: '' });
  const [stateYear, setStateYear] = useState({ start_date: '', end_date: '' });
  const [activeTab1, setActiveTab] = useState('Year');
  const ReportOptions = [
    { label: 'Sales', value: '1' },
    { label: 'Expense', value: '2' },
    { label: 'Profit & Loss', value: '3' },
  ];


  //for Report 
  const [Sales, setSales] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalRemaining, setTotalRemaining] = useState(0)
  const [errorMessage, setErrorMessage] = useState()
  console.log(totalSales);



  const handleTabChange = (value) => {
    console.log("Tab changed to:", value);
    setActiveTab(value);
    console.log("Active tab:", value); // Log active tab after setting it
  };

  const fetchReportData = () => {
    let date = {};
    switch (activeTab1) {
      case 'Custom':
        date = stateCustom;
        break;
      case 'Month':
        date = stateMonth;
        break;
      case 'Quarter':
        date = stateQuarter;
        break;
      case 'Year':
        date = stateYear;
        break;
      default:
        break;
    }

    if (!date.start_date || !date.end_date) {
      alert("Please select dates before fetching data.");
      return;
    }

    if (selectedOption === '1') {
      try {
          // Assuming getAPICall is a function that returns a promise
          const resp = getAPICall(`/api/reportSales?startDate=${date.start_date}&endDate=${date.end_date}`);
          
          if (Array.isArray(resp)) {
              console.log("Sales Data:", resp);
              
              const groupedSales = resp.reduce((acc, sale) => {
                  if (!acc[sale.invoiceDate]) {
                      acc[sale.invoiceDate] = {
                          invoiceDate: sale.invoiceDate,
                          totalAmount: 0,
                          paidAmount: 0,
                      };
                  }
                  acc[sale.invoiceDate].totalAmount += sale.totalAmount;
                  acc[sale.invoiceDate].paidAmount += sale.paidAmount;
                  return acc;
              }, {});

              const salesArray = Object.values(groupedSales).map(sale => ({
                  ...sale,
                  totalAmount: Math.round(sale.totalAmount),
                  paidAmount: Math.round(sale.paidAmount),
                  remainingAmount: Math.round(sale.totalAmount - sale.paidAmount),
              }));

              setSales(salesArray);

              const totalSales = salesArray.reduce((acc, current) => acc + current.totalAmount, 0);
              const totalPaid = salesArray.reduce((acc, current) => acc + current.paidAmount, 0);
              const totalRemaining = salesArray.reduce((acc, current) => acc + current.remainingAmount, 0);

              setTotalSales(Math.round(totalSales));
              setTotalPaid(Math.round(totalPaid));
              setTotalRemaining(Math.round(totalRemaining));
              setErrorMessage(null);
          } else {
              setErrorMessage('Failed to fetch records');
          }
      } catch (error) {
          console.error("Error fetching sales data:", error);
          setErrorMessage('Error fetching sales data');
      }
  }
    


    
    else if (selectedOption === '2') {
      const data = getAPICall(`/api/expense?startDate=${date.start_date}&endDate=${date.end_date}`)
      console.log("Expense Data:", data);
    } else if (selectedOption === '3') {
      Promise.all([
        getAPICall(`/api/reportSales?startDate=${date.start_date}&endDate=${date.end_date}`),
        getAPICall(`/api/expense?startDate=${date.start_date}&endDate=${date.end_date}`)
      ]).then(([salesData, expenseData]) => {
        console.log("Profit & Loss Data:", { salesData, expenseData });
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
    }
  };

  return (
    <>
      <CTabs activeItemKey={activeTab1} onChange={handleTabChange}>
        <CTabList variant="tabs">
          <CTab itemKey="Year">Year</CTab>
          <CTab itemKey="Quarter">Quarter</CTab>
          <CTab itemKey="Month">Month</CTab>
          <CTab itemKey="Week">Week</CTab>
          <CTab itemKey="Custom" default>Custom</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="p-3" itemKey="Custom">
            <Custom setStateCustom={setStateCustom} />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Week">
            <Week setStateCustom={setStateCustom} /> {/* Update if Week component has its own state */}
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Month">
            <Months setStateMonth={setStateMonth} />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Quarter">
            <Quarter setStateQuarter={setStateQuarter} />
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="Year">
            <Year setStateYear={setStateYear} />
          </CTabPanel>
        </CTabContent>
      </CTabs>

      <div className="mt-2 col-sm-8 d-flex justify-content-center">
        <CFormSelect
          className="pl-3"
          aria-label="Select Report Type"
          options={ReportOptions}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
      </div>

      <div className="mt-2 col-sm-8 d-flex justify-content-center">
        <CButton color="success" onClick={fetchReportData}>
          Fetch Report
        </CButton>
      </div>
    </>
  );
}

export default All_Reports;
