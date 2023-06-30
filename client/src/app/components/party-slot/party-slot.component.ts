import { Component, Input } from '@angular/core';
import { Pokemon } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-party-slot',
  templateUrl: './party-slot.component.html',
  styleUrls: ['./party-slot.component.scss']
})
export class PartySlotComponent {
  @Input() pokemon!: Pokemon;
  @Input() sprite!: string | undefined;

}
