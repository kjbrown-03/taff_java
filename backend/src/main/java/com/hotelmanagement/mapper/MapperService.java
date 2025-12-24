package com.hotelmanagement.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapperService {

    @Autowired
    private ModelMapper modelMapper;

    public <T, R> R map(T source, Class<R> targetClass) {
        if (source == null) {
            return null;
        }
        return modelMapper.map(source, targetClass);
    }

    public <T, R> void map(T source, R destination) {
        if (source != null && destination != null) {
            modelMapper.map(source, destination);
        }
    }
}