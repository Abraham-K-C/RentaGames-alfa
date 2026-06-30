package com.gamesrentall.renta.service;

import com.gamesrentall.renta.entity.Renta;
import com.gamesrentall.renta.repository.RentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentaService {

    @Autowired
    private RentaRepository repository;

    public List<Renta> listarTodos() {
        return repository.findAll();
    }

    public Optional<Renta> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Renta guardar(Renta renta) {
        return repository.save(renta);
    }

    public Renta actualizar(Long id, Renta rentaActualizada) {
        return repository.findById(id).map(renta -> {
            renta.setUsuarioId(rentaActualizada.getUsuarioId());
            renta.setJuegoId(rentaActualizada.getJuegoId());
            renta.setFechaRenta(rentaActualizada.getFechaRenta());
            renta.setFechaDevolucion(rentaActualizada.getFechaDevolucion());
            renta.setEstado(rentaActualizada.getEstado());
            return repository.save(renta);
        }).orElseThrow(() -> new RuntimeException("Renta no encontrada con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
