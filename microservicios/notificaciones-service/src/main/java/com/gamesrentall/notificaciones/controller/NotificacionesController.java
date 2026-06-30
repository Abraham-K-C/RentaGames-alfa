package com.gamesrentall.notificaciones.controller;

import com.gamesrentall.notificaciones.entity.Notificacion;
import com.gamesrentall.notificaciones.service.NotificacionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionesController {
    private static final Logger log = LoggerFactory.getLogger(NotificacionesController.class);

    @Autowired
    private NotificacionService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en NotificacionesController");
        return "Notificaciones Service funcionando localmente";
    }

    @GetMapping
    public List<Notificacion> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notificacion> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Notificacion guardar(@RequestBody Notificacion notificacion) {
        return service.guardar(notificacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notificacion> actualizar(@PathVariable Long id, @RequestBody Notificacion notificacion) {
        try {
            return ResponseEntity.ok(service.actualizar(id, notificacion));
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
