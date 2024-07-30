import { CButton, CFormSelect, CTabs, CTabList, CTabPanel, CTabContent, CTab } from '@coreui/react';
import React, { useState, useCallback, useEffect } from 'react';
import { Year, Custom, Months, Quarter, Week } from './Dates';
import { getAPICall } from '../../../util/api';
import All_Tables from './All_Tables';

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


  //for Sales Report 
  const [rawSales, setRawSales] = useState([])
  const [Sales, setSales] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [totalPaid, setTotalPaid] = useState(0)
  const [totalRemaining, setTotalRemaining] = useState(0)
  const [errorMessage, setErrorMessage] = useState()



  //for Expence Report
  const [rawExpence, setRawExpence] = useState([])
  const [expenseType, setExpenseType] = useState({})
  const [expenses, setExpenses] = useState([])
  const [totalExpense, setTotalExpense] = useState(0)
  const [deleteResource, setDeleteResource] = useState()
  const [validated, setValidated] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)


  //Profit & Loss
  const [pnlData, setPnLData] = useState([])
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState(0) 
  const [reportData, setReportData] = useState([])






  const handleTabChange = (value) => {
   
    setActiveTab(value);
  
  };


//  let reportData={};


useEffect(() => {
  switch(selectedOption)
 { case '1':
  // reportData=Sales;
  setReportData(Sales);

  break
  case '2':
    setReportData(expenses);
  break
  case '3':
    setReportData(pnlData);

 }

}, [selectedOption]); 
 
  const fetchReportData = async() => {
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
     if(selectedOption==='1'||selectedOption==='3') {
    const resp = await getAPICall(
      '/api/reportSales?startDate=' + date.start_date + '&endDate=' + date.end_date,
    )
    if (resp) {
      const groupedSales = resp.reduce((acc, sale) => {
        if (!acc[sale.invoiceDate]) {
          acc[sale.invoiceDate] = {
            invoiceDate: sale.invoiceDate,
            totalAmount: 0,
            paidAmount: 0,
          }
        }
        acc[sale.invoiceDate].totalAmount += sale.totalAmount
        acc[sale.invoiceDate].paidAmount += sale.paidAmount
        return acc
      }, {})

      const salesArray = Object.values(groupedSales).map(sale => ({
        ...sale,
        totalAmount: Math.round(sale.totalAmount),
        paidAmount: Math.round(sale.paidAmount),
        remainingAmount: Math.round(sale.totalAmount - sale.paidAmount)
      }))
      
      setSales(salesArray)

      const totalSales = salesArray.reduce((acc, current) => acc + current.totalAmount, 0)
      const totalPaid = salesArray.reduce((acc, current) => acc + current.paidAmount, 0)
      const totalRemaining = salesArray.reduce((acc, current) => acc + current.remainingAmount, 0)

      setTotalSales(Math.round(totalSales))
      setTotalPaid(Math.round(totalPaid))
      setTotalRemaining(Math.round(totalRemaining))
      setErrorMessage(null)
    } else {
      setErrorMessage('Failed to fetch records')
    }

   
  } 

  if(selectedOption==='2'||selectedOption==='3') {
    const resp = await getAPICall(
      '/api/expense?startDate=' + date.start_date + '&endDate=' + date.end_date,
    )
    
    if (resp) {
      setExpenses(resp)
      const totalExp = resp.reduce((acc, current) => {
        if (current.show) {
          return acc + current.total_price
        }
        return acc
      }, 0)
      setTotalExpense(totalExp)
      setErrorMessage(null)

      // Grouping expenses by expense_date and summing total_price
      const groupedExpenses = resp.reduce((acc, expense) => {
        if (!acc[expense.expense_date]) {
          acc[expense.expense_date] = {
            expense_date: expense.expense_date,
            totalExpense: 0,
          }
        }
        acc[expense.expense_date].totalExpense += expense.total_price
        return acc
      }, {})

      const expensesArray = Object.values(groupedExpenses)
      console.log(expensesArray)
    } else {
      setErrorMessage('Failed to fetch records')
    }

  }

  if(selectedOption==='3'){
    calculatePnL();
  }

    
  };
 
  const calculatePnL = async() => {
    try {
      const sales =  rawSales;
      const expenses = rawExpence

      const combinedData = [...sales, ...expenses]
      const groupedData = combinedData.reduce((acc, entry) => {
        const date = entry.invoiceDate || entry.expense_date
        if (!acc[date]) {
          acc[date] = {
            date,
            totalSales: 0,
            totalExpenses: 0,
          }
        }
        if (entry.totalAmount) {
          acc[date].totalSales += entry.totalAmount
        }
        if (entry.totalExpense) {
          acc[date].totalExpenses += entry.totalExpense
        }
        return acc
      }, {})

      const pnlData = Object.values(groupedData).map(data => ({
        ...data,
        profitOrLoss: data.totalSales - data.totalExpenses,
      }))

      const totalSales = pnlData.reduce((acc, current) => acc + current.totalSales, 0)
      const totalExpenses = pnlData.reduce((acc, current) => acc + current.totalExpenses, 0)
      const totalProfitOrLoss = pnlData.reduce((acc, current) => acc + current.profitOrLoss, 0)

      setPnLData(pnlData)
      setTotalSales(totalSales)
      setTotalExpenses(totalExpenses)
      setTotalProfitOrLoss(totalProfitOrLoss)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

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
            <All_Tables 
            selectedOption={selectedOption}
            data={reportData}
             totalSales={totalSales}
            totalPaid={totalPaid}
           totalRemaining={totalRemaining}
           totalExpense={totalExpense}
            expenseType={expenseType}
            Sales={Sales}
            expenses={expenses}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
           />

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
