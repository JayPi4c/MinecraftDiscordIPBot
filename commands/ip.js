module.exports = function (msg, args) {
    const http = require('http');
    http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' }, function (resp) {
        resp.on('data', ip => msg.channel.send(ip + ""));
    });
}