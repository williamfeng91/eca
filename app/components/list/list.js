(function() {
  'use strict';

  angular
    .module('app.list')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController(initData, customerService, session, logger) {
    var vm = this;
    session.setCustomers(initData.entries);
    vm.customers = session.getFilteredCustomers();
    // Although orderBy is used in html to display cards in the order
    // of list_pos, we still need to sort the array when it's first
    // loaded so that the drag-n-drop can work properly for the first
    // move
    vm.customers.sort(function(a, b) {
      return a.list_pos < b.list_pos;
    });
    vm.selectedCustomers = [];

    vm.onTopCheckboxClicked = onTopCheckboxClicked;
    vm.onSingleCheckboxClicked = onSingleCheckboxClicked;
    vm.allChecked = allChecked;
    vm.sortableOptions = {
      stop: function(e, ui) {
        for (var index in vm.customers) {
          vm.customers[index].list_pos = vm.customers.length - index;
        }
        vm.customers.sort(function(a, b) {
          return a.list_pos < b.list_pos;
        });
        // TODO: call API to update
      }
    };

    function onTopCheckboxClicked() {
      var selectAll = true;
      if (vm.allChecked()) {
        selectAll = false;
      }
      for (var index in vm.customers) {
        vm.customers[index].selected = selectAll;
      }
      if (selectAll) {
        vm.selectedCustomers = vm.customers.slice();
      } else {
        vm.selectedCustomers = [];
      }
    }

    function onSingleCheckboxClicked(id) {
      for (var i = 0; i < vm.customers.length; ++i) {
        if (vm.customers[i].id === id) {
          vm.customers[i].selected = !vm.customers[i].selected;
          if (vm.customers[i].selected) {
            vm.selectedCustomers.push(vm.customers[i]);
          } else {
            for (var j = 0; j < vm.selectedCustomers.length; ++j) {
              if (vm.selectedCustomers[j].id === id) {
                vm.selectedCustomers.splice(j, 1);
                break;
              }
            }
          }
          break;
        }
      }
    }

    function allChecked() {
      for (var index in vm.customers) {
        if (!vm.customers[index].selected) {
          return false;
        }
      }
      return true;
    }
  }

})();
