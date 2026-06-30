package com.gamesrentall.pagos.controller;

import com.gamesrentall.pagos.entity.Pago;
import com.gamesrentall.pagos.service.PagoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagosController {
    private static final Logger log = LoggerFactory.getLogger(PagosController.class);

    @Autowired
    private PagoService service;

    @GetMapping("/test")
    public String test() {
        log.info("Petición de prueba recibida en PagosController");
        return "Pagos Service funcionando localmente";
    }

    @GetMapping
    public List<Pago> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pago guardar(@RequestBody Pago pago) {
        return service.guardar(pago);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pago> actualizar(@PathVariable Long id, @RequestBody Pago pago) {
        try {
            return ResponseEntity.ok(service.actualizar(id, pago));
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
