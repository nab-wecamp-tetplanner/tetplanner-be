import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IBackendRes } from '../interfaces/backend.interface';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, IBackendRes<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IBackendRes<T>>;
}
