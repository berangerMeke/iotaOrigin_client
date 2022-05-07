import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMorereCookiesComponent } from './learn-morere-cookies.component';

describe('LearnMorereCookiesComponent', () => {
  let component: LearnMorereCookiesComponent;
  let fixture: ComponentFixture<LearnMorereCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnMorereCookiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnMorereCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
