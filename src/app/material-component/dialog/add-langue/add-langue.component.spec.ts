import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLangueComponent } from './add-langue.component';

describe('AddLangueComponent', () => {
  let component: AddLangueComponent;
  let fixture: ComponentFixture<AddLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLangueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
