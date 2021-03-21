import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParicipantListComponent } from './paricipant-list.component';

describe('ParicipantListComponent', () => {
  let component: ParicipantListComponent;
  let fixture: ComponentFixture<ParicipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParicipantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParicipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
