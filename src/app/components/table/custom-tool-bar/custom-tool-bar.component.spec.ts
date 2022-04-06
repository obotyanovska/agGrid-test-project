import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStatsToolPanel } from './custom-tool-bar.component';

describe('CustomToolBarComponent', () => {
  let component: CustomStatsToolPanel;
  let fixture: ComponentFixture<CustomStatsToolPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomStatsToolPanel ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStatsToolPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
