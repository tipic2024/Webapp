import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { deleteAPICall, getAPICall, put } from '../../../util/api'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const SalesReport = () => {
  const navigate = useNavigate()
  const [Sales, setSales] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [deleteResource, setDeleteResource] = useState()
  const [validated, setValidated] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const [state, setState] = useState({
    start_date: '',
    end_date: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const fetchSales = async () => {
  const resp = await getAPICall(
      '/api/ReportSales?startDate=' + state.start_date + '&endDate=' + state.end_date,
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
        remainingAmount: sale.totalAmount - sale.paidAmount
      }))
      
      setSales(salesArray)

      const totalSales = salesArray.reduce((acc, current) => acc + current.totalAmount, 0)
      setTotalSales(totalSales)
      setErrorMessage(null)
    } else {
      setErrorMessage('Failed to fetch records')
    }
  }

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
      if (form.checkValidity()) {
        await fetchSales()
      }
    } catch (e) {
      console.log(e)
      setErrorMessage('Failed to fetch records' + e.errorMessage)
    }
  }

  const handleDelete = (p) => {
    setDeleteResource(p)
    setDeleteModalVisible(true)
  }

  const onDelete = async () => {
    await deleteAPICall('/api/order/' + deleteResource.id)
    setDeleteModalVisible(false)
    fetchSales()
  }

  const handleEdit = async (p) => {
    await put('/api/order/' + p.id, { ...p, show: !p.show })
    fetchSales()
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Sales Report</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit} noValidate validated={validated}>
          <CRow className="mb-3">
            <CFormLabel htmlFor="start_date" className="col-sm-2 col-form-label">
              Start Date
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="date"
                id="start_date"
                name="start_date"
                value={state.start_date}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="end_date" className="col-sm-2 col-form-label">
              End Date
            </CFormLabel>
            <CCol sm={10}>
              <CFormInput
                type="date"
                id="end_date"
                name="end_date"
                value={state.end_date}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CButton type="submit" color="primary">
            Fetch Sales
          </CButton>
        </CForm>
        {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Invoice Date</CTableHeaderCell>
              <CTableHeaderCell>Total Amount</CTableHeaderCell>
              <CTableHeaderCell>Paid Amount</CTableHeaderCell>
              <CTableHeaderCell>Remaining Amount</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Sales.map((sale, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{sale.invoiceDate}</CTableDataCell>
                <CTableDataCell>{sale.totalAmount}</CTableDataCell>
                <CTableDataCell>{sale.paidAmount}</CTableDataCell>
                <CTableDataCell>{sale.remainingAmount}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div>Total Sales: {totalSales}</div>
      </CCardBody>
    </CCard>
  )
}

export default SalesReport
