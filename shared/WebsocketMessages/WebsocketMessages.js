'use strict'; 

//Deps
const randomstring = require('randomstring');

//Project Deps

//Main


class WebsocketMessages {

   static Ping() {
       return {
           id: '123456789',
           message: 'hello',
           request: '',
           response: null,
       }
   }

    static _generateId() {
       return randomstirng(10) + Date.now();
    }   

   
}

module.exports = WebsocketMessages;
