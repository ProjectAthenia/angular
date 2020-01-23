import {RequestsServices} from "./requests.services";
import RequestHandlerServiceMock from "../request-handler/request-handler.service.mock";

/**
 * Mock for the requests provider
 */
export default class RequestsServiceMock extends RequestsServices {
    constructor() {
        super(new RequestHandlerServiceMock());
    }
}
