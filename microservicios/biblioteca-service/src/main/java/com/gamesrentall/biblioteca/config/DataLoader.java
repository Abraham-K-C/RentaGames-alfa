package com.gamesrentall.biblioteca.config;

import com.gamesrentall.biblioteca.entity.Biblioteca;
import com.gamesrentall.biblioteca.repository.BibliotecaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(BibliotecaRepository repository) {
        return args -> {
            repository.save(new Biblioteca(1L, 1L, LocalDate.now().minusDays(10)));
            repository.save(new Biblioteca(1L, 2L, LocalDate.now().minusDays(5)));
            repository.save(new Biblioteca(2L, 3L, LocalDate.now().minusDays(8)));
            repository.save(new Biblioteca(2L, 4L, LocalDate.now().minusDays(2)));
            repository.save(new Biblioteca(3L, 5L, LocalDate.now().minusDays(1)));
        };
    }
}
