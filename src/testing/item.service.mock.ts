import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as range from 'lodash.range';
import { Items } from '../app/model/Items';
import { Item } from '../app/model/Item';
import { ItemService } from '../app/services/item.service';

@Injectable()
export class ItemServiceMock extends ItemService {
    load(offset?: number, limit?: number): Observable<Items> {
        const results: Item[] = range(offset, offset + limit).
            map(index => ({
                id: index,
                title: `Item ${index + 1}`,
                url: `http://www.example.com/item${index}`,
                by: `demo`,
                time: new Date().getTime() / 1000,
                score: index,
            }));
        return of({
            offset,
            limit,
            total: offset + limit,
            results,
        });
    }
}