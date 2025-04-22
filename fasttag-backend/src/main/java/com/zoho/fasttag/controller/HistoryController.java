package com.zoho.fasttag.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.zoho.fasttag.dto.SaveHistoryRequest;
import com.zoho.fasttag.model.HistoryTrack;
import com.zoho.fasttag.service.HistoryService;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:5173")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    // API to store values
    @PostMapping("/save")
    public String saveHistory(@RequestBody SaveHistoryRequest request) {
        return historyService.saveHistory(request);
    }

    // API to fetch all rows by vehicle number
    @GetMapping("/byVehicle")
    public List<HistoryTrack> getHistoryByVehicle(@RequestParam String vehicleNumber) {
        return historyService.getHistoryByVehicleNumber(vehicleNumber);
    }
}