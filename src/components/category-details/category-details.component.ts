import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {
  counter = 3;
  isUpdate = false;
  isDeleted = false;
  imgeURl = "";
  myFormGroup: any;
  isSuccess = false;
  canDelete = false;
  btnAction = "Update";
  btnImageAction = "";
  @Input() selectedCategory: any;
  @Output() endAction = new EventEmitter();
  validator = {
    name: "",
    image: "",
  }

  constructor(private serivce: CategoryService) { }
  ngOnChanges(changes: SimpleChanges) {
    this.btnImageAction = "";
    this.validator.image = "";
    if (changes['selectedCategory']) {
      if (this.selectedCategory) {
        this.isUpdate = true;
        this.imgeURl = this.selectedCategory.image;
        this.myFormGroup = this.HandleForm();
        console.log(this.selectedCategory);
        if (this.selectedCategory.products < 1) this.canDelete = true;
      }
      else {
        if (this.isUpdate) { this.resetForm(); }
        this.imgeURl = "https://cdn0.iconfinder.com/data/icons/interface-10/128/_add_image-4096.png";
      }
    }
    this.CompnonentConfigration();
  }

  deleteCategory() {
    this.isDeleted= true;
    const result = confirm(`Are you sure to Delete\n${this.selectedCategory.name}`);
    if (result) {
      this.serivce.deleteCategory(this.selectedCategory._id).subscribe({
        next: (data) => {
          this.isSuccess = true;
          this.fireToastSuccess({ action: "delete", category: this.selectedCategory })
        },
        error: (err) => alert(err)
      });
    }
  }
  discardChanges() {
    this.endAction.emit({ action: "discard" });
  }
  private fireToastSuccess(data: any) {
    if (this.isSuccess) {
      const timer = setInterval(() => {
        --this.counter;
      }, 800);

      setTimeout(() => {
        clearInterval(timer);
        this.endAction.emit(data);
      }, 3000);
    }
  }
  async AddNeworUpdate() {
    let cat = this.fetshProductData();
    if (this.myFormGroup.valid) {
      if (this.isUpdate) {
        console.log(cat)
        console.log(this.selectedCategory._id)
        this.serivce.updateCategory({ ...{ id: this.selectedCategory._id }, ...cat }).subscribe({
          next: (data) => {
            this.isSuccess = true;
            this.fireToastSuccess({ action: "update", category: { ...{ _id: this.selectedCategory._id }, ...cat } })
          },
          error: (err) => alert(err)
        });
      } else {
        this.serivce.addCategory(cat).subscribe({
          next: (data) => {
            this.isSuccess = true;
            this.fireToastSuccess({ action: "add", category: { ...{ _id: GeneralMethods.CastCategory(data)._id, products:0 }, ...cat } })
          },
          error: (err) => alert(err)
        });
      }
    }
    else {
      alert("Not Valid")
    }
    if (this.isSuccess) {
      console.log("isSuccess")
      const timer = setInterval(() => {
        console.log("setInterval")
        --this.counter;
      }, 800);

      setTimeout(() => {
        console.log("setTimeout")
        clearInterval(timer);
        console.log("clearInterval")
        this.endAction.emit({
          category: cat,
          action: this.isUpdate ? "update" : "add"
        });
      }, 3000);
    }
  }
  handelImageChange(e: any) {
    const input = e.target.value;
    if (input === "") {
      this.validator.image = "Image is required";
      this.btnImageAction = "Wating Valid URL ......";
      this.imgeURl = "https://cdn0.iconfinder.com/data/icons/interface-10/128/_add_image-4096.png"
    } else {
      if (!input.includes(".webp") && !input.includes(".jpg") && !input.includes(".jpeg")
        && !input.includes(".png") && !input.includes("image") && !input.includes("bing")
        && !input.includes("upload") && !input.includes("photo")) {
        this.validator.image = "Invalid Image URL";
        this.btnImageAction = "Wating Valid URL ......";
        this.imgeURl = "https://cdn0.iconfinder.com/data/icons/interface-10/128/_add_image-4096.png"
      }
      else {
        this.imgeURl = input;
        this.validator.image = "";
        this.btnImageAction = "";
      }
    }
  }
  CompnonentConfigration() {
    if (!this.isUpdate) {
      this.myFormGroup = this.HandleForm();
      this.myFormGroup.controls["image"].setValue("");
      this.btnImageAction = "Wating Valid URL ......";
      this.validator.image = "Image is required";
    }
    this.btnAction = this.isUpdate ? "Update" : "Add New";

  }
  private HandleForm() {
    const name = this.isUpdate ? this.selectedCategory.name[0].toUpperCase() + this.selectedCategory.name.slice(1) : "";
    return new FormGroup({
      name: new FormControl(name, [Validators.minLength(4), Validators.pattern(/^[a-zA-Z-_]*$/)]),
      image: new FormControl(this.imgeURl, Validators.required),
    })
  }

  private fetshProductData() {
    return {
      image: this.imgeURl,
      name: this.myFormGroup.get('name').value.toLowerCase(),
    } as CategoryModel;
  }

  private resetForm() {
    this.imgeURl = "";
    this.isUpdate = false;
    this.btnImageAction = "";
    this.btnAction = "Update";
    this.myFormGroup.controls["image"].setValue("");
    this.myFormGroup.controls["name"].setValue("");
  }

  get isImageValid() {
    return this.validator.image === "" ? true : false;
  }

  get isNameValid() {
    const input = this.myFormGroup.controls["name"];
    if (input.errors)
      this.validator.name = TextValidator(input.errors);
    return input.valid;
  }
}
function TextValidator(error: any): any {
  if (error.pattern)
    return "Invalid Name.... Only Letters and [_-] are allowed"
  else if (error.minlength)
    return "Length Must be More than 4"
}