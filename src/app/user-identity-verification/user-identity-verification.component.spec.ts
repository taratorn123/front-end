import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentityVerificationComponent } from './user-identity-verification.component';

describe('UserIdentityVerificationComponent', () => {
  let component: UserIdentityVerificationComponent;
  let fixture: ComponentFixture<UserIdentityVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdentityVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdentityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
