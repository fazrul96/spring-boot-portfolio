package com.example.demo.data.management.repository;

import com.example.demo.data.management.entity.LogisticInventory;
import com.example.demo.data.management.entity.UserDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MosqueInventoryRepository extends JpaRepository<LogisticInventory, String> {
    LogisticInventory findByItemName(String itemName);

    LogisticInventory findByStatus(String status);
}
