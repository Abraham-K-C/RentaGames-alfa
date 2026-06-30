package com.gamesrentall.renta.config;

import com.gamesrentall.renta.entity.Renta;
import com.gamesrentall.renta.repository.RentaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(RentaRepository repository) {
        return args -> {
            repository.save(new Renta(1L, 1L, LocalDate.now().minusDays(5), LocalDate.now().plusDays(2), "ACTIVO"));
            repository.save(new Renta(2L, 2L, LocalDate.now().minusDays(10), LocalDate.now().minusDays(3), "DEVUELTO"));
            repository.save(new Renta(3L, 3L, LocalDate.now().minusDays(1), LocalDate.now().plusDays(6), "ACTIVO"));
        };
    }
}
