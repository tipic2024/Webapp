import React from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge
} from '@coreui/react';

function All_Tables({ selectedOption,Sales,expenses, data, totalSales, totalPaid, totalRemaining, totalExpense, expenseType }) {
     console.log(Sales);
    const handleDelete = (p) => {
        setDeleteResource(p)
        setDeleteModalVisible(true)
      }
    
      const onDelete = async () => {
        await deleteAPICall('/api/expense/' + deleteResource.id)
        setDeleteModalVisible(false)
        fetchExpense()
      }
    
      const handleEdit = async (p) => {
        await put('/api/expense/' + p.id, { ...p, show: !p.show })
        fetchExpense()
      }
    
  return (
    <div>
      {selectedOption === 1 ? (
        <div className='table-responsive'>
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
              <CTableRow>
                <CTableHeaderCell>Total</CTableHeaderCell>
                <CTableHeaderCell>{totalSales}</CTableHeaderCell>
                <CTableHeaderCell>
                  <CBadge color="success">{totalPaid}</CBadge>
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <CBadge color="danger">{totalRemaining}</CBadge>
                </CTableHeaderCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
      ) : (
        <div className='table-responsive'>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Expense Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price Per Unit</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total Cost</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((p, index) => {
                return (
                  <CTableRow key={p.slug + p.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{p.expense_date}</CTableDataCell>
                    <CTableDataCell>{expenseType[p.expense_id]}</CTableDataCell>
                    <CTableDataCell>{p.name}</CTableDataCell>
                    <CTableDataCell>{p.qty}</CTableDataCell>
                    <CTableDataCell>{p.price}</CTableDataCell>
                    <CTableDataCell>{p.total_price}</CTableDataCell>
                    <CTableDataCell>
                      {p.show === 1 ? (
                        <CBadge color="success">Valid</CBadge>
                      ) : (
                        <CBadge color="danger">Invalid</CBadge>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge
                        color="info"
                        onClick={() => {
                          handleEdit(p);
                        }}
                      >
                        Change Validity
                      </CBadge>{' '}
                      &nbsp;
                      <CBadge
                        color="danger"
                        onClick={() => {
                          handleDelete(p);
                        }}
                      >
                        Delete
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
              <CTableRow>
                <CTableHeaderCell scope="row"></CTableHeaderCell>
                <CTableHeaderCell className="text-end" colSpan={5}>
                  {'Total '}
                </CTableHeaderCell>
                <CTableHeaderCell colSpan={3}>{totalExpense}</CTableHeaderCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
      )}
    </div>
  );
}

export default All_Tables;
