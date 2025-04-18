package com.zoho.fasttag.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zoho.fasttag.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
}
