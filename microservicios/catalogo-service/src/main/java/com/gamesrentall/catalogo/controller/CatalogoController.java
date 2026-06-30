package com.gamesrentall.catalogo.controller;

import com.gamesrentall.catalogo.entity.Juego;
import com.gamesrentall.catalogo.service.JuegoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogo")
public class CatalogoController {
    private static final Logger log = LoggerFactory.getLogger(CatalogoController.class);

    @Autowired
    private JuegoService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en CatalogoController");
        return "Catalogo Service funcionando localmente";
    }

    @GetMapping
    public List<Juego> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Juego> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Juego guardar(@RequestBody Juego juego) {
        return service.guardar(juego);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Juego> actualizar(@PathVariable Long id, @RequestBody Juego juego) {
        try {
            return ResponseEntity.ok(service.actualizar(id, juego));
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
