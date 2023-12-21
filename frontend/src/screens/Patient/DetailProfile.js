import React from 'react';
import { Table } from 'react-bootstrap';

const MedicalRecord = () => {
  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td rowSpan={1}>ID</td>
          <td colSpan={4}>Service Used</td>
        </tr>
        <tr>
          <td>Order</td>
          <td>Name of Service</td>
          <td>Number</td>
          <td>Money</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Dental Cleaning</td>
          <td>1</td>
          <td>$100</td>
        </tr>
        <tr>
          <td>Name of dentist</td>
          <td colSpan={5}>Dr. Smith</td>
        </tr>
      
      </tbody>
    </Table>
  );
};

export default MedicalRecord;