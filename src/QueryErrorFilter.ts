import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();
    if (exception.message.includes('Duplicate entry')) {
      const match = /for key '(\w+)\.(\w+)'/i.exec(exception.message);
      const columnName = match ? match[1] : 'unknown';
      response.status(400).json({
        statusCode: 400,
        message: `Unique constraint violation: The value in '${columnName}' already exists.`,
      });
    } else super.catch(exception, host);
  }
}
