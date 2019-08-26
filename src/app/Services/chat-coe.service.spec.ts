import { TestBed } from '@angular/core/testing';

import { ChatCoeService } from './chat-coe.service';

describe('ChatCoeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatCoeService = TestBed.get(ChatCoeService);
    expect(service).toBeTruthy();
  });
});
