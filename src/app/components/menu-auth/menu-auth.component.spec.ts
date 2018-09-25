import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAuthComponent } from '@app/components/menu-auth/menu-auth.component';

describe('MenuAuthComponent', () => {
  let component: MenuAuthComponent;
  let fixture: ComponentFixture<MenuAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAuthComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
