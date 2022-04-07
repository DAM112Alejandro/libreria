package com.example.libreria.services;

import com.example.libreria.model.Autor;
import com.example.libreria.repo.AutorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AutorServices {
    private AutorRepo autorRepo;
    private final String error = "No se ha encontrado al autor";

    @Autowired
    public AutorServices(AutorRepo autorRepo){
        this.autorRepo = autorRepo;
    }

    public Autor addAutor(Autor autor){
        return autorRepo.save(autor);
    }

    public List<Autor> findAllAutors(){
        return autorRepo.findAll();
    }

    public Autor findAutorByDni(String dni){
        return autorRepo.findAutorByDni(dni).orElseThrow(() -> new IllegalArgumentException(error));
    }

    public void deleteAutor(String dni){
        autorRepo.deleteAutorByDni(dni);
    }

    public Autor updateAutor(Autor autor, String dni){
        if (autorRepo.findAutorByDni(dni).isPresent() == true) {
            return autorRepo.save(autor);
        }else{
            throw  new IllegalArgumentException("El autor no existe");
        }
    }
}