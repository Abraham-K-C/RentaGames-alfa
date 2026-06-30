package com.gamesrentall.analitica.controller;

import com.gamesrentall.analitica.entity.EventoAnalitica;
import com.gamesrentall.analitica.service.EventoAnaliticaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analitica")
public class AnaliticaController {
    private static final Logger log = LoggerFactory.getLogger(AnaliticaController.class);

    @Autowired
    private EventoAnaliticaService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en AnaliticaController");
        return "Analitica Service funcionando localmente";
    }

    @GetMapping
    public List<EventoAnalitica> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoAnalitica> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EventoAnalitica guardar(@RequestBody EventoAnalitica evento) {
        return service.guardar(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoAnalitica> actualizar(@PathVariable Long id, @RequestBody EventoAnalitica evento) {
        try {
            return ResponseEntity.ok(service.actualizar(id, evento));
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
