app.factory('echoSocket', function($window) {
  var loc = $window.location;
  var wsUri;
  if (loc.protocol === "https:") {
    wsUri = "wss:";
  } else {
    wsUri = "ws:";
  }
  wsUri += '//'
          + loc.host
          + loc.pathname.substring(0, loc.pathname
          .lastIndexOf('/')) + '/echo';

  var webSocket = new WebSocket(wsUri);
  $window.onbeforeunload = function() {
    websocket.onclose = function() {
    }; // disable onclose handler first
    websocket.close();
  };
  return webSocket;
});