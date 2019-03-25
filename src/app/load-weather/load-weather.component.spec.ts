import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWeatherComponent } from './load-weather.component';

describe('LoadWeatherComponent', () => {
  let component: LoadWeatherComponent;
  let fixture: ComponentFixture<LoadWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
