package com.zoho.fasttag.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zoho.fasttag.dto.SaveHistoryRequest;
import com.zoho.fasttag.model.HistoryTrack;
import com.zoho.fasttag.repository.HistoryTrackRepository;

@Service
public class HistoryService {

    @Autowired
    private HistoryTrackRepository historyRepo;

    public String saveHistory(SaveHistoryRequest request) {
        HistoryTrack history = new HistoryTrack();
        history.setVehicleNumber(request.getVehicleNumber());
        history.setVehicleType(request.getVehicleType());
        history.setPaidTime(LocalDateTime.now());
        history.setAmountPaid(request.getAmountPaid());

        historyRepo.save(history);
        return "History saved successfully.";
    }

    public List<HistoryTrack> getHistoryByVehicleNumber(String vehicleNumber) {
        return historyRepo.findByVehicleNumber(vehicleNumber);
    }
}
