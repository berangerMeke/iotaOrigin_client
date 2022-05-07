import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateImageComponent } from './animate-image.component';

describe('AnimateImageComponent', () => {
  let component: AnimateImageComponent;
  let fixture: ComponentFixture<AnimateImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimateImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
