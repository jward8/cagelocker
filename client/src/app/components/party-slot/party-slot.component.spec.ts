import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartySlotComponent } from './party-slot.component';

describe('PartySlotComponent', () => {
  let component: PartySlotComponent;
  let fixture: ComponentFixture<PartySlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartySlotComponent]
    });
    fixture = TestBed.createComponent(PartySlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
