import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'


import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'



import { getAPICall, put } from '../../util/api'
import ConfirmationModal from '../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const Dashboard = (Props) => {

  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [deleteProduct, setDeleteProduct] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const route = window.location.href.split('/').pop()
  const today = new Date();
  const fulldate =today.toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const Tomorrow = tomorrow.toISOString().split('T')[0];
  const [reportMonth, setReportMonth] = useState({
    monthlySales: Array(12).fill(0), 
    monthlyExpense: Array(12).fill(0),
    monthlyPandL: Array(12).fill(0)

  });


  useEffect(() => {
    const fetchMonthlySales = async () => {
     
        const response = await getAPICall('/api/monthlyReport');
        
        setReportMonth(
          response);
       
    };

    fetchMonthlySales();
  }, []);


  const fetchOrders = async () => {
    const resp = await getAPICall(`/api/totalDeliveries?startDate=${fulldate}&endDate=${Tomorrow}`);
    setOrders(resp)
   
  }
  useEffect(() => {
    fetchOrders()
  }, [route, currentPage])


  const handleDelete = (p) => {
    setDeleteProduct(p)
    setDeleteModalVisible(true)
  }

  const onDelete = async () => {
    await put('/api/order/' + deleteProduct.id, { ...deleteProduct, orderStatus: 0 })
    setDeleteModalVisible(false)
    fetchOrders()
  }

  const handleEdit = async (order) => {
    await put('/api/order/' + order.id, { ...order, orderStatus: 1 })
    fetchOrders()
  }

  const handleShow = async (order) => {
    navigate('/invoice-details/' + order.id)
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" reportMonth={reportMonth} />
      <CCol sm={12} xl={12} xxl={12}>
      <div className='d-flex justify-content-center'> 
        <WidgetsBrand className='d-flex justify-content-center' />
      </div>

      </CCol>
     
      <CRow className='mt-4'>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Cancel order - ' + deleteProduct?.id}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Orders</strong>
          </CCardHeader>
          <CCardBody>
            <div className='table-responsive'>
            <CTable >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount Paid</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">delivery Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((order, index) => {
                  return (
                    
                    <CTableRow key={order.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{order.customerName}</CTableDataCell>
                      <CTableDataCell>{order.customerMobile}</CTableDataCell>
                      <CTableDataCell>{order.finalAmount - order.paidAmount}</CTableDataCell>
                      <CTableDataCell>{order.paidAmount}</CTableDataCell>
                      <CTableDataCell>{order.finalAmount}</CTableDataCell>
                      <CTableDataCell>{order.deliveryDate}</CTableDataCell>
                  
                      <CTableDataCell>
                        <CBadge
                          color="success"
                          onClick={() => {
                            handleShow(order)
                          }}
                          role="button"
                        >
                          Show
                        </CBadge>{' '}
                        {order.orderStatus == 2 && (
                          <CBadge
                            color="info"
                            onClick={() => {
                              handleEdit(order)
                            }}
                            role="button"
                          >
                            Mark Delivered
                          </CBadge>
                        )}{' '}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            </div>
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                onClick={() =>
                  setCurrentPage((pre) => {
                    if (pre > 1) {
                      return pre - 1
                    }
                    return pre
                  })
                }
              >
                Previous
              </CPaginationItem>
              <CPaginationItem>{currentPage}</CPaginationItem>
              <CPaginationItem
                onClick={() =>
                  setCurrentPage((pre) => {
                    if (pre + 1 < totalPage) {
                      return pre + 1
                    }
                    return pre
                  })
                }
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>


      <CCard className="mt-4 mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                P&L(In Thousands)
              </h4>
              <div className="small text-body-secondary">January - December</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {/* <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton> */}
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
      </CCard> 
    </>
  )


  
}

export default Dashboard
