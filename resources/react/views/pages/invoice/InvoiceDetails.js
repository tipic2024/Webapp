import './style.css';
import Logo from './Images/Logo.png';
import { CContainer } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { generatePDF } from './InvoicePdf';
import { getAPICall } from '../../../util/api';
import { useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const param = useParams();

 
  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    mobileNumber: '',
    date: '',
    products: [],
    discount: '',
    amountPaid: 0,
    remainingAmount: 0,
    paymentMode: '',
    InvoiceStatus: '',
    finalAmount:'',
    InvoiceNumber:'',
    status:'',
    DeliveryDate:'',
    InvoiceType:'',
  });

  const fetchProduct = async () => {
    const response = await getAPICall('/api/order/' + param.id);
    console.log(response);
    
    let paymentModeString = response.paymentMode === 1 ? 'Cash' : 'Online (UPI/Bank Transfer)';
    let orderStatusString = '';
    if (response.orderStatus === 0) {
      orderStatusString = 'Canceled Order';
    } else if (response.orderStatus === 1) {
      orderStatusString = 'Delivered Order';
    } else if (response.orderStatus === 2) {
      orderStatusString = 'Order Pending';
    }

    let discountValue = response.discount;
    if (!response.discount || response.discount === 0) {
      discountValue = -1;
    }
    let finalAmount_GrandTotall = Math.round(response.finalAmount);
    let finalAmount=Math.trunc(finalAmount_GrandTotall);
    let remainingAmount1 =GrandTotall -response.paidAmount;
    setFormData({
      customerName: response.customerName,
      customerAddress: response.customerAddress,
      mobileNumber: response.customerMobile,
      date: response.invoiceDate,
      products: response.items,
      discount: discountValue,
      amountPaid: response.paidAmount,
      remainingAmount: remainingAmount1,
      paymentMode: paymentModeString,
      InvoiceStatus: orderStatusString,
      finalAmount:finalAmount,
      InvoiceNumber:response.id,
      status:response.orderStatus,
      DeliveryDate: response.deliveryDate,
      InvoiceType:response.invoiceType,
      
    });
    console.log(response);
  };

  useEffect(() => {
    fetchProduct();
  }, [param.id]);

  const handleDownload = () => {
    const grandTotal = formData.finalAmount; 
    const invoiceNo = formData.InvoiceNumber;
    
    generatePDF(grandTotal, invoiceNo, formData.customerName, formData);


   
  };

  return (
    <CContainer className="container-md invoice-content">
      <div className="row">
        <div className="col-md-4 text-start">
          <img src={Logo} width="150" height="150" alt="Logo" />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <h5>Invoice To:</h5>
              <p>Customer Name: {formData.customerName}</p>
              <p>Customer Address: {formData.customerAddress}</p>
              <p>Mobile Number: {formData.mobileNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h5>Invoice To:</h5>
          <p>Customer Name: {formData.customerName}</p>
          <p>Customer Address: {formData.customerAddress}</p>
          <p>Mobile Number: {formData.mobileNumber}</p>
        </div>
        <div className="col-md-6">
          <p>Invoice No: 3</p>
          <p>Date: {formData.date}</p>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Item Name</th>
                <th>Price (Rs)</th>
                <th>Quantity</th>
                <th>Total (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {formData.products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">Grand Total</td>
                <td>{formData.amountPaid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12">
          <p>Total Amount (In Words): {formData.amountPaid} Rs Only</p>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Discount (%):</td>
                <td>{formData.discount}%</td>
              </tr>
              <tr>
                <td>Amount Paid:</td>
                <td>{formData.amountPaid}</td>
              </tr>
              <tr>
                <td>Balance Amount:</td>
                <td>{formData.remainingAmount}</td>
              </tr>
              <tr>
                <td>Payment Mode:</td>
                <td>{formData.paymentMode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12">
          <p>{formData.orderStatus}</p>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-6">
          <h3>Bank Details</h3>
          <p>Name: BANK OF BARODA</p>
          <p>Account No: 04440200000597</p>
          <p>IFSC code: BARBOLONAND</p>
        </div>
        <div className="col-md-6">
          <h3>E-SIGNATURE DR.BAPURAO CHOPADE</h3>
          <img src="/images/signature.png" alt="signature" />
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12 text-center">
          <p>This is Computer generated bill.</p>
        </div>
      </div>
      <button onClick={handleDownload}>Download</button>
    </CContainer>
  );
};

export default InvoiceDetails;
