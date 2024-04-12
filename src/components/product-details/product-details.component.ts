import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [CategoryService, ProductService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() selectedProduct: any;
  isUpdate = false;
  myFormGroup: any;
  isSuccess = false;
  counter: number = 3;
  btnAction = "Update";
  imgList: string[] = [];
  isAddingNewImage = true;
  btnImageAction = "Add Image";
  Categories: CategoryModel[] = [];
  @Output() endAction = new EventEmitter();
  validator = {
    name: "",
    desc: "",
    price: "",
    image: "",
    discount: "",
    category: "",
    quantity: "",
  }
  constructor(private service: CategoryService, private prdService: ProductService) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedProduct']) {
      if (this.selectedProduct) {
        this.isUpdate = true;
        this.isAddingNewImage = false;
        this.imgList = this.selectedProduct.images;
        this.myFormGroup = this.HandleForm();
      }
      else {
        if (this.isUpdate) {
          this.resetForm();
        }
      }
    }
  }
  ngOnInit() {
    console.log("No")
    this.service.getCategories().subscribe({
      next: (data) => this.Categories = GeneralMethods.CastCategories(data),
      error: (err) => console.log(err)
    });
    this.btnAction = this.isUpdate ? "Update" : "Add New";
    this.myFormGroup = this.HandleForm();
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
    const prd = this.fetshProductData();
    if (this.myFormGroup.valid) {
      if (this.isUpdate) {
        this.prdService.updateProduct(prd, this.selectedProduct._id).subscribe({
          next: (data) => {
            this.isSuccess = true;
            this.fireToastSuccess({ action: "update", product: { ...{ _id: this.selectedProduct._id }, ...prd } })
          },
          error: (err) => alert(err)
        });
      } else {
        this.prdService.addProduct(prd).subscribe({
          next: (data) => {
            this.isSuccess = true;
            this.fireToastSuccess({ action: "add", product: { ...{ _id: GeneralMethods.CastCategory(data)._id }, ...prd } })
          },
          error: (err) => alert(err)
        });
      }
    }
    else {
      alert("Not Valid")
    }
  }
  get getCounter() {
    return this.counter;
  }
  discardAll() {
    this.endAction.emit();
  }
  get isNameValid() {
    const input = this.myFormGroup.controls["name"];
    if (input.errors)
      this.validator.name = TextValidator(input.errors, 5);
    return input.valid;
  }

  get isDescValid() {
    const input = this.myFormGroup.controls["desc"];
    if (input.errors)
      this.validator.desc = TextValidator(input.errors, 100);
    return input.valid;
  }

  get isPriceValid() {
    const input = this.myFormGroup.controls["price"];
    if (input.errors)
      this.validator.price = NumberValidator(input.errors, "Price");
    return input.valid;
  }

  get isDiscountValid() {
    const input = this.myFormGroup.controls["discount"];
    if (input.errors)
      this.validator.discount = DiscountValidator(input.errors);
    return input.valid;
  }

  get isQuantityValid() {
    const input = this.myFormGroup.controls["quantity"];
    if (input.errors)
      this.validator.quantity = NumberValidator(input.errors, "Quantity");
    return input.valid;
  }

  get isCategoryValid() {
    const input = this.myFormGroup.controls["category"];
    if (!this.isUpdate)
      input.value === "" ?
        this.validator.category = "Category is required"
        : this.validator.category = "";
    return input.valid;
  }

  handelImageChange(e: any) {
    const input = e.target.value;
    if (input === "") {
      this.validator.image = "Image is required";
      this.btnImageAction = "Wating Valid URL ......";
    } else {
      if (!input.includes(".webp") && !input.includes(".jpg") &&
        !input.includes("image") && !input.includes(".jpeg") &&
        !input.includes(".png") && !input.includes("bing")) {
        this.validator.image = "Invalid Image URL";
        this.btnImageAction = "Wating Valid URL ......";
      }
      else {
        this.validator.image = "";
        this.btnImageAction = "Save Image";
      }
    }
  }
  get isImageValid() {
    return this.validator.image === "" ? true : false;
  }

  addImageAction() {
    if (!this.isAddingNewImage) {
      this.btnImageAction = "Save Image";
      this.isAddingNewImage = !this.isAddingNewImage;
    }
    else {
      if (this.myFormGroup.get('image').value !== "") {
        this.imgList.push(this.myFormGroup.get('image').value);
        this.isAddingNewImage = !this.isAddingNewImage;
        this.myFormGroup.get('image').setValue("");
        this.btnImageAction = "Add Image";
      }
    }
    console.log(this.imgList);
  }
  private HandleForm() {
    return new FormGroup({
      category: new FormControl(""),
      image: new FormControl("", Validators.required),
      name: new FormControl(this.isUpdate ? this.selectedProduct.name : "", Validators.minLength(5)),
      desc: new FormControl(this.isUpdate ? this.selectedProduct.desc : "", Validators.minLength(20)),
      price: new FormControl(this.isUpdate ? this.selectedProduct.price : "", [Validators.min(0), Validators.pattern('[1-9][0-9.]*')]),
      quantity: new FormControl(this.isUpdate ? this.selectedProduct.quantity : "", [Validators.min(0), Validators.pattern('[0-9]*')]),
      discount: new FormControl(this.isUpdate ? this.selectedProduct.discount : "", [Validators.min(0), Validators.max(100), Validators.pattern('[0-9]*')]),
    })
  }

  private resetForm() {
    this.imgList = [];
    this.isUpdate = false;
    this.isAddingNewImage = true;
    this.btnImageAction = "Add Image";

    this.myFormGroup.controls["image"].setValue();
    this.myFormGroup.controls["name"].setValue("");
    this.myFormGroup.controls["desc"].setValue("");
    this.myFormGroup.controls["price"].setValue("");
    this.myFormGroup.controls["quantity"].setValue("");
    this.myFormGroup.controls["discount"].setValue("");

    const divImages = document.getElementById('div-images');
    while (divImages?.firstChild) {
      divImages.removeChild(divImages.firstChild);
    }
  }
  private fetshProductData() {
    const date = new Date();
    const fDate = date.toISOString().split('T')[0];
    console.log(this.myFormGroup.get('image'));
    this.myFormGroup.get('image').setValue(this.imgList[0]);
    return {
      images: this.imgList,
      name: this.myFormGroup.get('name').value,
      desc: this.myFormGroup.get('desc').value,
      price: this.myFormGroup.get('price').value,
      quantity: this.myFormGroup.get('quantity').value,
      discount: this.myFormGroup.get('discount').value,
      star: this.isUpdate ? this.selectedProduct.star : 0,
      createdAt: this.isUpdate ? this.selectedProduct.createdAt : fDate,
      numberOfRates: this.isUpdate ? this.selectedProduct.numberOfRates : 0,
      numberOfSellings: this.isUpdate ? this.selectedProduct.numberOfSellings : 0,
      cat: this.isUpdate ? this.selectedProduct.cat : [this.myFormGroup.get('category').value]
    } as ProductModel;
  }
}

// star: number,0
// createdAt: string,now
// numberOfRates: number,0
// numberOfSellings: number,0

function TextValidator(error: any, length: number): any {
  console.log(error)
  if (error.minlength)
    return `Length Must be More than ${length}`
}

function NumberValidator(error: any, label: string): any {
  console.log(error)
  if (error.pattern || error.min)
    return `${label} Should be More than 0`
}

function DiscountValidator(error: any): any {
  if (error.pattern)
    return "Invalid Discount... Only Numbers"

  else if (error.min)
    return "Discount Should be More than 0"

  else if (error.max)
    return "Discount Should be Less than 100"
}
