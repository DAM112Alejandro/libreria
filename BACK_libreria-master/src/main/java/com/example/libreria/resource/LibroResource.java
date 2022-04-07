package com.example.libreria.resource;

import com.example.libreria.model.Libro;
import com.example.libreria.services.LibroServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libro")
public class LibroResource {
    @Autowired
    private LibroServices libroServices;


 public LibroResource(LibroServices libroServices){
       this.libroServices = libroServices; }

    @GetMapping("/all")
    public ResponseEntity<List<Libro>> getAllLibros(){
        List<Libro> libros = libroServices.findAllLibros();
        return new ResponseEntity<List<Libro>>(libros, HttpStatus.OK);
    }
    @GetMapping("getById/{id}")
    public ResponseEntity<Libro> getLibroById(@PathVariable("id") Long id){
        Libro libro = libroServices.findLibroById(id);
        return new ResponseEntity<>(libro, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Libro> addLibro(@RequestBody Libro libro){
             Libro newLibro= libroServices.addLibro(libro);
     return new ResponseEntity<>(newLibro, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Libro> updateLibro(@RequestBody Libro libro){
           Libro updateLibro = libroServices.updateLibro(libro, libro.getId());
        return new ResponseEntity<>(updateLibro, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Libro> deleteLibro(@PathVariable("id") Long id){
        libroServices.deleteLibro(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/autor/{dni}")
    public ResponseEntity<List<Libro>> getLibrosMismoAutor(@PathVariable("dni") String dni){
        List<Libro> libros = libroServices.findLibroByAutorId(dni);
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }
    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<Libro>> getLibrosMismaCategoria(@PathVariable("id") Long id){
        List<Libro> libros = libroServices.findLibroByCategoriaId(id);
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }
}