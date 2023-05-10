import { Component, OnInit } from '@angular/core';
import { ByteArrayResource, ContactService } from '../services/contact.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  downloadUrl: SafeUrl | undefined;

  constructor(public contactservice: ContactService, public sanitizer: DomSanitizer)
  {}

  ngOnInit(): void {
  }

  download()
  {
    // this.contactservice.download().subscribe(response => {
    //   this.downloadFile(response);
    // });
    this.contactservice.download();
  }

  downloadFile(data: BlobPart) {
    // const blob = new Blob([data]);
    // const url = window.URL.createObjectURL(blob);
    // console.log(data, blob);
    // // window.open(url);
    // const blob = new Blob([data], {   headers: this.headers,type: 'application/vnd.ms-excel' });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
}
}
