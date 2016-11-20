'use strict'; 

//Deps


//Project Deps


//Main


class BaseMessage {
   constructor(){
       this.time_created = Date.now();
       this.conversation = [];
       this.message = {};
   };

   addToConversation(message) {
       const parsedMessage = this._parseMessage(message);
       if (parsedMessage) this.conversation.push(parsedMessage);
   }

   _parseMessage() {
       throw new Error('Should Override with subclass!');
   }
}

module.exports = BaseMessage;
