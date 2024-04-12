import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HttpClientModule, CategoryDetailsComponent],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  showDropdown = false;
  isDetailsPopup = false;
  Categories: CategoryModel[] = [];
  selectedCategory: CategoryModel | null = null;
  constructor(private service: CategoryService) { }
  ngOnInit(): void {
    this.service.getCategories().subscribe({
      /*this.Categories = [...this.Categories, ...this.Categories]; console.log(this.Categories);*/
      next: (data) => { this.Categories = GeneralMethods.CastCategories(data); this.Categories = [...this.Categories, ...this.Categories]; console.log(this.Categories); },
      error: (err) => console.log(err)
    });
  }

  openDetailedPopup() {
    this.selectedCategory = null;
    this.isDetailsPopup = true;
    moveTop();
  }
  editCategory(cat: CategoryModel) {
    this.openDetailedPopup();
    this.selectedCategory = cat;
  }
  closePopup(e: any) {
    this.isDetailsPopup = false;
    if (e.action !== "discard") { this.editCategoryDetalis(e); }
  }
  editCategoryDetalis(e: any) {
    console.log(e);
    const cat = e.category;
    console.log(cat);
    e.action === "add" ?
      this.Categories.push(cat)
      : e.action === "delete" ?
        this.Categories = this.Categories.filter((category) => category._id !== cat._id)
        : this.Categories = this.Categories.map((category) => {
          if (category._id === cat._id) { return { ...cat, ...{ products: category.products } }; }
          return category;
        });
  }
  toggleProductSort(val: string) {
    val === "lth" ?
      this.Categories.sort((a, b) => a.products! - b.products!)
      : this.Categories.sort((a, b) => b.products! - a.products!);
  }
}

function moveTop() {
  const top = document.getElementById('top');
  if (top) {
    top.scrollIntoView({ behavior: 'smooth' });
  }
}