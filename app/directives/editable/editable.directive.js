(function() {
    'use strict';

    angular
        .module('app')
        .directive('editable', function() {
            return {
                restrict: 'CA',
                transclude: true,
                scope: {
                    onSaveCallback: '&',
                    onDeleteCallback: '&'
                },
                templateUrl: 'app/directives/editable/editable.html',
                link: function(scope, element, attrs) {
                    if (attrs.onSaveCallback) {
                        scope.onSave = onSave;
                    }
                    if (attrs.onDeleteCallback) {
                        scope.onDelete = onDelete;
                    }
                    scope.onCancel = onExitEdit;

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
                        if (scope.text) {
                            var callback = scope.onSaveCallback();
                            callback(scope.text);
                        }
                        onExitEdit();
                    }

                    function onDelete() {
                        // TODO: call API to update
                        onExitEdit();
                    }

                    function onExitEdit() {
                        $(element).find('.edit').addClass('hide');
                        $(element).find('.hide-on-edit').removeClass('hide');
                    }
                }
            };
        });
})();
