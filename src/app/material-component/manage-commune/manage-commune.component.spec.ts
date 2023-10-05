import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommuneComponent } from './manage-commune.component';

describe('ManageCommuneComponent', () => {
  let component: ManageCommuneComponent;
  let fixture: ComponentFixture<ManageCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCommuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
