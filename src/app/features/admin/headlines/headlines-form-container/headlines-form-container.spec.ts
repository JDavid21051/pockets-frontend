import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlinesFormContainer } from './headlines-form-container';

describe('HeadlinesFormContainer', () => {
  let component: HeadlinesFormContainer;
  let fixture: ComponentFixture<HeadlinesFormContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlinesFormContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlinesFormContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
