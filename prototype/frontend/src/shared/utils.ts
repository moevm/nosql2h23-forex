import { HttpErrorResponse } from '@angular/common/http'

export function isHttpErrorResponse<T>(resp: T | HttpErrorResponse): resp is HttpErrorResponse {
    return resp instanceof HttpErrorResponse
}
