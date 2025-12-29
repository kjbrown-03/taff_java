package com.hotelmanagement.mapper;

import com.hotelmanagement.dto.MessageDto;
import com.hotelmanagement.dto.TimesheetDto;
import com.hotelmanagement.model.Message;
import com.hotelmanagement.model.Timesheet;
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
    
    public MessageDto toMessageDto(Message message) {
        MessageDto dto = new MessageDto();
        dto.setId(message.getId());
        dto.setSenderId(message.getSender().getId());
        dto.setSenderName(message.getSender().getUsername());
        dto.setReceiverId(message.getReceiver().getId());
        dto.setReceiverName(message.getReceiver().getUsername());
        dto.setContent(message.getContent());
        dto.setIsRead(message.getIsRead());
        dto.setTimestamp(message.getTimestamp());
        return dto;
    }
    
    public TimesheetDto toTimesheetDto(Timesheet timesheet) {
        TimesheetDto dto = new TimesheetDto();
        dto.setId(timesheet.getId());
        dto.setStaffId(timesheet.getStaff().getId());
        dto.setStaffName(timesheet.getStaff().getUser().getUsername());
        dto.setDate(timesheet.getDate());
        dto.setCheckInTime(timesheet.getCheckInTime());
        dto.setCheckOutTime(timesheet.getCheckOutTime());
        dto.setHoursWorked(timesheet.getHoursWorked());
        dto.setCreatedAt(timesheet.getCreatedAt());
        dto.setUpdatedAt(timesheet.getUpdatedAt());
        return dto;
    }
}