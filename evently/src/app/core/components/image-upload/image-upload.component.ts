import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  selectedFile: File = null;
  loading = false;
  uploadSuccess = false;
  uploadFailure = false;
  faThumbsUp = faThumbsUp;

  constructor(private imageService: ImageService) {}
  ngOnInit() {}

  @Input()
  currentPage: string;

  @Output()
  imageUploadEvent = new EventEmitter<boolean>();
  @Output()
  imageEventUploadEvent = new EventEmitter<string>();

  imageUploadSuccess(value: boolean) {
    this.imageUploadEvent.emit(value);
  }

  imageEventUploadSuccess(value: string) {
    this.imageEventUploadEvent.emit(value);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  async addData(): Promise<any> {
    this.uploadFailure = false;
    this.loading = true;
    await this.imageService.addData(this.selectedFile, this.currentPage).then(
      (res) => {
        console.log('Success');
        this.loading = false;
        this.uploadSuccess = true;
        setTimeout(() => {
          console.log('Timeout');
          this.imageUploadSuccess(true);
        }, 3000);
      },
      (rej) => {
        this.uploadFailure = true;
        console.log('Failure');
        this.loading = false;
        console.log(rej);
        this.imageUploadSuccess(false);
      }
    );
  }

  async addDataEvent(): Promise<any> {
    console.log('HERE:', 'ADD DATA EVENT()');
    this.uploadFailure = false;
    this.loading = true;
    await this.imageService
      .addDataEvent(this.selectedFile, this.currentPage)
      .then(
        (res) => {
          this.loading = false;
          this.uploadSuccess = true;
          setTimeout(() => {
            console.log('Timeout');
            console.log('RES:', res);
            this.imageEventUploadSuccess(res);
          }, 3000);
        },
        (rej) => {
          this.uploadFailure = true;
          console.log('Failure');
          this.loading = false;
          console.log(rej);
          this.imageEventUploadSuccess(rej);
        }
      );
  }
}
