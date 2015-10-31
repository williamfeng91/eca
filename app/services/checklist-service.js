(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('checklistService', checklistService);

  /** @ngInject */
  function checklistService($http, $q, ECA_API, logger) {
    var service = {
      create: createChecklist,
      getById: getById,
      getAll: getAll,
      update: updateChecklist,
      partialUpdate: partialUpdateChecklist,
      delete: deleteChecklist,
      createItem: createChecklistItem,
      getItemById: getItemById,
      getAllItems: getAllItems,
      updateItem: updateChecklistItem,
      partialUpdateItem: partialUpdateChecklistItem,
      deleteItem: deleteChecklistItem,
    };

    return service;
    /////////////////////

    /**
     * Creates a new checklist for a customer
     * @param customerId the id of the customer
     * @param checklist a checklist object that captures all details
     */
    function createChecklist(customerId, checklist) {
      return $http({
        url: ECA_API.customerUrl + '/' + customerId + '/checklists',
        method: 'POST',
        dataType: 'json',
        data: checklist,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Retrieves a checklist
     * @param checklistId the id of the checklist to be retrieved
     */
    function getById(checklistId) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId,
        method: 'GET',
        dataType: 'json',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Retrieves all checklists of a customer
     * @param customerId the id of the customer
     */
    function getAll(customerId) {
      return $http({
        url: ECA_API.customerUrl + '/' + customerId + '/checklists',
        method: 'GET',
        dataType: 'json',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Updates a checklist
     * @param checklist the checklist object with updated information
     */
    function updateChecklist(checklist) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklist.id,
        method: 'PUT',
        dataType: 'json',
        data: checklist,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Partially updates a checklist
     * @param patch the patch object with updated information
     */
    function partialUpdateChecklist(checklistId, patch) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId,
        method: 'PATCH',
        dataType: 'json',
        data: patch,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Deletes a checklist
     * @param checklistId the id of the checklist to be deleted
     */
    function deleteChecklist(checklistId) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId,
        method: 'DELETE',
        dataType: 'json',
        data: '',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Creates a new checklist item in a checklist
     * @param checklistId the id of the checklist
     * @param checklistItem a checklist item object that captures all details
     */
    function createChecklistItem(checklistId, checklistItem) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId + '/checklist-items',
        method: 'POST',
        dataType: 'json',
        data: checklistItem,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Retrieves a checklist item
     * @param checklistId the id of the checklist
     * @param checklistItemId the id of the checklist item to be retrieved
     */
    function getItemById(checklistId, checklistItemId) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId + '/checklist-items/' + checklistItemId,
        method: 'GET',
        dataType: 'json',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Retrieves all checklist items in a checklist
     * @param checklistId the id of the checklist
     */
    function getAllItems(checklistId) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId + '/checklist-items',
        method: 'GET',
        dataType: 'json',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Updates a checklist item
     * @param checklistId the id of the checklist
     * @param checklistItem the checklist item object with updated information
     */
    function updateChecklistItem(checklistId, checklistItem) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId + '/checklist-items/' + checklistItem._id,
        method: 'PUT',
        dataType: 'json',
        data: checklistItem,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Partially updates a checklist item
     * @param checklistId the id of the checklist
     * @param checklistItemId the id of the checklist item
     * @param patch the patch object with updated information
     */
    function partialUpdateChecklistItem(checklistId, checklistItemId, patch) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId + '/checklist-items/' + checklistItemId,
        method: 'PATCH',
        dataType: 'json',
        data: patch,
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    /**
     * Deletes a checklist item
     * @param checklistId the id of the checklist
     * @param checklistItemId the id of the checklist item to be deleted
     */
    function deleteChecklistItem(checklistId, checklistItemId) {
      return $http({
        url: ECA_API.checklistUrl + '/' + checklistId + '/checklist-items/' + checklistItemId,
        method: 'DELETE',
        dataType: 'json',
        data: '',
        headers: ECA_API.headers
      }).then(handleSuccess, handleError);
    }

    // private functions
    function handleSuccess(response) {
      logger.success('API call successful', response, 'checklistService');
      return $q.resolve(response.data);
    }

    function handleError(response) {
      logger.error('API call unsuccessful', response, 'checklistService');
      return $q.reject(response);
    }
  }
}());
