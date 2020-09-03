import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewplaylistComponent } from './viewplaylist.component';

describe('ViewplaylistComponent', () => {
  let component: ViewplaylistComponent;
  let fixture: ComponentFixture<ViewplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
