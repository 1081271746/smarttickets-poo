package com.smarttickets.repository;

import com.smarttickets.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}