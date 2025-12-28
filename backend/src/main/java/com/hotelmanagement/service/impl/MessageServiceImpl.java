package com.hotelmanagement.service.impl;

import com.hotelmanagement.dto.MessageDto;
import com.hotelmanagement.mapper.MapperService;
import com.hotelmanagement.model.Message;
import com.hotelmanagement.model.User;
import com.hotelmanagement.repository.MessageRepository;
import com.hotelmanagement.repository.UserRepository;
import com.hotelmanagement.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final MapperService mapperService;

    @Override
    public MessageDto sendMessage(Long senderId, Long receiverId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setIsRead(false);

        Message savedMessage = messageRepository.save(message);
        return mapperService.toMessageDto(savedMessage);
    }

    @Override
    public List<MessageDto> getMessagesBetweenUsers(Long userId1, Long userId2) {
        List<Message> messages1 = messageRepository.findBySenderIdAndReceiverIdOrderByTimestampDesc(userId1, userId2);
        List<Message> messages2 = messageRepository.findByReceiverIdAndSenderIdOrderByTimestampDesc(userId2, userId1);

        List<Message> allMessages = new java.util.ArrayList<>();
        allMessages.addAll(messages1);
        allMessages.addAll(messages2);

        return allMessages.stream()
                .sorted((m1, m2) -> m2.getTimestamp().compareTo(m1.getTimestamp()))
                .map(mapperService::toMessageDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDto> getMessagesByUserId(Long userId) {
        List<Message> messages = messageRepository.findMessagesByUserId(userId);
        return messages.stream()
                .map(mapperService::toMessageDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDto> getUnreadMessages(Long userId) {
        List<Message> messages = messageRepository.findByReceiverIdAndIsReadFalse(userId);
        return messages.stream()
                .map(mapperService::toMessageDto)
                .collect(Collectors.toList());
    }

    @Override
    public Long getUnreadMessageCount(Long userId) {
        return messageRepository.countUnreadMessagesByUserId(userId);
    }

    @Override
    public void markAsRead(Long messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        messageRepository.save(message);
    }

    @Override
    public void deleteMessage(Long messageId) {
        if (!messageRepository.existsById(messageId)) {
            throw new RuntimeException("Message not found");
        }
        messageRepository.deleteById(messageId);
    }
}