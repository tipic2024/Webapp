import React, { useEffect, useState } from 'react'
import { getAPICall } from '../../../util/api';
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

export default function Enquiry() {
    const [Enquiries, setEnquiries] = useState([]);

    // Fetch data from backend when the component mounts
    useEffect(() => {
      const fetchContacts = async () => {
        try {
          const response = await getAPICall('/api/enquiry');
          // console.log('API Response:', response); // Log the entire response
          setEnquiries(response.multiforms); // Update state with fetched contacts
        } catch (error) {
          console.error('Error fetching contact data:', error);
        }
      };
    
      fetchContacts();
    }, []);
  
    return (
      <div>
        <h1>Enquiry</h1>
  
        {Enquiries && Enquiries.length > 0 ? (
          <CTable bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Gender</CTableHeaderCell> */}
                {/* <CTableHeaderCell scope="col">Standard</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Enquiry At</CTableHeaderCell>

              </CTableRow>
            </CTableHead>
            <CTableBody>
              {Enquiries.map((Enquiry, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{Enquiry.first_name}</CTableDataCell>
                  <CTableDataCell>{Enquiry.email}</CTableDataCell>
                  <CTableDataCell>{Enquiry.contact}</CTableDataCell>
                  {/* <CTableDataCell>{Enquiry.gender}</CTableDataCell>
                  <CTableDataCell>{Enquiry.standard}</CTableDataCell> */}
                  <CTableDataCell>{new Date(Enquiry.created_at).toLocaleDateString('en-GB')}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p>No contacts found</p>
        )}
      </div>
  )
}
