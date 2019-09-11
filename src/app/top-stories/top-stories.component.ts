import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items } from '../models/items';
import { Subscription } from 'rxjs';
import { ItemService } from '../services/item/item.service';
import { concat } from 'lodash';

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
  private infiniteScrollComponent: any;
  private refresherComponent: any;

  constructor(private itemService: ItemService) { }
  ngOnInit() {
    this.subscription = this.itemService.get().
      subscribe(items => {
        if (items.refresh) {
          this.items = items;
          this.notifyRefreshComplete();
        } else {
          this.items = {
            ...this.items,
            results: concat(this.items.results, items.results),
          };
          this.notifyScrollComplete();
        }
      });
    this.doLoad(true)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  load(event) {
    this.infiniteScrollComponent = event.target;    
    if (this.hasNext()) {
      this.next();
    }
  }

  hasNext(): boolean {
    return this.items != null && (this.offset + this.limit) <
      this.items.total;
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

  refresh(event) {
    this.refresherComponent = event.target;
    if (this.canRefresh()) {
      this.doRefresh();
    }
  }

  doRefresh() {
    this.offset = 0;
    this.doLoad(true);
  }

  private doLoad(refresh: boolean) {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }
}
