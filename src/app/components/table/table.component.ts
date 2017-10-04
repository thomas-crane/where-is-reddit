import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SubredditStats } from '../../models/subreddit-stats';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'wr-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  subredditData: SubredditStats[];

  displayedColumns = ['position', 'name', 'active', 'total', 'remove'];
  dataSource: SubredditDataSource;

  inputErrors: string[]

  constructor(private apiService: ApiService) {
    this.subredditData = [];
    this.inputErrors = [];
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.mapData();
  }

  mapData(): void {
    const sorted = this.subredditData.sort((a, b) => b.active - a.active);
    for (let i = 0; i < sorted.length; i++) {
      sorted[i]['position'] = (i + 1);
    }
    this.dataSource = new SubredditDataSource(sorted);
  }

  removeItem(name: string): void {
    this.apiService.removeSubreddit(name);
  }

  addSub(name: string) {
    this.inputErrors = [];
    const newErrors = [];

    if (name.trim() ===  '') {
      newErrors.push('Subreddit cannot be blank.');
    }

    if (newErrors.length === 0) {
      this.apiService.checkValidity(name).then((result) => {
        if (!result) {
          newErrors.push('Subreddit doesn\'t appear to be valid.');
        } else {
          if (!this.apiService.addSubreddit(name)) {
            newErrors.push('Error adding ' + name)
          }
        }
      });
    }

    if (newErrors.length > 0) {
      this.inputErrors = newErrors;
      return;
    }
  }
}

export class SubredditDataSource extends DataSource<any> {

  stats: SubredditStats[];

  constructor(private source: SubredditStats[]) {
    super();
  }

  connect(): Observable<any[]> {
    return Observable.of(this.source);
  }

  disconnect() {}
}
