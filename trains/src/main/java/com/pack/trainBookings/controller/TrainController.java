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

@RestController
@RequestMapping("/trains")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainController {
    @Autowired
    private TrainService trainService;
//    get all trains(no use)
    @GetMapping("/search/alltrains")
    public ResponseEntity<List<TrainResponse>> getdetails(){
        List<TrainResponse> trainResponse=trainService.getAllTrains();

        return ResponseEntity.status(HttpStatus.CREATED).body(trainResponse);
    }


//    get trains by src/des and dep date
//    localhost:8080/trains?src=delhi&des=mumbai&date=2024-10-11
        @GetMapping("/search")
        public ResponseEntity<List<TrainResponse>> getDetails(@RequestParam String src, @RequestParam String des, @RequestParam String date){
            LocalDate localDate= LocalDate.parse(date);
            List<TrainResponse> trainResponse =trainService.getTrainsUsingSrcDes(src,des,localDate);
            if(trainResponse.size()==0) return null;
           return ResponseEntity.status(HttpStatus.CREATED).body(trainResponse);
        }




//    get trains by name
    @GetMapping("/search/trainbyname")
    public ResponseEntity<List<TrainResponse>> getbyName(@RequestParam String name){
        List<TrainResponse> trainResponses = trainService.getTrainByName(name);
        if(trainResponses.size()==0) return null;
        return ResponseEntity.status(HttpStatus.CREATED).body(trainResponses);

    }

//    get trains by train number
    @GetMapping("/search/trainbynumber")
    public ResponseEntity<List<TrainResponse>> getbyNumber(@RequestParam String number){
        List<TrainResponse> trainResponses = trainService.getTrainByNumber(number);
        if(trainResponses.size()==0) return null;
        return ResponseEntity.status(HttpStatus.CREATED).body(trainResponses);
    }
//    get by train_id
@GetMapping("/search/trainbyid/{train_id}")
public ResponseEntity<TrainResponse> getbyNumber(@PathVariable int train_id){
    TrainResponse trainResponse = trainService.getTrainById(train_id);
    return ResponseEntity.status(HttpStatus.CREATED).body(trainResponse==null?null:trainResponse);
}



}
