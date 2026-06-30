package com.gamesrentall.ofertas.config;

import com.gamesrentall.ofertas.entity.Oferta;
import com.gamesrentall.ofertas.repository.OfertaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(OfertaRepository repository) {
        return args -> {
            repository.save(new Oferta("Oferta de Verano", 20.0, LocalDate.now().minusDays(5), LocalDate.now().plusDays(25)));
            repository.save(new Oferta("Black Friday", 50.0, LocalDate.now().plusDays(10), LocalDate.now().plusDays(15)));
            repository.save(new Oferta("Descuento Indie", 15.0, LocalDate.now(), LocalDate.now().plusDays(7)));
        };
    }
}
