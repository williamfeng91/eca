(function() {
  'use strict';

  angular
    .module('app')
    .directive('editable', function() {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          editable: '=',
          editableType: '@',
          placeholderText: '@',
          radioValues: '=',
          onSaveCallback: '&',
          onSaveCallbackArgs: '=',
          onDeleteCallback: '&',
          onDeleteCallbackArgs: '='
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
            if (scope.editable) {
              scope.vm.newVal = scope.editable;
            } else {
              scope.vm.newVal = '';
            }
            scope.editing = true;
          }

          function onSave() {
            // save when editable value has been modified and not empty
            // if (scope.vm.newVal != null) {
            //   if ((scope.editableText != null && scope.vm.newVal != scope.editableText)
            //     || (scope.placeholderText != null)
            //     || (scope.editableRadio != null && scope.vm.newVal != scope.editableRadio)
            //     || (scope.editableDate != null && scope.vm.newVal != scope.editableDate)) {
            //     scope.onSaveCallback()(scope.vm.newVal, scope.onSaveCallbackArgs);
            //   }
            // }
            if (scope.vm.newVal != null && scope.vm.newVal != scope.editable) {
              scope.onSaveCallback()(scope.vm.newVal, scope.onSaveCallbackArgs);
            }
            exitEdit();
          }

          function onDelete() {
            var callback = scope.onDeleteCallback();
            callback(scope.onDeleteCallbackArgs);
            exitEdit();
          }

          function exitEdit() {
            scope.editing = false;
          }
        }
      };
    });
})();
