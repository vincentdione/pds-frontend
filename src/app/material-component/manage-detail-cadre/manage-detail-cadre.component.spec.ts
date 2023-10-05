import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDetailCadreComponent } from './manage-detail-cadre.component';

describe('ManageDetailCadreComponent', () => {
  let component: ManageDetailCadreComponent;
  let fixture: ComponentFixture<ManageDetailCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDetailCadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDetailCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
