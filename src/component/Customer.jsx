/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from './Transaction';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchname, setSearchName] = useState('');
  const [minamount, setMinAmount] = useState('');
  const [selectCustomer, setSelectCustomer] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Function
  const getCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const transactionFiltering = () => {
    const filtered = customers.map((customer) => {
      const transactionId = transactions.filter((transaction) => {
        return customer.id === transaction.customer_id;
      });
      return {
        ...customer,
        transactions: transactionId,
      };
    });
    setFilteredTransactions(filtered);
    console.log(filtered);
  };

  const handleCustomerSelect = (customer) => {
    setSelectCustomer(customer);
  };

  useEffect(() => {
    getCustomers();
    getTransactions();
    }, []);


  useEffect(() => {
    getCustomers();
    getTransactions();
  }, []);

  useEffect(() => {
    if (customers.length > 0 && transactions.length > 0) {
      transactionFiltering();
    }
  }, [customers, transactions]);

  // Code
  return (
    <div className=' container mt-5'>
      <h1 className='mb-4 '>Customer Transactions</h1>
            <div className="row mb-4">
              <div className="  col-md-5 ">
              <input
    className=' form-control ms-5 me-5'
        type="text"
        placeholder="Search by name"
        value={searchname}
        onChange={e => setSearchName(e.target.value)}
      />
              </div>
    
     <div className="offset-md-1 col-md-5">
     <input
      className=' form-control me-5'
        type="number"
        placeholder="Min transaction amount"
        value={minamount}
        onChange={e => setMinAmount(e.target.value)}
      />
     </div>
      </div>

<div className="row">
  <div className="col-md-8">
  <table className=' table' >
        <thead  className="text-info">
          <tr >
            <th className=" bg-secondary-subtle">Name</th>
            <th className="bg-secondary-subtle">Transaction Amount</th>
            <th className="bg-secondary-subtle">Date</th>
          </tr>
        </thead>
        <tbody>
        {filteredTransactions.map((customer, index) => (
            <tr key={index} onClick={() => handleCustomerSelect(customer)} className="cursor-pointer">
              <td>{customer.name}</td>
              <td>
                {customer.transactions.map((transaction, index) => (
                  <div key={index}>{transaction.amount}</div>
                ))}
              </td>
              <td>
                {customer.transactions.map((transaction, index) => (
                  <div key={index}>{transaction.date}</div>
                ))}
              </td>
            </tr>

              ))}

          
        </tbody>
      </table>
  </div>

  <div className="col-md-4">
  {selectCustomer && <Transaction transactions={selectCustomer} />}
  </div>
</div>
   
    </div>
  );
};

export default Customer;
