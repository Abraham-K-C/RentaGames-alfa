package com.gamesrentall.catalogo.config;

import com.gamesrentall.catalogo.entity.Juego;
import com.gamesrentall.catalogo.repository.JuegoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(JuegoRepository repository) {
        return args -> {
            repository.save(new Juego("Minecraft", "Sandbox", 20.0, 50));
            repository.save(new Juego("Terraria", "Aventura", 10.0, 30));
            repository.save(new Juego("Stardew Valley", "Simulación", 12.0, 25));
            repository.save(new Juego("Hollow Knight", "Metroidvania", 15.0, 20));
            repository.save(new Juego("Cuphead", "Acción", 18.0, 15));
            repository.save(new Juego("Dead Cells", "Roguelike", 16.0, 22));
            repository.save(new Juego("Portal 2", "Puzzle", 8.0, 40));
            repository.save(new Juego("Left 4 Dead 2", "Shooter", 7.0, 45));
            repository.save(new Juego("Among Us", "Social", 5.0, 100));
            repository.save(new Juego("Undertale", "RPG", 10.0, 35));
            repository.save(new Juego("Celeste", "Plataformas", 12.0, 28));
            repository.save(new Juego("Limbo", "Puzzle", 6.0, 18));
            repository.save(new Juego("Inside", "Aventura", 8.0, 20));
            repository.save(new Juego("Slay the Spire", "Cartas", 14.0, 25));
            repository.save(new Juego("Vampire Survivors", "Roguelite", 7.0, 60));
            repository.save(new Juego("Human Fall Flat", "Física", 10.0, 30));
            repository.save(new Juego("Unrailed", "Cooperativo", 12.0, 15));
            repository.save(new Juego("Overcooked 2", "Cocina", 18.0, 22));
            repository.save(new Juego("Elden Ring", "RPG", 35.0, 10));
            repository.save(new Juego("Cyberpunk 2077", "RPG", 30.0, 12));
        };
    }
}
