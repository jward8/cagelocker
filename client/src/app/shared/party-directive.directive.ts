import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[partySlot]'
})
export class PartyDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
