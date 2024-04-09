import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HttpClientModule],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  Categories: CategoryModel[] = [];
  constructor(private service: CategoryService) { }
  ngOnInit(): void {
    this.service.getCategories().subscribe({
      next: (data) => { this.Categories = GeneralMethods.CastCategories(data); console.log(this.Categories); },
      error: (err) => console.log(err)
    });
  }
}
