import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLangueComponent } from './manage-langue.component';

describe('ManageLangueComponent', () => {
  let component: ManageLangueComponent;
  let fixture: ComponentFixture<ManageLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLangueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
