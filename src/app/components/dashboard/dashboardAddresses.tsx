"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import getRequest from "../../../../helpers/get";
import toast from "react-hot-toast";
import CreateNewAddressForm from "../checkout/shippingAddress/CreateNewAddressForm";

// 🏠 Address interface based on API response
interface Address {
  id: number;
  label?: string;
  name?: string;
  address?: string;
  street?: string;
  house?: string;
  contact_phone?: string;
  notes?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}


const MyAddressesPage: React.FC = () => {
  const { getToken, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [settingDefault, setSettingDefault] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  // Fetch addresses from API
  useEffect(() => {
    const fetchAddresses = async () => {
      // Prevent multiple simultaneous requests
      if (isFetchingRef.current) {
        return;
      }

      if (!isAuthenticated) {
        setError("Please login to view your addresses");
        setIsLoading(false);
        return;
      }

      try {
        isFetchingRef.current = true;
        setIsLoading(true);
        setError(null);
        
        const token = getToken();
        const response = await getRequest('/customer/addresses', {}, token);
        console.log(response)
        if ( response.data) {
          setAddresses(response.data);
          console.log('📦 Addresses fetched:', response.data);
          
          // Auto-select the default address if one exists
          const defaultAddress = response.data.find((addr: Address) => addr.is_default === true);
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id.toString());
          }
        } else {
          setError("Failed to fetch addresses");
        }
      } catch (error) {
        console.error('❌ Error fetching addresses:', error);
        setError("Failed to load addresses. Please try again.");
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchAddresses();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/delete-address/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the address from local state
        setAddresses((prev) => {
          const updated = prev.filter((addr) => addr.id !== id);
          // Auto-select the default address if one exists
          const defaultAddress = updated.find((addr: Address) => addr.is_default === true);
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id.toString());
          } else {
            setSelectedAddressId(null);
          }
          return updated;
        });
        toast.success("Address deleted successfully");
      } else {
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.error('❌ Error deleting address:', error);
      toast.error("Failed to delete address");
    }
  };

  const handleAddressSelect = async (addressId: string) => {
    try {
      setSettingDefault(addressId);
      const token = getToken();
      
      // Call the set-as-default API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/set-as-default/${addressId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update local state to reflect the new default
        setAddresses((prev) => 
          prev.map((addr) => ({
            ...addr,
            is_default: addr.id.toString() === addressId
          }))
        );
        
        setSelectedAddressId(addressId);
        toast.success("Address set as default successfully");
      } else {
        toast.error("Failed to set address as default");
      }
    } catch (error) {
      console.error('❌ Error setting address as default:', error);
      toast.error("Failed to set address as default");
    } finally {
      setSettingDefault(null);
    }
  };

  const handleAddressCreated = async () => {
    // Hide the create form
    setShowCreateForm(false);
    
    // Refresh the addresses list
    try {
      const token = getToken();
      const response = await getRequest('/customer/addresses', {}, token);
      
      if (response.data) {
        setAddresses(response.data);
        console.log('📦 Addresses refreshed after creation:', response.data);
        
        // Auto-select the default address if one exists
        const defaultAddress = response.data.find((addr: Address) => addr.is_default === true);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id.toString());
        }
      }
    } catch (error) {
      console.error('❌ Error refreshing addresses after creation:', error);
    }
  };

  return (
   <>
   <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Addresses
                </h1>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="te-btn te-btn-primary px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                >
                  {showCreateForm ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="p-6">
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Loading addresses...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="p-6">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                          Error loading addresses
                        </h3>
                        <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Create New Address Form */}
              {showCreateForm && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Create New Address
                  </h2>
                  <CreateNewAddressForm onAddressCreated={handleAddressCreated} />
                </div>
              )}

              {/* Address List */}
              {!isLoading && !error && (
                <div className="p-6 space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="selected_address"
                        value={address.id.toString()}
                        checked={selectedAddressId === address.id.toString()}
                        onChange={(e) => handleAddressSelect(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500 mt-1"
                        disabled={settingDefault === address.id.toString()}
                      />
                      {settingDefault === address.id.toString() && (
                        <div className="ml-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                        </div>
                      )}
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {address?.address || `${address?.name} ${address?.house}`}
                              {address.is_default && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Default
                                </span>
                              )}
                              {settingDefault === address.id.toString() && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  Setting as Default...
                                </span>
                              )}
                            </h3>
                          </div>
                        </div>

                        <div className="mt-2 space-y-1">
                          {address?.name && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              name: {address.name}
                            </p>
                          )}
                        
                         
                          
                          
                          {address.street && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                             street: {address?.street}
                            </p>
                          )}
                          {address?.contact_phone && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Phone: {address?.contact_phone}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 flex space-x-2 rtl:space-x-reverse">
                          <Link
                            href={`/dashboard/edit-address?id=${address.id}`}
                            className="text-sm font-medium text-primary-600 dark:text-primary-100 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Link>
                          <span className="text-gray-300 dark:text-gray-600">|</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDelete(address.id);
                            }}
                            className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </label>
                  ))}

                 

                  {addresses.length === 0 && (
                    <div className="text-center py-8">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No addresses</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Get started by adding your first address.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/dashboard/edit-address"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
                        >
                          Add Address
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
   </>
  );
};

export default MyAddressesPage;
