package com.gamesrentall.usuario.config;

import com.gamesrentall.usuario.entity.Usuario;
import com.gamesrentall.usuario.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository repository) {
        return args -> {
            repository.save(new Usuario("Juan Perez", "juan.perez@example.com", "pass123"));
            repository.save(new Usuario("Maria Lopez", "maria.lopez@example.com", "pass123"));
            repository.save(new Usuario("Carlos Torres", "carlos.torres@example.com", "pass123"));
            repository.save(new Usuario("Ana Ramirez", "ana.ramirez@example.com", "pass123"));
            repository.save(new Usuario("Diego Flores", "diego.flores@example.com", "pass123"));
            repository.save(new Usuario("Laura Garcia", "laura.garcia@example.com", "pass123"));
            repository.save(new Usuario("Pedro Sanchez", "pedro.sanchez@example.com", "pass123"));
            repository.save(new Usuario("Elena Castro", "elena.castro@example.com", "pass123"));
        };
    }
}
