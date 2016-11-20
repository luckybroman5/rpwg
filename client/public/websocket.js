var regex = new RegExp('\/$')

var host = window.location.href.replace(regex, ':10010').split('http://')[1];

var socket = new WebSocket('ws://' + host);
socket.onmessage = function(event) {
    console.log('RECEIVED A MESSAGE!!');
    document.getElementById('status').innerHTML = event.data;
    console.log(event);
};
socket.onopen = function(event) {
    console.log('Successfully opened a connection!');
    console.log(event);
    socket.send('Fuck Yes motha fucker, I am here bitches!');
};
socket.onerror = function(event) {
    console.log(event);
};

console.log(socket);