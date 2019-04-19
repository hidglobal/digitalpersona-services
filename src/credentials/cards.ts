import { Credential } from "../common";

export class SmartCard extends Credential
{
    constructor(cardData: string) {
        super(Credential.SmartCard, cardData, false);
    }
}

export class ContactlessCard extends Credential
{
    constructor(cardData: string) {
        super(Credential.ContactlesCard, cardData, false);
    }
}

export class ProximityCard extends Credential
{
    constructor(cardData: string) {
        super(Credential.ProximityCard, cardData, false);
    }
}
