'use strict'; 

//Deps
const randomstring = require('randomstring');

//Project Deps
const BaseModule = require('../../BaseModule');
const IncommingMessage = require('../IncommingMessage');
const OutgoingMessage = require('../OutgoingMessage');

//Main

class MessageController extends BaseModule {
    constructor(config) {
        super(config);

        // Determines how many active Messages there can be        
        this.maxMessageRate = config.maxMessageRate || 30;

        // At which point the message will be dropped
        this.maxReplies = config.maxReplies || 100;

        // Keep track of messages by Id
        this.messages = {
            incomming: {},
            outgoing: {},
        };
    }

    get message_count() {
        let count = 0;
        Object.keys(this.messages).forEach((key) => {
            count += Object.keys(this.messages[key]).length;
        });
        return count;
    }

    createMessage(message) {
        if (!message || !message.messageType || !message.id) return null;
        if (this.message_count > this.maxReplies) return null;
        this.messages[message.messageType][message.id] = message;
        this.messagePool.push(message);
    }

    removeMessage() {

    }

    sendMessage(messageBody) {
        if (!messageBody || !messageBody.id) return null;
        const message = new OutgoingMessage(messageBody);
        
        this.createMessage(message);
        this.HandleMessage(message);
    }

    receiveMessage(incommingMessage) {
        if (!incommingMessage || !incommingMessage.id) return null;
        let message;
        if (this.messages.incomming[incommingMessage.id]) {
            // This message needs to be handled appropriately
            
        } else {
            message = new IncommingMessage(IncommingMessage);
        }

        this.HandleMessage(message);
    }
}

module.exports = MessageController;
