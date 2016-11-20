'use strict'; 

//Deps


//Project Deps
const BaseMessage = require('../../lib/BaseMessage');

//Main


class IncommingMessage extends BaseMessage {
   constructor(incommingMessageBody){
       if (!incommingMessageBody || !incommingMessageBody.id) return null;
       super();

       this.id = incommingMessageBody.id;

       this.messageType = 'incoming';

       this.message = incommingMessageBody;

   }

   get timeReceived() {
       return this.time_created;
   }
}

module.exports = IncommingMessage;
