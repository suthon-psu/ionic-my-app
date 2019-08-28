import { Component, OnInit, Input } from '@angular/core';
import { Items } from 'src/app/model/items';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  @Input() items: Item[]
  
  constructor() { }

  ngOnInit() {}

}
