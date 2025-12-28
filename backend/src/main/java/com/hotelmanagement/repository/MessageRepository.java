package com.hotelmanagement.repository;

import com.hotelmanagement.model.Message;
import com.hotelmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndReceiverIdOrderByTimestampDesc(Long senderId, Long receiverId);
    
    List<Message> findByReceiverIdAndSenderIdOrderByTimestampDesc(Long receiverId, Long senderId);
    
    @Query("SELECT m FROM Message m WHERE (m.sender.id = :userId OR m.receiver.id = :userId) ORDER BY m.timestamp DESC")
    List<Message> findMessagesByUserId(@Param("userId") Long userId);
    
    List<Message> findByReceiverIdAndIsReadFalse(Long receiverId);
    
    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver.id = :userId AND m.isRead = false")
    Long countUnreadMessagesByUserId(@Param("userId") Long userId);
}