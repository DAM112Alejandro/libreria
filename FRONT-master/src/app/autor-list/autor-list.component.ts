import { Component, OnInit } from '@angular/core';
import { AutorService } from '../autor-service.service';
import { Autor } from 'src/classes/autor';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {

  autors: Autor[];
  updateautor:Autor;
  deleteautor:Autor;


  constructor(private autorService: AutorService) {
   }
 

  ngOnInit(): void {
    this.autorService.findAll().subscribe(data => {
      this.autors = data;
    });
  }

  public getAutors(): void {
    this.autorService.findAll().subscribe(
      (response: Autor[]) => {
        this.autors = response;
        console.log(this.autors);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public AddAutor(addForm: NgForm): void {
    document.getElementById('add-autor-form')?.click();
    this.autorService.addAutor(addForm.value).subscribe(
      (response: Autor) => {
        console.log(response);
        this.getAutors();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateautors(autor: Autor): void {
    console.log('autoredit', autor);
    
     this.autorService.updateAutor(autor).subscribe(
       (response: Autor) => {
       console.log(response);
       this.getAutors();
      },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
  }
  public onDeleteAutor(autorid: string): void {
    this.autorService.deleteAutor(autorid).subscribe(
      (response: Autor) => {
        console.log(response);
        this.getAutors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(autor: Autor, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAutorModal');
    }
    if (mode === 'edit') {
      this.updateautor = autor;
      button.setAttribute('data-target', '#updateAutorModal');
    }
    if (mode === 'delete') {
      this.deleteautor = autor;
      button.setAttribute('data-target', '#deleteAutorModal');
    }
    container!.appendChild(button);
    button.click();
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Autor[] = [];
    for (const autor of this.autors) {
      if (autor.nombre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || autor.apellido1.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || autor.apellido2.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || autor.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || autor.telefono.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1) {
        results.push(autor);
      }
    }
    this.autors = results;
    if (results.length === 0 || !key) {
      this.getAutors();
    }
  }
}
 