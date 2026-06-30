package com.gamesrentall.resenas.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "resenas")
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long usuarioId;
    private Long juegoId;
    private String comentario;
    private Integer calificacion;

    public Resena() {}

    public Resena(Long usuarioId, Long juegoId, String comentario, Integer calificacion) {
        this.usuarioId = usuarioId;
        this.juegoId = juegoId;
        this.comentario = comentario;
        this.calificacion = calificacion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public Long getJuegoId() { return juegoId; }
    public void setJuegoId(Long juegoId) { this.juegoId = juegoId; }
    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
    public Integer getCalificacion() { return calificacion; }
    public void setCalificacion(Integer calificacion) { this.calificacion = calificacion; }
}
