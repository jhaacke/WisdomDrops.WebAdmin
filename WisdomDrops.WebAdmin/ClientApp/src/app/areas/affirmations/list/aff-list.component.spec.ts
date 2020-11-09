import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffListComponent } from './aff-list.component';

describe('AffListComponent', () => {
  let component: AffListComponent;
  let fixture: ComponentFixture<AffListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
