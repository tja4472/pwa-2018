import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInFormComponent } from '@app/auth/components/sign-in-form/sign-in-form.component';

describe('SignInFormComponent - class tests', () => {
  it('raises the submitted event when valid form submitted', () => {
    const component = new SignInFormComponent();
    const credentials = { username: 'a.a@a.com', password: '123456789' };

    component.loginForm.setValue(credentials);
    expect(component.loginForm.valid).toBeTruthy();

    component.submitted.subscribe((x) => expect(x).toEqual(credentials));
    component.onSubmit();
  });

  it('should disable the form if pending', () => {
    const component = new SignInFormComponent();
    component.pending = true;
    expect(component.loginForm.disabled).toBeTruthy();
  });

  it('should enable the form if not pending', () => {
    const component = new SignInFormComponent();
    component.pending = false;
    expect(component.loginForm.disabled).toBeFalsy();
  });
});

describe('SignInFormComponent - DOM tests', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      declarations: [SignInFormComponent],
      providers: [
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should disable the form if pending', () => {
    component.pending = true;
    fixture.detectChanges();
    expect(component.loginForm.disabled).toBeTruthy();
  });

  it('should display an error message if provided', () => {
    const componentEl: HTMLElement = fixture.nativeElement;
    component.errorMessage = 'Invalid credentials';
    fixture.detectChanges();
    const errorMessage = componentEl.querySelector(
      '[data-test="error-message"]'
    );
    expect(errorMessage.textContent).toContain(component.errorMessage);
  });

  it('should emit an event if the form is valid when submitted', () => {
    const credentials = {
      username: 'user',
      password: 'pass',
    };
    component.loginForm.setValue(credentials);

    spyOn(component.submitted, 'emit');
    component.onSubmit();

    expect(component.submitted.emit).toHaveBeenCalledWith(credentials);
  });

  it('dummy', () => {
    expect(1).toEqual(1);
  });
});
