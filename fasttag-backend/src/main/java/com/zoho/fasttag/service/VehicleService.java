package com.zoho.fasttag.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.zoho.fasttag.model.Vehicle;

@Service
public interface VehicleService {

    Optional<Vehicle> checkVehicleRegistration(String vehicleNumber);

    String registerVehicle(String vehicleType, String ownerName, String vehicleNumber);

    void updateLastPaidTime(String vehicleNumber);

}
