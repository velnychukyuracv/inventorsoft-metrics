/**
 * The model represents a message. MessageModel can be one of two types: 'success' or 'error'
 */
export class MessageModel {
    id: number;
    content: string;
    type: string;
    dismissed: boolean;
    static counter: number = 0;

    constructor(content, type) {
        MessageModel.counter++;
        this.id = MessageModel.counter;
        this.content = content;
        this.type = type;
    }
}

