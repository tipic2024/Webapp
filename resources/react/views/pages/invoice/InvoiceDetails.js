import './style.css';
import Logo from './Images/Logo.png';
import { CContainer } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { generatePDF } from './InvoicePdf';
import { getAPICall } from '../../../util/api';
import { useParams } from 'react-router-dom';
import SignatureImage from "./Images/E-SIGNATURE.png";

const InvoiceDetails = () => {
  const param = useParams();
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [totalAmountWords, setTotalAmountWords] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    mobileNumber: '',
    date: '',
    products: [],
    discount: '',
    amountPaid: 0,
    paymentMode: '',
    InvoiceStatus: '',
    finalAmount: 0,
    InvoiceNumber: '',
    status: '',
    DeliveryDate: '',
    InvoiceType: '',
  });

  const numberToWords = (number) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (number === 0) {
      return 'Zero';
    }

    let words = '';
    if (number >= 100000) {
      words += numberToWords(Math.floor(number / 1000)) + ' Lakh ';
      number %= 100000;
    }

    if (number >= 1000) {
      words += numberToWords(Math.floor(number / 1000)) + ' Thousand ';
      number %= 1000;
    }

    if (number >= 100) {
      words += units[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }

    if (number >= 20) {
      words += tens[Math.floor(number / 10)] + ' ';
      number %= 10;
    }

    if (number >= 10) {
      words += teens[number - 10] + ' ';
      number = 0;
    }

    if (number > 0) {
      words += units[number] + ' ';
    }

    return words.trim();
  };

  const handlePrint = () => {
    window.print();
  };

  const fetchProduct = async () => {
    try {
      const response = await getAPICall('/api/order/' + param.id);
      console.log('API Response:', response);

      let paymentModeString = response.paymentMode === 1 ? 'Cash' : 'Online (UPI/Bank Transfer)';
      let orderStatusString = '';
      if (response.orderStatus === 0) {
        orderStatusString = 'Canceled Order';
      } else if (response.orderStatus === 1) {
        orderStatusString = 'Delivered Order';
      } else if (response.orderStatus === 2) {
        orderStatusString = 'Order Pending';
      }

      let discountValue = response.discount || -1;
      let finalAmount = Math.round(response.finalAmount);
      let remaining = finalAmount - response.paidAmount;
      setRemainingAmount(Math.max(0, remaining));

      setFormData({
        customerName: response.customerName,
        customerAddress: response.customerAddress,
        mobileNumber: response.customerMobile,
        date: response.invoiceDate,
        products: response.items,
        discount: discountValue,
        amountPaid: response.paidAmount,
        paymentMode: paymentModeString,
        InvoiceStatus: orderStatusString,
        finalAmount: finalAmount,
        InvoiceNumber: response.id,
        status: response.orderStatus,
        DeliveryDate: response.deliveryDate,
        InvoiceType: response.invoiceType,
      });

      setGrandTotal(finalAmount);
      setTotalAmountWords(numberToWords(finalAmount));
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [param.id]);

  const handleDownload = () => {
    const invoiceNo = formData.InvoiceNumber;
    generatePDF(grandTotal, invoiceNo, formData.customerName, formData, remainingAmount, totalAmountWords);
  };

  return (
    <CContainer className="container-md invoice-content">
      <div className="d-flex flex-row">
        <div className="flex-fill">
          <img src={Logo} width="150" height="150" alt="Logo" />
        </div>
        <div className="flex-fill">
          <p className='text-md'>{formData.InvoiceStatus}</p>
        </div>
        <div className="ml-3">
          <p>Shree Samarth Nursery</p>
          <p>Nira-Lonand Road, At.Po,Padegaon </p>
          <p>Tal. Khandala, Dist. Satara, 415521</p>
          <p>Phone: 9730465591</p>
        </div>
      </div>

      <div className="d-flex flex-row mt-10">
        <div className="flex-fill">
          <div className="col-md-6">
            <h5>Invoice To:</h5>
            <p>Customer Name: {formData.customerName}</p>
            <p>Customer Address: {formData.customerAddress}</p>
            <p>Mobile Number: {formData.mobileNumber}</p>
          </div>
        </div>
        <div className="flex-fill align-items-center">
          <h5>Invoice No: {formData.InvoiceNumber}</h5>
          <p>Invoice Date: {formData.date}</p>
          {formData.InvoiceType === 2 && <p>Delivery Date: {formData.DeliveryDate}</p>}
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
              {formData.products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.oPrice}</td>
                  <td>{product.total_price}</td>
                  <td>{product.qty}</td>
                  <td>{product.total_price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">Grand Total</td>
                <td>{formData.finalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12">
          <p>Total Amount (In Words): {totalAmountWords} Rs Only</p>
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
                <td>{remainingAmount}</td>
              </tr>
              <tr>
                <td>Payment Mode:</td>
                <td>{formData.paymentMode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex  border p-3">
        <div className='flex-fill'>
          <div className="d-flex flex-column mb-3">
            <h6>Bank Details</h6>
            <p>Name: BANK OF BARODA</p>
            <p>Account No: 04440200000597</p>
            <p>IFSC code: BARBOLONAND</p>
          </div>
        </div>
        <div className='flex-fill'>
          <div className="d-flex flex-column  align-items-center text-center ">
            <h6>E-SIGNATURE DR.BAPURAO CHOPADE</h6>
            <img height="100" width="200" src={SignatureImage} alt="signature" />
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>

      <div className="row section">
        <div className="col-md-12 text-center">
          <p>This is a computer-generated bill.</p>
        </div>
      </div>

      <button onClick={handleDownload}>Download</button>
      <button onClick={handlePrint}>Print</button>
    </CContainer>
  );
};

export default InvoiceDetails;
