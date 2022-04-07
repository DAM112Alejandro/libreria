import { Component, OnInit } from '@angular/core';

import * as categoriaServiceService from '../categoria-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/classes/categoria';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[];
  updatecategoria:Categoria;
  deletecategoria:Categoria;
  constructor(private categoriaService: categoriaServiceService.CategoriaService) {
  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(data =>{
      this.categorias = data;
    })
  }
  public getCategorias(): void {
    this.categoriaService.findAll().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
        console.log(this.categorias);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public AddCategoria(addForm: NgForm): void {
    document.getElementById('add-categoria-form')?.click();
    this.categoriaService.addCategoria(addForm.value).subscribe(
      (response: Categoria) => {
        console.log(response);
        this.getCategorias();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCategoria(categoria: Categoria): void {
    console.log('categoriaedit', categoria);
    
     this.categoriaService.updateCategoria(categoria).subscribe(
       (response: Categoria) => {
       console.log(response);
       this.getCategorias();
      },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }
  public onDeleteCategoria(categoriaid: number): void {
    this.categoriaService.deleteCategoria(categoriaid).subscribe(
      (response: Categoria) => {
        console.log(response);
        this.getCategorias();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }

  public onOpenModal(categoria: Categoria, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCategoriaModal');
    }
    if (mode === 'edit') {
      this.updatecategoria = categoria;
      button.setAttribute('data-target', '#updateCategoriaModal');
    }
    if (mode === 'delete') {
      this.deletecategoria = categoria;
      button.setAttribute('data-target', '#deleteCategoriaModal');
    }
    container!.appendChild(button);
    button.click();
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Categoria[] = [];
    for (const categoria of this.categorias) {
      if (categoria.descripcion.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(categoria);
      }
    }
    this.categorias = results;
    if (results.length === 0 || !key) {
      this.getCategorias();
    }
  }
  
  }

