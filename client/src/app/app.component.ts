import { Component, OnInit } from '@angular/core';
import { FileService } from './shared/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private file: String | ArrayBuffer | null = '';
  private isTeamGenerated: boolean = false;

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.getData().subscribe(response => {
      console.log(response);
    })
  }

  onFileSelected(event: Event) {
    const inputtedFile = event.target as HTMLInputElement;
    const file = inputtedFile.files && inputtedFile.files.length > 0 ? inputtedFile.files[0] : null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
    }
  }

  uploadFile() {
    if (this.fileService.team.length !== 0) {

    }
  }


}
