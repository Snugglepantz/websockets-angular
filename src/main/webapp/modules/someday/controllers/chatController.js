app.directive('echoClient', function($scope, $attrs, echoSocket) {
  return {
    templateUrl: 'modules/echo-client/template.html',
    replace: true,
    controller: ['$scope', '$attrs', 'echoSocket',
      function($scope, $attrs, $echoSocket) {
        $scope.user = '';
        $scope.message = '';
        $scope.interactions = [];

        echoSocket.onmessage = function(event) {
          $scope.interactions.push({
            chat: JSON.parse(event.data)
          });
          $scope.$apply();
        };

        $scope.sendMessage = function() {
          var chatMessage = {};
          chatMessage.user = $scope.user;
          chatMessage.message = $scope.message;
          echoSocket.send(JSON.stringify(chatMessage));
          $scope.message = '';
        };
      }]

  };
});