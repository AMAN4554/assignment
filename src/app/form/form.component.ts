import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemData } from '../items-class';
import { ItemsService } from '../items.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  @Input() data: any;
  @Input() args:any;
  editForm!: FormGroup;
  Categories: string[] = ['other', 'electronics', 'clothing', 'books'];

  constructor(private fb: FormBuilder, private itemService: ItemsService,private dialog: MatDialogRef<FormComponent>) { }

  ngOnInit() {
    if(this.data != null){
      this.editForm = this.fb.group({
        Name: [this.data?.Name, Validators.required], // Use optional chaining if data might be undefined
        Description: [this.data?.Description, Validators.required],
        Category: [this.data?.Category, Validators.required]
      });
    }else{
      this.editForm = this.fb.group({
        Name: ['', Validators.required], // Use optional chaining if data might be undefined
        Description: ['', Validators.required],
        Category: ['', Validators.required]
      });
      
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedItem: ItemData = {
        ...this.editForm.value,
        Id: this.data == null ? this.args.Id : (this.data && this.data.Id)// Assuming data has an Id property
      };
      if(this.data != null){

        this.itemService.updateItem(updatedItem).subscribe((res: any) => {
          if (res) {
            this.editForm.reset();
            this.dialog.close();
          }
        })
      }else{
        this.itemService.createItem(updatedItem).subscribe((res: any) => {
          if (res) {
            this.editForm.reset();
            this.dialog.close();
          }
        })
      }

     
    }
  }


}
