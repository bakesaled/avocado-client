import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesPanelComponent } from './tiles-panel.component';

describe('TilesPanelComponent', () => {
  let component: TilesPanelComponent;
  let fixture: ComponentFixture<TilesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
