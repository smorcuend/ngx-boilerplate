import { Pipe } from '@angular/core';

import { HumanizePipe } from './humanize.pipe';
import { MapToIterablePipe } from './map-to-iterable.pipe';

export const PIPE_DECLARATIONS: Pipe[] = [
  HumanizePipe,
  MapToIterablePipe
];
