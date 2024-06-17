import { IValueObj } from "./IValueObj";

export class Secteur implements IValueObj {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toDto() {
        return { id: this.id, name: this.name };
    }
}
