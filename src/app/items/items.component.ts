import { Component, OnInit } from '@angular/core';
import { ItemData } from '../items-class';
import { ItemsService } from '../items.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {


  displayedColumns: string[] = ['sr','name', 'category', 'description', 'actions'];
  items: ItemData[] = [];

  dataSource!: ItemData[];
  currentSerialNo: number = 1;

  constructor(private itemsService: ItemsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getItems()
      .subscribe(items => {
        this.items = items;
        this.dataSource = items;
      });
  }
  getNextIndex() {
    return ++this.currentSerialNo;
  }

  add() {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'myapp-dialog',
      minWidth: '25vw',
      disableClose: true,
      data: {
        data: null,
        args: {
          detailsName: 'app-form', title: `Add New Item`, id: this.items.length + 1,
        }
      },

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadItems();
    });
  }

  onEditItem(item: ItemData) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'myapp-dialog',
      minWidth: '25vw',
      disableClose: true,
      data: {
        data: item,
        args: {
          detailsName: 'app-form', title: `Update Item ${item.name}`,
        }
      },

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadItems();
    });
  }

  onDeleteItem(item: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'myapp-dialog',
      minWidth: '25vw',
      disableClose: true,
      data: {
        message: `Are You Sure? \n Do You want to Delete Item?`, caption: item.name,
        args: {
          detailsName: 'app-confirmation', title: item.name,
        }
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res == true) {
        try {
          this.itemsService.deleteItem(item.id)
            .subscribe(() => {
              this.items = this.items.filter(ele => ele.id != item.id);
              this.dataSource = this.items;
            });
        } catch (err) {
          console.log("Error " + err)
        }
      } else {
        dialogRef.close();
      }
    });


  }
}

