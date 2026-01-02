package com.hotelmanagement.service;

import com.hotelmanagement.dto.MessageDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import com.hotelmanagement.model.User;

public interface MessageService {
    MessageDto sendMessage(Long senderId, Long receiverId, String content);
    List<MessageDto> getMessagesBetweenUsers(Long userId1, Long userId2);
    List<MessageDto> getMessagesByUserId(Long userId);
    List<MessageDto> getUnreadMessages(Long userId);
    Long getUnreadMessageCount(Long userId);
    void markAsRead(Long messageId);
    void deleteMessage(Long messageId);
    User getUserByUsername(String username);
}