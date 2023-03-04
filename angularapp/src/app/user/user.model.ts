export class User {
    public id: string;
    public name: string;
    public age: number;
    public address: string;

    constructor(id: string, name: string, age: number, address: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
    }
}
