import { Component, Input, ComponentFactoryResolver, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/file.service';
import { PartySlotComponent } from '../party-slot/party-slot.component';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements AfterViewInit {
  @Input() pokemon: Pokemon[] = [];
  @ViewChild('party', { read: ViewContainerRef}) party!: ViewContainerRef

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
      
  }

  createPartySlot() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PartySlotComponent);
    const componentRef = this.party.createComponent(componentFactory);
  }
}
