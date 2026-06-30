package com.gamesrentall.analitica.repository;

import com.gamesrentall.analitica.entity.EventoAnalitica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoAnaliticaRepository extends JpaRepository<EventoAnalitica, Long> {
}
