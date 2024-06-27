import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { getAPICall, put } from '../../../util/api'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [deleteProduct, setDeleteProduct] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const route = window.location.href.split('/').pop()
  const fetchOrders = async () => {
    const type = route == 'order' ? -1 : route == 'bookings' ? 2 : 1
    const response = await getAPICall('/api/order?invoiceType=' + type + '&page=' + currentPage)
    setOrders(response?.data ?? [])
    setCurrentPage(response.current_page)
    setTotalPage(response.total)
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
    <CRow>
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
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Payment Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount Paid</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Delivery Date</CTableHeaderCell> */}
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
                      <CTableDataCell>
                        {order.orderStatus == 0 && <CBadge color="danger">Canceled</CBadge>}
                        {order.orderStatus == 1 && <CBadge color="success">Delivered</CBadge>}
                        {order.orderStatus == 2 && <CBadge color="warning">Pending</CBadge>}
                      </CTableDataCell>
                      <CTableDataCell>
                        {order.paymentType == 1 ? (
                          <CBadge color="success">Cash</CBadge>
                        ) : (
                          <CBadge color="warning">Online</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{order.finalAmount - order.paidAmount}</CTableDataCell>
                      <CTableDataCell>{order.paidAmount}</CTableDataCell>
                      <CTableDataCell>{order.finalAmount}</CTableDataCell>
                      <CTableDataCell>{order.invoiceDate}</CTableDataCell>
                      {/* <CTableDataCell>{order.deliveryDate}</CTableDataCell> */}
                      <CTableDataCell>
                        <CBadge
                          color="success"
                          onClick={() => {
                            handleShow(order)
                          }}
                        >
                          Show
                        </CBadge>{' '}
                        {order.orderStatus == 2 && (
                          <CBadge
                            color="info"
                            onClick={() => {
                              handleEdit(order)
                            }}
                          >
                            Mark Delivered
                          </CBadge>
                        )}{' '}
                        {order.orderStatus != 0 && (
                          <CBadge
                            color="danger"
                            onClick={() => {
                              handleDelete(order)
                            }}
                          >
                            Cancel
                          </CBadge>
                        )}
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
  )
}

export default Orders
