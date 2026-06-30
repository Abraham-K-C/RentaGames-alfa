package com.gamesrentall.analitica.service;

import com.gamesrentall.analitica.entity.EventoAnalitica;
import com.gamesrentall.analitica.repository.EventoAnaliticaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoAnaliticaService {

    @Autowired
    private EventoAnaliticaRepository repository;

    public List<EventoAnalitica> listarTodos() {
        return repository.findAll();
    }

    public Optional<EventoAnalitica> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public EventoAnalitica guardar(EventoAnalitica evento) {
        return repository.save(evento);
    }

    public EventoAnalitica actualizar(Long id, EventoAnalitica eventoActualizado) {
        return repository.findById(id).map(evento -> {
            evento.setUsuarioId(eventoActualizado.getUsuarioId());
            evento.setAccion(eventoActualizado.getAccion());
            evento.setFechaEvento(eventoActualizado.getFechaEvento());
            return repository.save(evento);
        }).orElseThrow(() -> new RuntimeException("Evento no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
