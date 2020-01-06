import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtwWordFormComponent } from './ftw-word-form.component';

describe('FtwWordFormComponent', () => {
  let component: FtwWordFormComponent;
  let fixture: ComponentFixture<FtwWordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtwWordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtwWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
