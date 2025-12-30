package com.hotelmanagement.repository;

import com.hotelmanagement.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@SuppressWarnings("unused")
public interface MessageRepository extends JpaRepository<Message, Long> {
    // Use property traversal to access nested id fields
    List<Message> findBySender_IdAndReceiver_IdOrderByTimestampDesc(Long senderId, Long receiverId);

    List<Message> findByReceiver_IdAndSender_IdOrderByTimestampDesc(Long receiverId, Long senderId);

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :userId OR m.receiver.id = :userId) ORDER BY m.timestamp DESC")
    List<Message> findMessagesByUserId(@Param("userId") Long userId);
    
    List<Message> findByReceiver_IdAndIsReadFalse(Long receiverId);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver.id = :userId AND m.isRead = false")
    Long countUnreadMessagesByUserId(@Param("userId") Long userId);
}