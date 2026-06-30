package com.gamesrentall.ofertas.controller;

import com.gamesrentall.ofertas.entity.Oferta;
import com.gamesrentall.ofertas.service.OfertaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
public class OfertasController {
    private static final Logger log = LoggerFactory.getLogger(OfertasController.class);

    @Autowired
    private OfertaService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en OfertasController");
        return "Ofertas Service funcionando localmente";
    }

    @GetMapping
    public List<Oferta> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oferta> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Oferta guardar(@RequestBody Oferta oferta) {
        return service.guardar(oferta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Oferta> actualizar(@PathVariable Long id, @RequestBody Oferta oferta) {
        try {
            return ResponseEntity.ok(service.actualizar(id, oferta));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
