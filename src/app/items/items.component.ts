import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemData } from '../items-class';
import { ItemsService } from '../items.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {


  displayedColumns: string[] = ['Id', 'Name', 'Category', 'Description', 'Actions'];
  items: ItemData[] = [];

  dataSource!: ItemData[];

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

  add() {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'myapp-dialog',
      minWidth: '25vw',
      disableClose: true,
      data: {
        data:null,
        args: {
          detailsName: 'app-form', title: `Add New Item`, Id: this.items.length+1,
        }
      },
      
    });
    dialogRef.afterClosed().subscribe( ()=>{
this.loadItems();
    });
  }

  onEditItem(item: ItemData) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'myapp-dialog',
      minWidth: '25vw',
      disableClose: true,
      data: {
        data:item,
        args: {
          detailsName: 'app-form', title: `Update Item ${item.Name}`, 
        }
      },
      
    });
    dialogRef.afterClosed().subscribe( ()=>{
      this.loadItems();
          });
  }

  onDeleteItem(item: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'myapp-dialog',
      minWidth: '25vw',
      disableClose: true,
      data: {
        message: `Are You Sure? \n Do You want to Delete Item?`, caption: item.Name,
        args: {
          detailsName: 'app-confirmation', title: item.Name, 
        }
      },
      
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res == true) {
        try {
          this.itemsService.deleteItem(item.Id)
            .subscribe(() => {
              this.items = this.items.filter(ele => ele.Id != item.Id);
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

