(function() {
    'use strict';

    angular
        .module('app')
        .directive('editable', function() {
            return {
                restrict: 'CA',
                transclude: true,
                scope: true,
                templateUrl: 'app/directives/editable/editable.html',
                link: function(scope, element, attrs) {
                    scope.onSave = onSave;
                    scope.onCancel = onCancel;
                    scope.onDelete = onDelete;

                    var editableText = $(element).find('.editable-text');
                    var textArea = $(element).find('.edit textarea');
                    textArea.bind('keydown keypress', function(evt) {
                        if (angular.equals(evt.keyCode, 13)) {
                            evt.preventDefault();
                            onSave();
                        }
                    });
                    editableText.bind('click', function() {
                        $(element).find('.hide-on-edit').addClass('hide');
                        if (attrs.text == 'empty') {
                            scope.placeholderText = '';
                        } else if (attrs.text == 'placeholder') {
                            scope.placeholderText = editableText.html().trim();
                        } else {
                            scope.originalText = editableText.html().trim();
                        }
                        $(element).find('.edit').removeClass('hide');
                        textArea.focus();
                    });

                    function onSave() {
                        // TODO: call API to update
                        onCancel();
                    }

                    function onCancel() {
                        $(element).find('.edit').addClass('hide');
                        $(element).find('.hide-on-edit').removeClass('hide');
                    }

                    function onDelete() {
                        // TODO: call API to update
                        onCancel();
                    }
                }
            };
        });
})();
