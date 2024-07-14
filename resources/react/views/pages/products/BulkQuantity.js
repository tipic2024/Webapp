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
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAPICall('/api/products');
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSwitchChange = (productId, currentShow) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, show: currentShow === 1 ? 0 : 1 } : product
    );
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    try {
      for (const product of products) {
        const data = {
          id: product.id,
          show: product.show,
        };
        await post('/api/product/updateQty', data); // Adjust endpoint as per your API
      }
      setSubmitStatus('Submitted successfully');
      setProducts([]); // Clear products state
      fetchProducts(); // Fetch updated data
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
                    <CTableHeaderCell scope="col">Visibility</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {products.map((p, index) => (
                    <CTableRow key={p.id}>
                      <CTableHeaderCell scope="row">{p.id}</CTableHeaderCell>
                      <CTableDataCell>{p.name}</CTableDataCell>
                      <CTableDataCell>
                        <CFormSwitch
                          size="xl"
                          label=""
                          id={`formSwitchCheckDefaultXL-${p.id}`}
                          checked={p.show === 1}
                          onChange={() => handleSwitchChange(p.id, p.show)}
                          valid={p.show === 1}
                          invalid={p.show !== 1}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
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
