import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopStoriesComponent } from './top-stories.component';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from '../components/item/item.component';
import { ItemsComponent } from '../components/items/items.component';
import { TimeAgoPipe } from '../components/time-ago.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TopStoriesComponent,
    ItemComponent,
    ItemsComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TopStoriesComponent
      }
    ])
  ]
})
export class TopStoriesModule { }
