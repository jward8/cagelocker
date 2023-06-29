import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTeamComponent } from './pokemon-team.component';

describe('PokemonTeamComponent', () => {
  let component: PokemonTeamComponent;
  let fixture: ComponentFixture<PokemonTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonTeamComponent]
    });
    fixture = TestBed.createComponent(PokemonTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
