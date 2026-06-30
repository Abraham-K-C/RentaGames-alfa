package com.gamesrentall.renta.controller;

import com.gamesrentall.renta.entity.Renta;
import com.gamesrentall.renta.service.RentaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/renta")
public class RentaController {
    private static final Logger log = LoggerFactory.getLogger(RentaController.class);

    @Autowired
    private RentaService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en RentaController");
        return "Renta Service funcionando localmente";
    }

    @GetMapping
    public List<Renta> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Renta> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Renta guardar(@RequestBody Renta renta) {
        return service.guardar(renta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Renta> actualizar(@PathVariable Long id, @RequestBody Renta renta) {
        try {
            return ResponseEntity.ok(service.actualizar(id, renta));
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
