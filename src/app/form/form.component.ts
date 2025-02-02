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
  Categories: string[] = ['Electronics','Clothing', 'Books', 'Others'];

  constructor(private fb: FormBuilder, private itemService: ItemsService,private dialog: MatDialogRef<FormComponent>) { }

  ngOnInit() {
    if(this.data != null){
      this.editForm = this.fb.group({
        name: [this.data?.name, Validators.required], // Use optional chaining if data might be undefined
        description: [this.data?.description, Validators.required],
        category: [this.data?.category, Validators.required]
      });
    }else{
      this.editForm = this.fb.group({
        name: ['', Validators.required], // Use optional chaining if data might be undefined
        description: ['', Validators.required],
        category: ['', Validators.required],
        actions: [true]
      });
      
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedItem: ItemData = {
        ...this.editForm.value,
        id: this.data == null ? this.args.id : (this.data && this.data.id)// Assuming data has an Id property
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
