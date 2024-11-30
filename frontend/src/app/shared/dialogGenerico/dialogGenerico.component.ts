import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dialogGenerico',
  templateUrl: './dialogGenerico.component.html',
  styleUrls: ['./dialogGenerico.component.css']
})
export class DialogGenericoComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
