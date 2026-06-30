package com.gamesrentall.resenas.controller;

import com.gamesrentall.resenas.entity.Resena;
import com.gamesrentall.resenas.service.ResenaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resenas")
public class ResenasController {
    private static final Logger log = LoggerFactory.getLogger(ResenasController.class);

    @Autowired
    private ResenaService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en ResenasController");
        return "Resenas Service funcionando localmente";
    }

    @GetMapping
    public List<Resena> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resena> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Resena guardar(@RequestBody Resena resena) {
        return service.guardar(resena);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resena> actualizar(@PathVariable Long id, @RequestBody Resena resena) {
        try {
            return ResponseEntity.ok(service.actualizar(id, resena));
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
