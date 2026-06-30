package com.gamesrentall.analitica.config;

import com.gamesrentall.analitica.entity.EventoAnalitica;
import com.gamesrentall.analitica.repository.EventoAnaliticaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDateTime;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(EventoAnaliticaRepository repository) {
        return args -> {
            repository.save(new EventoAnalitica(1L, "LOGIN", LocalDateTime.now().minusHours(2)));
            repository.save(new EventoAnalitica(1L, "CONSULTA_CATALOGO", LocalDateTime.now().minusHours(1)));
            repository.save(new EventoAnalitica(2L, "LOGIN", LocalDateTime.now().minusMinutes(30)));
            repository.save(new EventoAnalitica(2L, "COMPRA", LocalDateTime.now().minusMinutes(10)));
            repository.save(new EventoAnalitica(3L, "LOGIN", LocalDateTime.now().minusMinutes(5)));
            repository.save(new EventoAnalitica(3L, "ALQUILER", LocalDateTime.now().minusMinutes(2)));
        };
    }
}
