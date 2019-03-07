export class Credential
{
    public readonly id: string;
    public readonly data: string;

    public constructor(id: string, data: string) {
        this.id = id;
        this.data = data;
    }
}
