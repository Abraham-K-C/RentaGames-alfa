package com.gamesrentall.pagos.service;

import com.gamesrentall.pagos.entity.Pago;
import com.gamesrentall.pagos.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private PagoRepository repository;

    public List<Pago> listarTodos() {
        return repository.findAll();
    }

    public Optional<Pago> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Pago guardar(Pago pago) {
        return repository.save(pago);
    }

    public Pago actualizar(Long id, Pago pagoActualizado) {
        return repository.findById(id).map(pago -> {
            pago.setUsuarioId(pagoActualizado.getUsuarioId());
            pago.setMonto(pagoActualizado.getMonto());
            pago.setMetodoPago(pagoActualizado.getMetodoPago());
            pago.setFechaPago(pagoActualizado.getFechaPago());
            pago.setEstado(pagoActualizado.getEstado());
            return repository.save(pago);
        }).orElseThrow(() -> new RuntimeException("Pago no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
