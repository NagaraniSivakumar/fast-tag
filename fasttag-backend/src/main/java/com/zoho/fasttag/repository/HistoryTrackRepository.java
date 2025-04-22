package com.zoho.fasttag.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.zoho.fasttag.model.HistoryTrack;

public interface HistoryTrackRepository extends JpaRepository<HistoryTrack, Long> {
    List<HistoryTrack> findByVehicleNumber(String vehicleNumber);
}
