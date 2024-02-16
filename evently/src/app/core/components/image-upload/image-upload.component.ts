import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  selectedFile: File = null;

  constructor(private imageService: ImageService) {}
  ngOnInit() {}

  @Input()
  currentPage: string;

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  addData() {
    this.imageService.addData(this.selectedFile, this.currentPage);
  }
}
