import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private storage: Storage, private userService: UserService) {}

  addData(selectedFile, currentPage): Promise<boolean> {
    const storageRef = ref(this.storage, `${currentPage}/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          console.log('Upload is ' + progress + '% done.');
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at ' + downloadURL);

            let field = 'photoURL';
            if (currentPage === 'profile') {
              console.log('Changing:', field, 'to', downloadURL);
              // Update Database
              this.userService
                .changeDetail('photoURL', downloadURL)
                .then(() => {
                  console.log('Changed:', field, 'to', downloadURL);
                  resolve(true);
                })
                .catch((error) => {
                  console.log('Failed:', field, 'to', downloadURL);
                  reject(false);
                });
            }
          });
        }
      );
    });
  }

  addDataEvent(selectedFile, currentPage): Promise<string> {
    const storageRef = ref(this.storage, `${currentPage}/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          console.log('Upload is ' + progress + '% done.');
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Event file available at ' + downloadURL);

            if (currentPage === 'event') {
              console.log('RETURNING: ', downloadURL);
              resolve(downloadURL);
            }
            reject(null);
          });
        }
      );
    });
  }
}
