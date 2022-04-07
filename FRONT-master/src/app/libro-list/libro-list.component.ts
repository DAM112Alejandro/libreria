import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/classes/libro';
import { LibroService} from '../libro-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AutorService } from '../autor-service.service';
import { CategoriaService } from '../categoria-service.service';
import { Autor } from 'src/classes/autor';
import { Categoria } from 'src/classes/categoria';



@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css']
})
export class LibroListComponent implements OnInit {

  libros: Libro[];
  updatelibro: Libro;
  deletelibro: Libro;
  autores= [];
  autors: Autor[];
  categorias= [];
  
  constructor(private libroService: LibroService, private autorService: AutorService, private categoriaService: CategoriaService) { 
    this.updatelibro = {
      id: null,
      titulo: "",
      edicion: null,
      autor: {
        dni: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        telefono: "",
        email: ""
      },
      categoria: {
        id: null,
        descripcion: ""
      }
    }   
    this.deletelibro = {
      id: null,
      titulo: "",
      edicion: null,
      autor: {
        dni: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        telefono: "",
        email: ""
      },
      categoria: {
        id: null,
        descripcion: ""
      }
    }  
   
  }

  ngOnInit(): void {
    this.libroService.findAll().subscribe(data => {
      this.libros = data;
    });
    this.getAutor()
    this.getCategoria()
    
  }

  public getLibros(): void {
    this.libroService.findAll().subscribe(
      (response: Libro[]) => {
        this.libros = response;
        console.log(this.libros);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddLibro(addForm: NgForm): void {  
  document.getElementById('add-libro-form').click();
  this.libroService.addLibro(this.updatelibro).subscribe(
      (response: Libro) => {
        console.log(response);
        this.getLibros();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );  
    
    
  }
  public onUpdateLibro(libro: Libro): void {
    console.log('libroedit', libro);
    
     this.libroService.updateLibro(libro).subscribe(
       (response: Libro) => {
       console.log(response);
       this.getLibros();
      },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }
  public onDeleteLibro(libroid: number): void {
    this.libroService.deleteLibro(libroid).subscribe(
      (response: Libro) => {
        console.log(response);
        this.getLibros();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getCategoria(): void{
    this.categoriaService.findAll().subscribe(categorias=>{
      console.log(categorias);
      categorias.forEach(categoria =>{
        this.categorias.push({
          text: categoria.descripcion,
          value: categoria.id
        });
      })
    })
    console.log(this.categorias);
    
  }

  public getAutor(): void{
    this.autorService.findAll().subscribe(autores=>{
      console.log(autores);
      
      autores.forEach(autor => {
        this.autores.push({ 
        text: autor.nombre,
        value: autor.dni})
      });
      this.autors = autores;
    })
    console.log(this.autores);
  }
  public onOpenModal(libro: Libro, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addLibroModal');
    }
    if (mode === 'edit') {
      this.updatelibro = libro;
      button.setAttribute('data-target', '#updateLibroModal');
    }
    if (mode === 'delete') {
      this.deletelibro = libro;
      button.setAttribute('data-target', '#deleteLibroModal');
    }
    container!.appendChild(button);
    button.click();
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Libro[] = [];
    for (const libro of this.libros) {
      if (libro.titulo.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || libro.categoria.descripcion.toLowerCase().indexOf(key.toLowerCase()) !== -1)  {
        results.push(libro);
      }
    }
    this.libros = results;
    if (results.length === 0 || !key) {
      this.getLibros();
    }
    console.log("hjg", results);
    
  }
}