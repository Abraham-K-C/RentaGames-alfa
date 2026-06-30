package com.gamesrentall.ofertas.service;

import com.gamesrentall.ofertas.entity.Oferta;
import com.gamesrentall.ofertas.repository.OfertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfertaService {

    @Autowired
    private OfertaRepository repository;

    public List<Oferta> listarTodos() {
        return repository.findAll();
    }

    public Optional<Oferta> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Oferta guardar(Oferta oferta) {
        return repository.save(oferta);
    }

    public Oferta actualizar(Long id, Oferta ofertaActualizada) {
        return repository.findById(id).map(oferta -> {
            oferta.setTitulo(ofertaActualizada.getTitulo());
            oferta.setDescuento(ofertaActualizada.getDescuento());
            oferta.setFechaInicio(ofertaActualizada.getFechaInicio());
            oferta.setFechaFin(ofertaActualizada.getFechaFin());
            return repository.save(oferta);
        }).orElseThrow(() -> new RuntimeException("Oferta no encontrada con id: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
