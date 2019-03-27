import { Service } from "./service";
import { HttpStatus } from '../test';

var fetchMock = require('fetch-mock');

describe("Base service: ", () =>
{
    const app = "http://test.local/service";
    const ping = `${app}/Ping`;

    it("must return true when can ping", async ()=>{
        fetchMock.get(ping, HttpStatus.Ok.status);
        const service = new Service(app);
        expect(await service.Ping()).toBe(true);
        fetchMock.restore();
    })
    it("must return false when cannot ping", async ()=>{
        fetchMock.get(ping, HttpStatus.InternalError.status);
        const service = new Service(app);
        expect(await service.Ping()).toBe(false);
        fetchMock.restore();
    })
})
