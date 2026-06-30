package com.gamesrentall.notificaciones.config;

import com.gamesrentall.notificaciones.entity.Notificacion;
import com.gamesrentall.notificaciones.repository.NotificacionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(NotificacionRepository repository) {
        return args -> {
            repository.save(new Notificacion(1L, "Bienvenido a GamesRentAll!", LocalDate.now().minusDays(1), true));
            repository.save(new Notificacion(2L, "Tu renta de Minecraft vence mañana.", LocalDate.now(), false));
            repository.save(new Notificacion(3L, "Nueva oferta disponible: Descuento Indie.", LocalDate.now(), false));
        };
    }
}
