import React, { createContext, useState, useContext } from 'react';
import api from '../utils/api';

const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBusinesses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/businesses');
      setBusinesses(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch businesses');
    }
    setLoading(false);
  };

  const createBusiness = async (businessData) => {
    setLoading(true);
    try {
      const response = await api.post('/api/businesses', businessData);
      setBusinesses([...businesses, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create business');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBusiness = async (id, businessData) => {
    setLoading(true);
    try {
      const response = await api.put(`/api/businesses/${id}`, businessData);
      setBusinesses(businesses.map(business => 
        business._id === id ? response.data : business
      ));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update business');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BusinessContext.Provider value={{
      businesses,
      loading,
      error,
      getBusinesses,
      createBusiness,
      updateBusiness
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);