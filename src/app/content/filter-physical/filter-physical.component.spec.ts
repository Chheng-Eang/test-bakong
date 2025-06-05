import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPhysicalComponent } from './filter-physical.component';

describe('FilterPhysicalComponent', () => {
  let component: FilterPhysicalComponent;
  let fixture: ComponentFixture<FilterPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPhysicalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
