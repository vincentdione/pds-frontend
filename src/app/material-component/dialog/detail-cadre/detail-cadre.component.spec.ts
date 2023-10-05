import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCadreComponent } from './detail-cadre.component';

describe('DetailCadreComponent', () => {
  let component: DetailCadreComponent;
  let fixture: ComponentFixture<DetailCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
