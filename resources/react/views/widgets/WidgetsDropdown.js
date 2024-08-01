import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import 'chartjs-plugin-datalabels'// To modify the data on barghaph

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import WidgetsBrand from './WidgetsBrand'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  
  const date= new Date();
  const currentMonth= date.getMonth();
  console.log(currentMonth);
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
       
       {/* <CCol sm={6} xl={6} xxl={6}>
        <WidgetsBrand ></WidgetsBrand>
      </CCol> */}
                            
  <CCol sm={4} xl={4} xxl={4} className='vh-[40%]'>
    <CWidgetStatsA
      color="dark"
      value={
        <>
          44K{' '}
          <span className="fs-6 fw-normal">
            /Month
          </span>
        </>
      }
      title="Profit (In Thousands)"
      action={
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      }
     />
  </CCol>

  <CCol sm={4} xl={4} xxl={4}>
    <CWidgetStatsA
      color="dark"
      value={
        <>
          20K{' '}
          <span className="fs-6 fw-normal">/Month</span>
        </>
      }
      title="Sales (In Thousands)"
      action={
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      }
      
        
    />
  </CCol>

    <CCol sm={4} xl={4} xxl={4}>
    <CWidgetStatsA
      color="dark"
      value={
        <>
          4K{' '}
          <span className="fs-6 fw-normal">/Month</span>
        </>
      }
      title="Expenses (In Thousands)"
      action={
        <CDropdown alignment="end">
          <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      }
     
    />
  </CCol>
     
        
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown