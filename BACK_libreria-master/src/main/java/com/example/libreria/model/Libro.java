package com.example.libreria.model;


import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Libro implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITULO")
    private String titulo;

    @Column(name = "EDICION")
    private int edicion;


    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_Autor")
    @Nullable
    private Autor autor;

    @Getter
    @Setter
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_Categoria")
    @NotNull
    private Categoria categoria;
}