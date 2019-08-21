import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { TestUtils } from 'src/testing/test-utils';
import { ItemComponent } from '../item/item.component';
import { TimeAgoPipe } from '../time-ago.pipe';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async(() => {
    TestUtils.beforeEachCompiler([ItemsComponent,
      ItemComponent, TimeAgoPipe])
      .then(compiled => {
        fixture = compiled.fixture;
        component = compiled.instance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
