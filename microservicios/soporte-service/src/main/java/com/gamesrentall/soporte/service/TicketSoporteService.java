package com.gamesrentall.soporte.service;

import com.gamesrentall.soporte.entity.TicketSoporte;
import com.gamesrentall.soporte.repository.TicketSoporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketSoporteService {

    @Autowired
    private TicketSoporteRepository repository;

    public List<TicketSoporte> listarTodos() {
        return repository.findAll();
    }

    public Optional<TicketSoporte> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public TicketSoporte guardar(TicketSoporte ticket) {
        return repository.save(ticket);
    }

    public TicketSoporte actualizar(Long id, TicketSoporte ticketActualizado) {
        return repository.findById(id).map(ticket -> {
            ticket.setUsuarioId(ticketActualizado.getUsuarioId());
            ticket.setAsunto(ticketActualizado.getAsunto());
            ticket.setDescripcion(ticketActualizado.getDescripcion());
            ticket.setEstado(ticketActualizado.getEstado());
            return repository.save(ticket);
        }).orElseThrow(() -> new RuntimeException("Ticket no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
