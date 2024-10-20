package com.pack.trainBookings.service;

import com.pack.trainBookings.entity.Trains;
import com.pack.trainBookings.repository.TrainRepo;
import com.pack.trainBookings.response.TrainResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class TrainService {
    @Autowired
    private TrainRepo trainRepo;

    @Autowired
    ModelMapper modelMapper;
    public List<TrainResponse> getAllTrains(){
        List<Trains> response=trainRepo.findAll();
        List<TrainResponse> trainResponseList =new ArrayList<>();
        for(Trains t:response){
            TrainResponse trainResponse =modelMapper.map(t, TrainResponse.class);
            trainResponseList.add(trainResponse);
        }
        return trainResponseList;
    }


    public List<TrainResponse> getTrainsUsingSrcDes(String src, String des, LocalDate dep_date){
        List<Trains> response=trainRepo.getTrainsWithSrcDesDateAdmin( src,  des,  dep_date);
        List<TrainResponse> trainResponseList =new ArrayList<>();
        for(Trains t:response){
            TrainResponse trainResponse =modelMapper.map(t, TrainResponse.class);
            trainResponseList.add(trainResponse);
        }
        return trainResponseList;
    }

    public List<TrainResponse> getTrainByName(String name) {
        List<Trains> response=trainRepo.getTrainsWithName(name);
        List<TrainResponse> trainResponseList =new ArrayList<>();
        for(Trains t:response){
            TrainResponse trainResponse =modelMapper.map(t, TrainResponse.class);
            trainResponseList.add(trainResponse);
        }
        return trainResponseList;
    }

    public List<TrainResponse> getTrainByNumber(String number) {
        List<Trains> response=trainRepo.getTrainsWithNumber(number);
        List<TrainResponse> trainResponseList =new ArrayList<>();
        for(Trains t:response){
            TrainResponse trainResponse =modelMapper.map(t, TrainResponse.class);
            trainResponseList.add(trainResponse);
        }
        return trainResponseList;
    }

    public Trains addTrainDetails(Trains train) {
        if(!trainRepo.getTrainsWithNumber(train.getTrain_no()).isEmpty() || !trainRepo.getTrainsWithName(train.getTrain_name()).isEmpty()){
            return null;
          }
        return trainRepo.save(train);
    }


    public Optional<Trains> updateTrains(int id, Trains traindetailsToUpdate) {
        Optional<Trains> updateTrain=trainRepo.findById(id);
        if(updateTrain.isPresent()) {
            Trains train=updateTrain.get();
            if(traindetailsToUpdate.getTrain_no() !=null ) {
                train.setTrain_no(traindetailsToUpdate.getTrain_no());
            }
            if(traindetailsToUpdate.getTrain_name() !=null ) {
                train.setTrain_name(traindetailsToUpdate.getTrain_name());
            }
            if(traindetailsToUpdate.getFrom_source() !=null) train.setFrom_source(traindetailsToUpdate.getFrom_source());
            if(traindetailsToUpdate.getTo_destination() !=null) train.setTo_destination(traindetailsToUpdate.getTo_destination());
            if(traindetailsToUpdate.getDeparture_date() !=null) train.setDeparture_date(traindetailsToUpdate.getDeparture_date());
            if(traindetailsToUpdate.getArrival_date() !=null) train.setArrival_date(traindetailsToUpdate.getArrival_date());
            if(traindetailsToUpdate.getDeparture_time() !=null) train.setDeparture_time(traindetailsToUpdate.getDeparture_time());
            if(traindetailsToUpdate.getTotal_seats() !=0) train.setTotal_seats(traindetailsToUpdate.getTotal_seats());
            if(traindetailsToUpdate.getAvailable_seats() !=0) train.setAvailable_seats(traindetailsToUpdate.getAvailable_seats());
            if(traindetailsToUpdate.getAmount_per_seat() !=0) train.setAmount_per_seat(traindetailsToUpdate.getAmount_per_seat());

            return Optional.of(trainRepo.save(train));
        }
        return null;
    }

    public List<TrainResponse> deleteTrain(int id) {
        List<TrainResponse> trainResponseList=new ArrayList<>();
        if(trainRepo.findById(id).isPresent()){
            trainRepo.deleteById(id);
            List<Trains>trains= trainRepo.findAll();
            for(Trains t:trains){
                trainResponseList.add(modelMapper.map(t, TrainResponse.class));
            }
            return trainResponseList;
        }
        return null;
    }

    public TrainResponse getTrainById(int trainId) {
        Optional<Trains> optional=trainRepo.findById(trainId);
        if(optional.isPresent()){
            Trains train=optional.get();
            return modelMapper.map(train, TrainResponse.class);
        }
        return null;

    }

    public void  cancelTrain(int tid) {
        Trains train=trainRepo.findById(tid) .orElseThrow(() -> new RuntimeException("Train not found with id: " + tid));;
        train.setTrain_status("cancelled");
        trainRepo.save(train);
    }
}
