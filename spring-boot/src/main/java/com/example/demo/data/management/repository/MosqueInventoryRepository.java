package com.example.demo.data.management.repository;

import com.example.demo.data.management.entity.LogisticInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MosqueInventoryRepository extends JpaRepository<LogisticInventory, Long> {
    LogisticInventory findByItemName(String itemName);

    LogisticInventory findByStatus(String status);
}
