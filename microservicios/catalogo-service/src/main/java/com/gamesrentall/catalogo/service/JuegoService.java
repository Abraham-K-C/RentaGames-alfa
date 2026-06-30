package com.gamesrentall.catalogo.service;

import com.gamesrentall.catalogo.entity.Juego;
import com.gamesrentall.catalogo.repository.JuegoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JuegoService {

    @Autowired
    private JuegoRepository repository;

    public List<Juego> listarTodos() {
        return repository.findAll();
    }

    public Optional<Juego> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Juego guardar(Juego juego) {
        return repository.save(juego);
    }

    public Juego actualizar(Long id, Juego juegoActualizado) {
        return repository.findById(id).map(juego -> {
            juego.setTitulo(juegoActualizado.getTitulo());
            juego.setGenero(juegoActualizado.getGenero());
            juego.setPrecio(juegoActualizado.getPrecio());
            juego.setStock(juegoActualizado.getStock());
            return repository.save(juego);
        }).orElseThrow(() -> new RuntimeException("Juego no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
