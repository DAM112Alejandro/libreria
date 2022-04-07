package com.example.libreria.resource;

import com.example.libreria.model.Autor;
import com.example.libreria.services.AutorServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Component
@RestController
@RequestMapping("/autor")
public class AutorResource {
    private final AutorServices autorServices;

    public AutorResource(AutorServices autorServices) {
        this.autorServices = autorServices;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Autor>> getAllAutors(){
        List<Autor> autors = autorServices.findAllAutors();
        return new ResponseEntity<>(autors, HttpStatus.OK);
    }
    @GetMapping("/getById/{dni}")
    public ResponseEntity<Autor> getAutorsById(@PathVariable("dni") String dni){
        Autor autor = autorServices.findAutorByDni(dni);
        return new ResponseEntity<>(autor, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Autor> addAutor(@RequestBody Autor autor){
        Autor newAutor = autorServices.addAutor(autor);
        return new ResponseEntity<>(newAutor, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Autor> updateAutor(@RequestBody Autor autor){
        Autor updateAutor = autorServices.updateAutor(autor, autor.getDni());
        return new ResponseEntity<>(updateAutor, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{dni}")
    public ResponseEntity<Autor> deleteAutor(@PathVariable("dni") String dni){
        autorServices.deleteAutor(dni);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}