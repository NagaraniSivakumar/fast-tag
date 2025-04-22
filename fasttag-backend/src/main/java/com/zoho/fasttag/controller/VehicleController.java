package com.zoho.fasttag.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zoho.fasttag.dto.RegisterVehicleRequest;
import com.zoho.fasttag.model.Vehicle;
import com.zoho.fasttag.service.VehicleService;

@RestController
@RequestMapping("/api/vehicle")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend hosted on Vite dev server
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    /**
     * API to check if a vehicle is registered. If registered, returns vehicle
     * type and last paid time. If not, returns registered = false.
     */
    @GetMapping("/check")
    public Map<String, Object> checkVehicle(@RequestParam String vehicleNumber) {
        Optional<Vehicle> optionalVehicle = vehicleService.checkVehicleRegistration(vehicleNumber);
        Map<String, Object> response = new HashMap<>();

        if (optionalVehicle.isPresent()) {
            Vehicle vehicle = optionalVehicle.get();
            response.put("registered", true);
            response.put("last_paid_time", vehicle.getLastPaidTime());
            response.put("vehicle_type", vehicle.getVehicleType());
        } else {
            response.put("registered", false);
        }

        return response;
    }

    /**
     * API to register a new vehicle with vehicle type, owner name, and number.
     * Returns a success message on completion.
     */
    @PostMapping("/register")
    public Map<String, String> registerVehicle(@RequestBody RegisterVehicleRequest request) {
        String message = vehicleService.registerVehicle(
                request.getVehicleType(),
                request.getOwnerName(),
                request.getVehicleNumber()
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    /**
     * API to update the last paid time of a vehicle to the current time. Used
     * after a successful toll payment.
     */
    @PostMapping("/updatePaidTime")
    public ResponseEntity<String> updatePaidTime(@RequestParam String vehicleNumber) {
        vehicleService.updateLastPaidTime(vehicleNumber);
        return ResponseEntity.ok("Last paid time updated successfully");
    }
}