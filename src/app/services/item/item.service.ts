import { Injectable } from '@angular/core';
import { Observable, Subject, merge, combineLatest } from 'rxjs';
import { Items } from 'src/app/models/items';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, mergeMap, filter, take, skip, withLatestFrom, switchAll } from 'rxjs/operators';
import { Item } from '../../models/item';

export interface Query {
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private queries: Subject<Query>;
  private rawItemIds: Observable<number[]>
  
  totalItem = 0;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.queries = new Subject<Query>()
    this.rawItemIds = this.db.list<number>('/v0/topstories')
      .valueChanges();
    this.rawItemIds.subscribe(ids => {
      this.totalItem = ids.length
    })
  }

  load(query: Query) {
    this.queries.next(query);
  }
  get(): Observable<Items> {    
    const itemIds = combineLatest(
      this.rawItemIds,
      this.queries
    ).pipe(
      filter(([ids, query]) => query.refresh),
      map(([ids, query]) => ids)
    );
    const selector = ({ refresh = false, offset, limit }, ids) =>
      combineLatest(...(ids.slice(offset, offset + limit)
        .map(id => this.db.object<Item>('/v0/item/' + id).
          valueChanges()))        
      ).pipe(
        map(items => ({
          refresh,
          total: this.totalItem,
          results: items
        }))
      ) as Observable<Items>;
    return merge(
      combineLatest(this.queries, itemIds).pipe(
        map(([query, ids]) => selector(query, ids).
          pipe(take(1)))
      ),
      this.queries.pipe(
        skip(1),
        withLatestFrom(itemIds, selector)
      )
    ).pipe(switchAll());
  }
}
