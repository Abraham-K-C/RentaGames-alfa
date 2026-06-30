package com.gamesrentall.renta.repository;

import com.gamesrentall.renta.entity.Renta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentaRepository extends JpaRepository<Renta, Long> {
}
