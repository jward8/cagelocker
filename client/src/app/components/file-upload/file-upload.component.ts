import { HttpClient } from '@angular/common/http';
import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver,  } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PartySlotComponent } from '../party-slot/party-slot.component';

export interface TeamResponse {
  message: string,
  data: Pokemon[]
}

export interface Pokemon {
  name: string,
  minLevel: number,
  maxLevel: number
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  public team!: Pokemon[];
  private spriteLink: string = "https://pokeapi.co/api/v2/pokemon"
  @ViewChild('partyContainer', { read: ViewContainerRef}) partyContainer!: ViewContainerRef;

  constructor(
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver
    ) {}

  onFileSelected(event: Event) {
    const inputtedFile = event.target as HTMLInputElement;
    const file = inputtedFile.files && inputtedFile.files.length > 0 ? inputtedFile.files[0] : null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.fetchPartyData(formData);
    }
  }

  uploadFile() {
    console.log("uploaded");
  }

  fetchPartyData(formData: FormData) {
    this.http.post<TeamResponse>(`${environment.ANGULAR_APP_BACKEND_URL}/api/upload`, formData).subscribe(res => {
      this.team = res.data;
      this.generatePartySlots();
    }, err => {
      console.error('Upload failed:', err);
    });
  }

  generatePartySlots() {
    this.partyContainer.clear();

    for (const pokemon of this.team) {
      this.fetchSpriteData(pokemon.name.toLocaleLowerCase()).then((spriteLink: string) => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PartySlotComponent);
        const componentRef = this.partyContainer.createComponent(componentFactory);
        componentRef.instance.pokemon = pokemon;
        componentRef.instance.sprite = spriteLink;
      });
    }
  }

  fetchSpriteData(name: string): Promise<string>{
    return this.http.get<any>(`${this.spriteLink}/${name}`)
    .toPromise()
    .then(res =>{
      return res['sprites']['front_default'].toString();
    }).catch(error => {
      console.error('Error occurred:', error);
      return ''; 
    });
  }
}
