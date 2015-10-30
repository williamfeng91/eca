(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('customerService', customerService);

  /** @ngInject */
  function customerService($http, $q, ECA_API, logger) {
    var service = {
      create: createCustomer,
      getById: getById,
      getAll: getAll,
      update: updateCustomer,
      partialUpdate: partialUpdateCustomer,
      delete: deleteCustomer
    };

    return service;
    /////////////////////

    /**
     * Creates a new customer
     * @param customer a customer object that captures all details
     */
    function createCustomer(customer) {
      return $http({
        url: ECA_API.customerUrl,
        method: 'POST',
        dataType: 'json',
        data: customer,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Retrieves a customer
     * @param id the id of the customer to be retrieved
     */
    function getById(id) {
      return $http({
        url: ECA_API.customerUrl + '/' + id,
        method: 'GET',
        dataType: 'json',
        data: '',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Retrieves all customers
     */
    function getAll() {
      return $http({
        url: ECA_API.customerUrl,
        method: 'GET',
        dataType: 'json',
        data: '',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Updates a customer
     * @param customer the customer object with updated information
     */
    function updateCustomer(customer) {
      return $http({
        url: ECA_API.customerUrl + '/' + customer.id,
        method: 'PUT',
        dataType: 'json',
        data: customer,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Partially updates a customer
     * @param patch the patch object with updated information
     */
    function partialUpdateCustomer(customerId, patch) {
      return $http({
        url: ECA_API.customerUrl + '/' + customerId,
        method: 'PATCH',
        dataType: 'json',
        data: patch,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Deletes a customer
     * @param id the id of the customer to be deleted
     */
    function deleteCustomer(id) {
      return $http({
        url: ECA_API.customerUrl + '/' + id,
        method: 'DELETE',
        dataType: 'json',
        data: '',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    // private functions
    function handleSuccess(response) {
      logger.success('API call successful', response, 'customerService');
      return $q.resolve(response.data);
    }

    function handleError(response) {
      logger.error('API call unsuccessful', response, 'customerService');
      return $q.reject(response);
    }
  }
}());
