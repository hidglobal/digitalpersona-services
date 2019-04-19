import { Credential } from "../common";

/**@internal */
export class PIN extends Credential
{
    constructor(pin: string) {
        super(Credential.PIN, pin);
    }
}
