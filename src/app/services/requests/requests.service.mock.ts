import {RequestsService} from "./requests.service";
import RequestHandlerServiceMock from "../request-handler/request-handler.service.mock";

/**
 * Mock for the requests provider
 */
export default class RequestsServiceMock extends RequestsService {
    constructor() {
        super(new RequestHandlerServiceMock());
    }
}
