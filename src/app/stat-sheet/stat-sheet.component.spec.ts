import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSheetComponent } from './stat-sheet.component';

describe('StatSheetComponent', () => {
  let component: StatSheetComponent;
  let fixture: ComponentFixture<StatSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
