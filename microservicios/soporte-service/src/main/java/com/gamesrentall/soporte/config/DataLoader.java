package com.gamesrentall.soporte.config;

import com.gamesrentall.soporte.entity.TicketSoporte;
import com.gamesrentall.soporte.repository.TicketSoporteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(TicketSoporteRepository repository) {
        return args -> {
            repository.save(new TicketSoporte(1L, "Error en descarga", "No puedo descargar el juego Minecraft.", "ABIERTO"));
            repository.save(new TicketSoporte(2L, "Problema con el pago", "Se me cobro dos veces.", "CERRADO"));
            repository.save(new TicketSoporte(3L, "Consulta técnica", "Requerimientos para Elden Ring.", "ABIERTO"));
        };
    }
}
