/**
 * The model represents a message. Message can be one of following types: 'success' or 'error'
 */
export class Message {
    id: number;
    content: string;
    type: string;
    static counter: number = 0;

    constructor(content, type) {
        Message.counter++;
        this.id = Message.counter;
        this.content = content;
        this.type = type;
    }
}

