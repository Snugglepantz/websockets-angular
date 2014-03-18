package me.slashfix;

import java.io.IOException;
import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.EncodeException;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/echo")
public class EchoSocket {
  
  @OnOpen
  public void joined(Session peer) throws IOException, EncodeException{
    JsonObject obj = Json.createObjectBuilder().add("user", peer.getUserPrincipal().getName()).add("message", "joined").build();
    for (Session aPeer: peer.getOpenSessions()) {
      aPeer.getBasicRemote().sendObject(obj.toString());
    }
  }

  @OnMessage
  public void echo(final String message, final Session client) throws IOException, EncodeException {
    JsonObject obj = Json.createObjectBuilder().add("user", client.getUserPrincipal().getName()).add("message", message).build();
    System.err.println(obj.toString());
    for (Session peer : client.getOpenSessions()) {
      peer.getBasicRemote().sendObject(obj.toString());
    }
  }
  
  
}
