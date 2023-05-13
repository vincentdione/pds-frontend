import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLocaliteComponent } from './manage-localite.component';

describe('ManageLocaliteComponent', () => {
  let component: ManageLocaliteComponent;
  let fixture: ComponentFixture<ManageLocaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLocaliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLocaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
