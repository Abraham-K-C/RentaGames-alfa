package com.gamesrentall.biblioteca.service;

import com.gamesrentall.biblioteca.entity.Biblioteca;
import com.gamesrentall.biblioteca.repository.BibliotecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BibliotecaService {

    @Autowired
    private BibliotecaRepository repository;

    public List<Biblioteca> listarTodos() {
        return repository.findAll();
    }

    public Optional<Biblioteca> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Biblioteca guardar(Biblioteca biblioteca) {
        return repository.save(biblioteca);
    }

    public Biblioteca actualizar(Long id, Biblioteca bibliotecaActualizada) {
        return repository.findById(id).map(biblioteca -> {
            biblioteca.setUsuarioId(bibliotecaActualizada.getUsuarioId());
            biblioteca.setJuegoId(bibliotecaActualizada.getJuegoId());
            biblioteca.setFechaAgregado(bibliotecaActualizada.getFechaAgregado());
            return repository.save(biblioteca);
        }).orElseThrow(() -> new RuntimeException("Biblioteca no encontrada con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
