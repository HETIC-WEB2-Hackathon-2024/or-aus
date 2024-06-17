import { IValueObj } from "./IValueObj";

export class Commune implements IValueObj {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    toDto() {
        return { id: this.id, name: this.name };
    }
}
