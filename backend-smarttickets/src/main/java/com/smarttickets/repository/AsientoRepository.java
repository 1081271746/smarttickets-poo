package com.smarttickets.repository;

import com.smarttickets.model.Asiento;
import com.smarttickets.model.EstadoAsiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AsientoRepository extends JpaRepository<Asiento, Long> {

    List<Asiento> findByEventoId(Long eventoId);

    List<Asiento> findByEventoIdAndEstado(Long eventoId, EstadoAsiento estado);
}