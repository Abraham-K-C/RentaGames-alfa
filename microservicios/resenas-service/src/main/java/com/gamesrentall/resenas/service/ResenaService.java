package com.gamesrentall.resenas.service;

import com.gamesrentall.resenas.entity.Resena;
import com.gamesrentall.resenas.repository.ResenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResenaService {

    @Autowired
    private ResenaRepository repository;

    public List<Resena> listarTodos() {
        return repository.findAll();
    }

    public Optional<Resena> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Resena guardar(Resena resena) {
        return repository.save(resena);
    }

    public Resena actualizar(Long id, Resena resenaActualizada) {
        return repository.findById(id).map(resena -> {
            resena.setUsuarioId(resenaActualizada.getUsuarioId());
            resena.setJuegoId(resenaActualizada.getJuegoId());
            resena.setComentario(resenaActualizada.getComentario());
            resena.setCalificacion(resenaActualizada.getCalificacion());
            return repository.save(resena);
        }).orElseThrow(() -> new RuntimeException("Resena no encontrada con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
