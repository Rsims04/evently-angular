import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  selectedFile: File = null;
  loading = false;

  constructor(private imageService: ImageService) {}
  ngOnInit() {}

  @Input()
  currentPage: string;

  @Output()
  imageUploadEvent = new EventEmitter<boolean>();

  imageUploadSuccess(value: boolean) {
    this.imageUploadEvent.emit(value);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  async addData(): Promise<any> {
    this.loading = true;
    await this.imageService.addData(this.selectedFile, this.currentPage).then(
      (res) => {
        console.log('Success');
        this.loading = false;
        this.imageUploadSuccess(true);
      },
      (rej) => {
        console.log('Failure');
        console.log(rej);
        this.imageUploadSuccess(false);
      }
    );
  }
}
