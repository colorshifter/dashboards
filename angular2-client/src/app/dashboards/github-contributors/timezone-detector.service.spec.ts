/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TimezoneDetectorService } from './timezone-detector.service';

describe('Service: TimezoneDetector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimezoneDetectorService]
    });
  });

  it('creates an instance of TimezoneDetector',
    inject([TimezoneDetectorService], (service: TimezoneDetectorService) => {
      expect(service).toBeTruthy();
    }));
});
