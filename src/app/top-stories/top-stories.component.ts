import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items } from '../models/items';
import { Subscription } from 'rxjs';
import { ItemService } from '../services/item/item.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss'],
})
export class TopStoriesComponent implements OnInit, OnDestroy {
  items: Items;
  private subscription: Subscription;
  private offset = 0;
  private limit = 10;

  constructor(private itemService: ItemService) { }
  ngOnInit() {
    this.subscription = this.itemService.get().
      subscribe(items => this.items = items);
    this.doLoad(true)
    this.offset += this.limit;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasPrevious(): boolean {
    return this.offset > this.limit;
  }

  previous(): void {
    if (!this.hasPrevious()) {

      return;
    }
    this.offset -= this.limit;    
    this.doLoad(false);
  }

  hasNext(): boolean {
    return this.items != null && (this.offset + this.limit) <
      this.itemService.totalItem;
  }

  next() {
    if (!this.hasNext()) {
      return;
    }
    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean {
    return this.items != null;
  }

  refresh() {
    if (!this.canRefresh()) {
      return;
    }
    this.offset = 0;
    this.doLoad(true);
  }

  doLoad(refresh: boolean) {    
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });    
  }
}
