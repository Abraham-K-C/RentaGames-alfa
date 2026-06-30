package com.gamesrentall.biblioteca.controller;

import com.gamesrentall.biblioteca.entity.Biblioteca;
import com.gamesrentall.biblioteca.service.BibliotecaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/biblioteca")
public class BibliotecaController {
    private static final Logger log = LoggerFactory.getLogger(BibliotecaController.class);

    @Autowired
    private BibliotecaService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en BibliotecaController");
        return "Biblioteca Service funcionando localmente";
    }

    @GetMapping
    public List<Biblioteca> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Biblioteca> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Biblioteca guardar(@RequestBody Biblioteca biblioteca) {
        return service.guardar(biblioteca);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Biblioteca> actualizar(@PathVariable Long id, @RequestBody Biblioteca biblioteca) {
        try {
            return ResponseEntity.ok(service.actualizar(id, biblioteca));
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
