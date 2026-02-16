import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration, formatDuration } from 'date-fns';

@Pipe({ name: 'duration', standalone: true })
export class DurationPipe implements PipeTransform {
  transform(start: Date, end: Date): string {
    const duration = intervalToDuration({ start, end });
    return formatDuration(duration);
  }
}