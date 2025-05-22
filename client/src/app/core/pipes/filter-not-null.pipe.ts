import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNotNull'
})
export class FilterNotNullPipe implements PipeTransform {
  transform<T>(value: T | null | undefined): T | never[] {
    return value !== null && value !== undefined ? value : [];
  }
}
