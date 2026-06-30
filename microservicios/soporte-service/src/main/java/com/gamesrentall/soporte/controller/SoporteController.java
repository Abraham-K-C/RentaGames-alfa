package com.gamesrentall.soporte.controller;

import com.gamesrentall.soporte.entity.TicketSoporte;
import com.gamesrentall.soporte.service.TicketSoporteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/soporte")
public class SoporteController {
    private static final Logger log = LoggerFactory.getLogger(SoporteController.class);

    @Autowired
    private TicketSoporteService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en SoporteController");
        return "Soporte Service funcionando localmente";
    }

    @GetMapping
    public List<TicketSoporte> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketSoporte> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TicketSoporte guardar(@RequestBody TicketSoporte ticket) {
        return service.guardar(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketSoporte> actualizar(@PathVariable Long id, @RequestBody TicketSoporte ticket) {
        try {
            return ResponseEntity.ok(service.actualizar(id, ticket));
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
