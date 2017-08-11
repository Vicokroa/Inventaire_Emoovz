import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InventoryItemService } from './service/inventory-item.service';
import { FilterItemPipe } from './pipe/filter-item.pipe';
import { SelectedRoomsPipe } from './pipe/selected-rooms.pipe';
import { ItemSelectedPipe } from './pipe/item-selected.pipe';
import { TakePipe } from './pipe/take.pipe';

import { AppComponent } from './app.component';
import { ItemInventoryComponent } from './item-inventory/item-inventory.component';
import { RoomComponent } from './room/room.component';
import { SummaryComponent } from './summary/summary.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterItemPipe,
    ItemInventoryComponent,
    RoomComponent,
    SummaryComponent,
    InventoryComponent,
    SelectedRoomsPipe,
    ItemSelectedPipe,
    TakePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [InventoryItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
