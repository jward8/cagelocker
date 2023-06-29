import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private http: HttpClient,
    private fileService: FileService
    ) {}

  onFileSelected(event: Event) {
    const inputtedFile = event.target as HTMLInputElement;
    const file = inputtedFile.files && inputtedFile.files.length > 0 ? inputtedFile.files[0] : null;

    if (file) {

      console.log('File name:', file.name);
      console.log('File size:', file.size);
      console.log('File type:', file.type);

      const formData = new FormData();
      formData.append('file', file);

      console.dir(formData);
      console.log(formData.get('file'));

      this.fileService.sendTextFile(formData);
    }
  }

  uploadFile() {
    console.log("uploaded");
  }
}
