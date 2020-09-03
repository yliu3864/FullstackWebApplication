import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchplaylistComponent } from './searchplaylist.component';

describe('SearchplaylistComponent', () => {
  let component: SearchplaylistComponent;
  let fixture: ComponentFixture<SearchplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
