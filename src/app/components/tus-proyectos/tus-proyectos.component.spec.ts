import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TusProyectosComponent } from './tus-proyectos.component';

describe('TusProyectosComponent', () => {
  let component: TusProyectosComponent;
  let fixture: ComponentFixture<TusProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TusProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
