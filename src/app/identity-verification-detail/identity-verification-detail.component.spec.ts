import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityVerificationDetailComponent } from './identity-verification-detail.component';

describe('IdentityVerificationDetailComponent', () => {
  let component: IdentityVerificationDetailComponent;
  let fixture: ComponentFixture<IdentityVerificationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityVerificationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityVerificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
