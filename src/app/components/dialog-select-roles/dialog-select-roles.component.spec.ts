import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectRolesComponent } from './dialog-select-roles.component';

describe('DialogSelectRolesComponent', () => {
  let component: DialogSelectRolesComponent;
  let fixture: ComponentFixture<DialogSelectRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSelectRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
