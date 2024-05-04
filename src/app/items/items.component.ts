import { Component , OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemData } from '../items-class';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit{

  
  displayedColumns: string[] = ['Id', 'Name', 'Category', 'Description','Actions'];
  items: ItemData[] = [];
  newItem: ItemData = {  }; 

  categories: any = [    
  { Id: 1, Name: "Electronics" },
  { Id: 2, Name: "Clothing" },
  { Id: 3, Name: "Books" },
  { Id: 4, Name: "Other" },
  ]

  dataSource!: ItemData[]; 

  // @ViewChild(MatTableDataSource) set matTableDataSource(dataSource: MatTableDataSource<any>) {
  //   this.dataSource = dataSource;
  // }

  constructor(private itemsService: ItemsService) {}

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

  onCreateItem() {
    // this.itemsService.createItem(this.newItem)
    //   .subscribe(savedItem => {
    //     this.items.push(savedItem); // Add the saved item to the local list
    //     this.dataSource.data = this.items; // Update data source (alternative to pushing)
    //     this.newItem = { name: '', category: '' }; // Reset the new item object
    //   });
  }

  onEditItem(item: ItemData) {
    // Implement logic to handle editing an item (optional)
    // You can open a modal or navigate to an edit form component
  }

  onDeleteItem(itemId: number) {

    
    this.itemsService.deleteItem(itemId)
      .subscribe(() => {
        this.items = this.items.filter(item => item.Id !== itemId); 
        this.dataSource = this.items; 
      });
  }
}

