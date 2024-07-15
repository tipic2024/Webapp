import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSwitch,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { getAPICall, post } from '../../../util/api';

function BulkQuantity() {
  const [products, setProducts] = useState([]);
  const [productStates, setProductStates] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAPICall('/api/products');
      setProducts(response);
      // Initialize product states based on fetched products
      const initialStates = response.map(product => ({
        id: product.id,
        newQty: '',
        show: product.show === 1
      }));
      setProductStates(initialStates);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSwitchChange = (productId) => {
    setProductStates(prevStates =>
      prevStates.map(productState =>
        productState.id === productId
          ? { ...productState, show: !productState.show }
          : productState
      )
    );
  };

  const handleInputChange = (productId, newQty) => {
    setProductStates(prevStates =>
      prevStates.map(productState =>
        productState.id === productId
          ? { ...productState, newQty: newQty }
          : productState
      )
    );
  };

  const handleSubmit = async () => {
    try {
      for (const productState of productStates) {
        if (productState.newQty !== '') {
          const data = {
            id: productState.id,
            qty: productState.newQty,
            show: productState.show ? 1 : 0,
          };
          await post('/api/product/updateQty', data);
        }
      }
      setSubmitStatus('Submitted successfully');
      // Optionally, refetch updated data here if needed
      fetchProducts();
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus('Submission failed');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bulk Quantity</strong>
          </CCardHeader>
          <CCardBody>
            <div className='table-responsive'>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Current Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Add Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Visibility</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {products.map((p, index) => {
                    const productState = productStates.find(ps => ps.id === p.id) || {};
                    return (
                      <CTableRow key={p.id}>
                        <CTableHeaderCell scope="row">{p.id}</CTableHeaderCell>
                        <CTableDataCell>{p.name}</CTableDataCell>
                        <CTableDataCell>{p.sizes[0]?.qty}</CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            type="number"
                            value={productState.newQty}
                            onChange={(e) => handleInputChange(p.id, e.target.value)}
                            size="lg"
                            placeholder="Enter quantity"
                            aria-label="Quantity input"
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormSwitch
                            size="xl"
                            label=""
                            id={`formSwitchCheckDefaultXL-${p.id}`}
                            checked={productState.show}
                            onChange={() => handleSwitchChange(p.id)}
                            valid={productState.show}
                            invalid={!productState.show}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </div>
            <CButton color="primary" onClick={handleSubmit}>Submit</CButton>
            {submitStatus && <div>{submitStatus}</div>}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BulkQuantity;
