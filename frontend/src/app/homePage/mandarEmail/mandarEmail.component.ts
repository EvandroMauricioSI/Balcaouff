import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mandarEmail',
  templateUrl: './mandarEmail.component.html',
  styleUrls: ['./mandarEmail.component.css']
})
export class MandarEmailComponent {

  emailSubject: string = '';
  emailBody: string = '';
  recipientEmail: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any = '',
  ) { }

  getMailtoLink(): string {
    const recipient = this.data.dado
    const subject = encodeURIComponent(this.emailSubject);
    const body = encodeURIComponent(this.emailBody);
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

}
