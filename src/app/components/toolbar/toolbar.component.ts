import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wr-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  infoActive = false;

  constructor() { }

  ngOnInit() {
  }

  toggleAbout(): void {
    this.infoActive = !this.infoActive;
  }

}
