package com.example.libreria.repo;

import com.example.libreria.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


public interface AutorRepo extends JpaRepository<Autor, String> {
    void deleteAutorByDni(String dni);

    Optional<Autor> findAutorByDni(String dni);

}