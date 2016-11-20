'use strict'; 

//Deps


//Project Deps
const BaseModule = require('../BaseModule');

//Main


class BaseServer extends BaseModule {
   constructor(config) {
      super(config);
      if (!config) return;

      // Hopefully there will be no conflicts
      this.port = config.port || 8080;
   }

   NotFound(req, res, next) {
       res.status(200)
       res.send(this.config.errors.notFound);
   }

   sendPage(rsn, req, res, next) {
       if (!rsn || typeof rsn !== 'string') {
           res.status(400);
           res.send(this.config.errors.badResource);
       }
       res.send(this.pages[rsn]);
   }
}

module.exports = BaseServer;
