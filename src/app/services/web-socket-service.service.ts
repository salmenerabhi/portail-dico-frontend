import { Injectable } from '@angular/core';
declare var require: any

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");
@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

 // Open connection with the back-end socket
 public connect() {
  let socket = new SockJs(`http://localhost:8085/socket`);

  let stompClient = Stomp.over(socket);

  return stompClient;
}
}