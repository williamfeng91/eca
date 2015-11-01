(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('sortableService', sortableService);

  function sortableService() {
    var POS_AUTO_INCREMENT = 65536;
    var service = {
      calculatePosition: calculatePosition,
    };

    return service;
    /////////////////////

    function calculatePosition(array, index) {
      var item = array[index];
      if (array.length === index + 1) {
        // item is the last element in the array
        if (index === 0) {
          // item is the only element in the array
          return item.pos;
        } else {
          // item is the last element in the array
          return array[index - 1].pos + POS_AUTO_INCREMENT;
        }
      } else {
        // item is not the last element in the array
        if (index === 0) {
          // item is the first element in the array
          return array[1].pos / 2;
        } else {
          return (array[index - 1].pos + array[index + 1].pos) / 2;
        }
      }
    }
  }
}());
