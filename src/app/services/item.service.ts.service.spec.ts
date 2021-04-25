import { TestBed } from '@angular/core/testing';

import { Item.Service.TsService } from './item.service.ts.service';

describe('Item.Service.TsService', () => {
  let service: Item.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Item.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
