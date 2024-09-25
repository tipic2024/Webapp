import React, { useEffect, useState } from 'react';
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';
import { getAPICall } from '../../../util/api';

export default function ContactUs() {
  const [Contacts, setContacts] = useState([]);

  // Fetch data from backend when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAPICall('/api/contactUs');
        // console.log('API Response:', response.multiforms); // Log the entire response
        setContacts(response.multiforms); // Update state with fetched contacts
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };
  
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contact Us</h1>

      {Contacts && Contacts.length > 0 ? (
        <CTable bordered hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
              <CTableHeaderCell scope="col">Message</CTableHeaderCell>
              <CTableHeaderCell scope="col">Submitted At</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Contacts.map((contact, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{contact.first_name}</CTableDataCell>
                <CTableDataCell>{contact.email}</CTableDataCell>
                <CTableDataCell>{contact.contact}</CTableDataCell>
                <CTableDataCell>{contact.querry}</CTableDataCell>
                <CTableDataCell>{new Date(contact.created_at).toLocaleDateString('en-GB')}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
}
