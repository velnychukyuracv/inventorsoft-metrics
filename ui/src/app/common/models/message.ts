export class Message {
    id: number;
    content: string;
    type: string;
    dismissed: boolean;
    static counter: number = 0;

    constructor(content, type) {
        Message.counter++;
        this.id = Message.counter;
        this.content = content;
        this.type = type;
    }
}

