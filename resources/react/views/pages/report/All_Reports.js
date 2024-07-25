import { CButton, CCard, CCardBody, CCardHeader, CFormInput, CFormLabel, CFormSelect, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import React, { useState } from 'react'
import { Months } from './Dates';

function All_Reports() {
    const currentYear = new Date().getFullYear();//current year
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [state, setState] = useState({ start_date: `${currentYear}-04-01`,end_date: `${currentYear +1}-03-31`, }) //start date and end date set 
  const startYear = 2010;//min year visible to ui
  const endYear = 2035;//max year visible to ui

   // Generate the financial year options dynamically
   const generateFinancialYears = (start, end) => {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push({
        label: `${year}-${(year + 1).toString().slice(-2)}`,
        value: year.toString()
      });
    }
    console.log(years);
    return years;
  };
  
  const financialYearOptions = [
    { label: 'Open this select menu', value: '' },
    ...generateFinancialYears(startYear, endYear)
  ];

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);

    if (selectedYear) {
      const year = parseInt(selectedYear, 10);
      const start = `${year}-04-01`;
      const end = `${year + 1}-03-31`;
      setState({
        start_date :start,
        end_date: end
      });

      console.log(`Start Date: ${start}`);
      console.log(`End Date: ${end}`);
    } else {
      setState({
        start_date :`${currentYear}-04-01`,
        end_date: `${currentYear +1 }-04-01`
      });
     
    }
  };


  
  return (
 <>

  <CTabs activeItemKey="Custom">
  <CTabList variant="tabs">
    <CTab  itemKey="Year">Year</CTab>
    <CTab itemKey="Quarter">Quarter</CTab>
    <CTab itemKey="Month">Month</CTab>
    <CTab itemKey="Week">Week</CTab>
    <CTab itemKey="Custom" default>Custom</CTab>

  </CTabList>
  <CTabContent>



    {/* custom Dates Component  */}
    <CTabPanel className="" itemKey="Custom">/
     <div className="row">
                <div className="col-sm-4">
                  <div className="mb-1">
                    <CFormLabel htmlFor="start_date">Start Date</CFormLabel>
                    <CFormInput
                      type="quarter"
                      id="start_date"
                      name="start_date"
                      value={state.start_date}
                      // onChange={handleChange}
                      required
                      feedbackInvalid="Please select date."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-1">
                    <CFormLabel htmlFor="end_date">End Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="end_date"
                      name="end_date"
                      value={state.end_date}
                      // onChange={handleChange}
                      required
                      feedbackInvalid="Please select date."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-1 mt-4">
                    <CButton color="success" type="submit">
                      Submit
                    </CButton>
                  </div>
                </div>
              </div>
    </CTabPanel>


    {/* Week Component */}

    <CTabPanel className="p-3" itemKey="Week">
     
    </CTabPanel>


    {/* Month Component */}

    <CTabPanel className="p-3" itemKey="Month">
       <Months/>
    </CTabPanel>


    {/* Quarter Component */}

    <CTabPanel className="p-3" itemKey="Quarter">
      Quarter tab content
    </CTabPanel>

    {/* Yearly Component */}

    <CTabPanel className="p-3" itemKey="Year">
    
      <div className='mt-2 col-sm-8 d-flex justify-content-center'>
      <CFormSelect 
        className='pl-3'
        aria-label="Select Financial Year"
        options={financialYearOptions}
        value={selectedYear}
        onChange={handleYearChange}
        // defaultValue={currentYear.toString()}
      />
      
    </div>


    </CTabPanel>
  </CTabContent>
</CTabs> 

</>
  )
}

export default All_Reports
