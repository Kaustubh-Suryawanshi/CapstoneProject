package com.pack.trainBookings.controller;

import com.pack.trainBookings.entity.Trains;
import com.pack.trainBookings.response.TrainResponse;
import com.pack.trainBookings.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminOpsController {
    @Autowired
    TrainService trainService;
    //    add new train(admin only)
    @PostMapping("/add")
    public ResponseEntity<Trains> addTrain(@RequestBody Trains train){
        Trains trains= trainService.addTrainDetails(train);
        return ResponseEntity.status(HttpStatus.CREATED).body(trains);
    }
    //    delete train(admin only)
//    @PostMapping("/trains/delete")
    @PostMapping("/delete/{id}")
    public ResponseEntity<List<TrainResponse>> deleteTrain(@PathVariable int id){
        List<TrainResponse> res= trainService.deleteTrain(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(res!=null?res:null);
    }
    //    update train details(admin only)
    @PatchMapping("/update/{id}")
    public ResponseEntity<Optional<Trains>> updateTrain(@PathVariable int id, @RequestBody Trains train){
        Optional<Trains> res= trainService.updateTrains(id,train);
        return ResponseEntity.status(HttpStatus.CREATED).body(res!=null?res:null);
    }

    @PostMapping("/cancel/{tid}")
    public ResponseEntity<String> canceltrain(@PathVariable int tid){
        try{
            trainService.cancelTrain(tid);
            return ResponseEntity.status(HttpStatus.OK).body("cancelled");
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
