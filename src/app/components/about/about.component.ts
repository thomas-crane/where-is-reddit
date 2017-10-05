import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wr-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Output()
  close = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitClose() {
    this.close.emit();
  }

}
