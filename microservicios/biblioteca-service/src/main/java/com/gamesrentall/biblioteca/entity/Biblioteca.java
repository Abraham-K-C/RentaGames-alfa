package com.gamesrentall.biblioteca.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "bibliotecas")
public class Biblioteca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private Long juegoId;
    private LocalDate fechaAgregado;

    public Biblioteca() {}

    public Biblioteca(Long usuarioId, Long juegoId, LocalDate fechaAgregado) {
        this.usuarioId = usuarioId;
        this.juegoId = juegoId;
        this.fechaAgregado = fechaAgregado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getJuegoId() { return juegoId; }
    public void setJuegoId(Long juegoId) { this.juegoId = juegoId; }
    public LocalDate getFechaAgregado() { return fechaAgregado; }
    public void setFechaAgregado(LocalDate fechaAgregado) { this.fechaAgregado = fechaAgregado; }
}
