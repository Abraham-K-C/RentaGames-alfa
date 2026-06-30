package com.gamesrentall.soporte.repository;

import com.gamesrentall.soporte.entity.TicketSoporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketSoporteRepository extends JpaRepository<TicketSoporte, Long> {
}
