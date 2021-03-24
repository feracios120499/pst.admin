import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.LayoutComponent } from './admin.layout.component';

describe('Admin.LayoutComponent', () => {
  let component: Admin.LayoutComponent;
  let fixture: ComponentFixture<Admin.LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin.LayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
