'use strict';

// route template 
/*
app.all('/', (req, res, next) => {
    //
});
*/

module.exports = (server) => {

    const app = server.server;

    // Define all web server routes here.. along with their controllers
    app.get('/', (req, res, next) => {
        server.MainPage(req, res, next);
    });

    app.get('/:resource', (req, res, next) => {
        const rsn = req.params.resource.toLowerCase();
        if (!server.pages[rsn]) server.NotFound(req, res, next);
        server.sendPage(rsn, req, res, next);
    });
};