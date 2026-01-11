package com.hotelmanagement.config;

import com.hotelmanagement.dto.RoomDto;
import com.hotelmanagement.model.Room;
import com.hotelmanagement.model.RoomType;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true);
        
        // Custom mapping for Room to RoomDto
        modelMapper.createTypeMap(Room.class, RoomDto.class)
            .addMappings(new PropertyMap<Room, RoomDto>() {
                @Override
                protected void configure() {
                    map().setRoomTypeId(source.getRoomType().getId());
                    map().setRoomTypeName(source.getRoomType().getName());
                }
            });
        
        // Custom mapping for RoomDto to Room
        modelMapper.createTypeMap(RoomDto.class, Room.class)
            .addMappings(new PropertyMap<RoomDto, Room>() {
                @Override
                protected void configure() {
                    // We'll handle roomType conversion in the service layer
                    // since we need to fetch the RoomType entity by ID
                }
            });
        
        return modelMapper;
    }
}
