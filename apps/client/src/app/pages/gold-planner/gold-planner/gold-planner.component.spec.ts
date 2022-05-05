import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldPlannerComponent } from './gold-planner.component';

describe('GoldPlannerComponent', () => {
  let component: GoldPlannerComponent;
  let fixture: ComponentFixture<GoldPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoldPlannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
