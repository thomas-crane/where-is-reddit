import { Component, OnInit, Input } from '@angular/core';
import { SubredditStats } from '../../models/subreddit-stats';

@Component({
  selector: 'wr-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss']
})
export class TopListComponent implements OnInit {

  @Input()
  list: SubredditStats[];

  visibleList: SubredditStats[];

  constructor() {
    if (!this.list || !this.list.length) {
      this.list = [];
    }
  }

  ngOnInit() {
    if (!this.list) {
      this.list = [];
    }
  }
}
