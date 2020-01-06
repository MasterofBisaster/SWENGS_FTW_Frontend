import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtwWordListComponent } from './ftw-word-list.component';

describe('FtwWordListComponent', () => {
  let component: FtwWordListComponent;
  let fixture: ComponentFixture<FtwWordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtwWordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtwWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
