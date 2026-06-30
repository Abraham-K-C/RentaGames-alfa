package com.gamesrentall.notificaciones.service;

import com.gamesrentall.notificaciones.entity.Notificacion;
import com.gamesrentall.notificaciones.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacionService {

    @Autowired
    private NotificacionRepository repository;

    public List<Notificacion> listarTodos() {
        return repository.findAll();
    }

    public Optional<Notificacion> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Notificacion guardar(Notificacion notificacion) {
        return repository.save(notificacion);
    }

    public Notificacion actualizar(Long id, Notificacion notificacionActualizada) {
        return repository.findById(id).map(notificacion -> {
            notificacion.setUsuarioId(notificacionActualizada.getUsuarioId());
            notificacion.setMensaje(notificacionActualizada.getMensaje());
            notificacion.setFechaEnvio(notificacionActualizada.getFechaEnvio());
            notificacion.setLeido(notificacionActualizada.getLeido());
            return repository.save(notificacion);
        }).orElseThrow(() -> new RuntimeException("Notificacion no encontrada con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
