import { UserNameType } from './userNameType';

export class User
{
    public readonly name: string;
    public readonly type: UserNameType;

    public constructor(name: string, type: UserNameType) {
        this.name = name;
        this.type = type;
    }
}
