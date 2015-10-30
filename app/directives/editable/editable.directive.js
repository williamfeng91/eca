(function() {
  'use strict';

  angular
    .module('app')
    .directive('editable', function() {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          editableText: '=',
          placeholderText: '@',
          editableRadio: '=',
          radioValues: '=',
          editableDate: '=',
          onSaveCallback: '&',
          onSaveCallbackArgs: '=',
          onDeleteCallback: '&',
          deleteItem: '='
        },
        templateUrl: 'app/directives/editable/editable.html',
        link: function(scope, element, attrs) {
          scope.vm = {};
          scope.dateFormat = 'dd-MMMM-yyyy';
          scope.editing = false;

          // functions
          if (attrs.onSaveCallback) {
            scope.save = onSave;
          }
          if (attrs.onDeleteCallback) {
            scope.delete = onDelete;
          }
          scope.cancel = exitEdit;

          var clickableEl = element.find('.click-to-edit');
          var transcludeEl = element.find('ng-transclude');
          if (clickableEl && clickableEl.length == 1) {
            clickableEl.addClass('pointer');
            clickableEl.bind('click', startEdit);
          } else {
            transcludeEl.addClass('pointer');
            transcludeEl.bind('click', startEdit);
          }

          function startEdit() {
            if (scope.editableText) {
              scope.vm.newVal = scope.editableText;
            } else if (scope.editableRadio) {
              scope.vm.newVal = scope.editableRadio;
            } else if (scope.editableDate) {
              scope.vm.newVal = scope.editableDate;
            } else {
              scope.vm.newVal = '';
            }
            scope.editing = true;
          }

          function onSave() {
            // save when editable value has been modified and not empty
            if (scope.vm.newVal) {
              if ((scope.editableText != null && scope.vm.newVal != scope.editableText)
                || (scope.placeholderText != null)
                || (scope.editableRadio != null && scope.vm.newVal != scope.editableRadio)
                || (scope.editableDate != null && scope.vm.newVal != scope.editableDate)) {
                scope.onSaveCallback()(scope.vm.newVal, scope.onSaveCallbackArgs);
              }
            }
            exitEdit();
          }

          function onDelete() {
            var callback = scope.onDeleteCallback();
            callback(scope.deleteItem);
            exitEdit();
          }

          function exitEdit() {
            scope.editing = false;
          }
        }
      };
    });
})();
