'use strict'; 

//Deps
const randomstring = require('randomstring');

//Project Deps
const BaseModule = require('../../lib/BaseModule');
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

        // Number of seconds until a message is dropped
        this.timeout = config.timeout || 60;

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

    messageInterface(message) {
        if (!message || !message.id) return null;
        const messageId = message.id;
        const existingMessage = this.messages.incomming[messageId] || this.messages.outgoing[messageId] || null;

        if (!existingMessage) this.createMessage(message);
        else this.existingMessage.addToConversation(message);
    }

    createMessage(message) {
        if (!message || !message.messageType || !message.id) return null;
        if (this.message_count > this.maxReplies) return null;
        this.messages[message.messageType][message.id] = message;
    }

    removeMessage(message) {
        if (!message || !message.id || !message.messageType) return null;
        this.messages[message.messageType][message.id] = null;
        delete this.messages[message.messageType][message.id];
    }

    sendMessage(messageBody) {
        if (!messageBody || !messageBody.id) return null;
        const message = new OutgoingMessage(messageBody);
        this.messageInterface(message);

        message.send();
    }

    receiveMessage(incommingMessage) {
        if (!incommingMessage || !incommingMessage.id) return null;
        const message = new IncommingMessage(IncommingMessage);
        this.messageInterface(message);

        this.HandleMessage(message);
    }
}

module.exports = MessageController;
