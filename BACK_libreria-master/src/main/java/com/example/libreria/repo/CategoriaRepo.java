package com.example.libreria.repo;

import com.example.libreria.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface CategoriaRepo extends JpaRepository<Categoria, Long> {
    void deleteCategoriaById(Long id);

    Optional<Categoria> findCategoriaById(Long id);
}