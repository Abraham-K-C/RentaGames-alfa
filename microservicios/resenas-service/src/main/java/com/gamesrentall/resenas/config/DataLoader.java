package com.gamesrentall.resenas.config;

import com.gamesrentall.resenas.entity.Resena;
import com.gamesrentall.resenas.repository.ResenaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ResenaRepository repository) {
        return args -> {
            repository.save(new Resena(1L, 1L, "Excelente juego, muy adictivo!", 5));
            repository.save(new Resena(2L, 1L, "Me gusta mucho el estilo sandbox.", 4));
            repository.save(new Resena(3L, 2L, "Dificil pero justo.", 5));
            repository.save(new Resena(1L, 3L, "Relajante y divertido.", 5));
            repository.save(new Resena(2L, 4L, "Una obra maestra del genero.", 5));
        };
    }
}
