package com.gamesrentall.pagos.config;

import com.gamesrentall.pagos.entity.Pago;
import com.gamesrentall.pagos.repository.PagoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(PagoRepository repository) {
        return args -> {
            repository.save(new Pago(1L, 20.0, "TARJETA_CREDITO", LocalDate.now().minusDays(2), "COMPLETADO"));
            repository.save(new Pago(2L, 10.0, "PAYPAL", LocalDate.now().minusDays(1), "COMPLETADO"));
            repository.save(new Pago(3L, 15.0, "TRANSFERENCIA", LocalDate.now(), "PENDIENTE"));
        };
    }
}
