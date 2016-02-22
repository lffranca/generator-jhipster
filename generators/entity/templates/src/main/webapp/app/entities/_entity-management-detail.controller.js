(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= entityClass %>ManagementDetailController', <%= entityClass %>ManagementDetailController);

    <%= entityClass %>ManagementDetailController.$inject = ['$scope', '$rootScope', '$stateParams'<% if (fieldsContainBlob) { %>, 'DataUtils'<% } %>, 'entity'<% for (idx in differentTypes) { %>, '<%= differentTypes[idx] %>'<% } %>];

    function <%= entityClass %>ManagementDetailController($scope, $rootScope, $stateParams<% if (fieldsContainBlob) { %>, DataUtils<% } %>, entity<% for (idx in differentTypes) { %>, <%= differentTypes[idx] %><% } %>) {
        var vm = this;
        vm.<%= entityInstance %> = entity;
        vm.load = function (id) {
            <%= entityClass %>.get({id: id}, function(result) {
                vm.<%= entityInstance %> = result;
            });
        };
        var unsubscribe = $rootScope.$on('<%=angularAppName%>:<%= entityInstance %>Update', function(event, result) {
            vm.<%= entityInstance %> = result;
        });
        $scope.$on('$destroy', unsubscribe);

        <%_ if (fieldsContainBlob) { _%>
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        <%_ } _%>
    }
})();
