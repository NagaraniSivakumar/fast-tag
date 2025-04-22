package com.zoho.fasttag.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zoho.fasttag.model.Vehicle;
import com.zoho.fasttag.repository.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public Optional<Vehicle> checkVehicleRegistration(String vehicleNumber) {
        return vehicleRepository.findByVehicleNumber(vehicleNumber);
    }

    @Override
    public String registerVehicle(String vehicleType, String ownerName, String vehicleNumber) {
        // Check if vehicle already exists
        Optional<Vehicle> existing = vehicleRepository.findByVehicleNumber(vehicleNumber);
        if (existing.isPresent()) {
            return "Vehicle is already registered.";
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(vehicleNumber);
        vehicle.setVehicleType(vehicleType);
        vehicle.setOwnerName(ownerName);
        vehicle.setOwnerId(generateRandomOwnerId()); // placeholder
        vehicle.setLastPaidTime(LocalDateTime.now());

        vehicleRepository.save(vehicle);
        return "Vehicle registered successfully.";
    }

    // For now, use a random owner ID generator
    private Long generateRandomOwnerId() {
        return (long) (Math.random() * 100000);
    }

    @Override
    public void updateLastPaidTime(String vehicleNumber) {
        Vehicle vehicle = vehicleRepository.findByVehicleNumber(vehicleNumber)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setLastPaidTime(LocalDateTime.now());
        vehicleRepository.save(vehicle);
    }

}
