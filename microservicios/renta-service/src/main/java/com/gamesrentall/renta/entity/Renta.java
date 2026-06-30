package com.gamesrentall.renta.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "rentas")
public class Renta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private Long juegoId;
    private LocalDate fechaRenta;
    private LocalDate fechaDevolucion;
    private String estado;

    public Renta() {}

    public Renta(Long usuarioId, Long juegoId, LocalDate fechaRenta, LocalDate fechaDevolucion, String estado) {
        this.usuarioId = usuarioId;
        this.juegoId = juegoId;
        this.fechaRenta = fechaRenta;
        this.fechaDevolucion = fechaDevolucion;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getJuegoId() { return juegoId; }
    public void setJuegoId(Long juegoId) { this.juegoId = juegoId; }
    public LocalDate getFechaRenta() { return fechaRenta; }
    public void setFechaRenta(LocalDate fechaRenta) { this.fechaRenta = fechaRenta; }
    public LocalDate getFechaDevolucion() { return fechaDevolucion; }
    public void setFechaDevolucion(LocalDate fechaDevolucion) { this.fechaDevolucion = fechaDevolucion; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
