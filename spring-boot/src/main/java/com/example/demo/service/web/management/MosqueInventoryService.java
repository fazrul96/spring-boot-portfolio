package com.example.demo.service.web.management;

import com.example.demo.data.management.entity.LogisticInventory;
import com.example.demo.data.management.repository.MosqueInventoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.example.demo.constants.GeneralConstant.EMPTY_STRING;

@Slf4j
@Service
public class MosqueInventoryService {
    private final MosqueInventoryRepository mosqueInventoryRepository;

    @Autowired
    public MosqueInventoryService(MosqueInventoryRepository mosqueInventoryRepository) {
        this.mosqueInventoryRepository = mosqueInventoryRepository;
    }

    public List<LogisticInventory> getAllLogisticInventories() {
        return mosqueInventoryRepository.findAll();
    }

    public Optional<LogisticInventory> getLogisticInventoryById(String id) {
        return mosqueInventoryRepository.findById(id);
    }

    @Transactional
    public void saveLogisticInventory(LogisticInventory logisticInventory) {
        LogisticInventory inventory = new LogisticInventory();
        inventory.setItemName(logisticInventory.getItemName());
        inventory.setDescription(logisticInventory.getDescription());
        inventory.setQuantity(logisticInventory.getQuantity());
        inventory.setImageLink(EMPTY_STRING);
        mosqueInventoryRepository.save(inventory);
        log.info("Logistic inventory have been saved: {}", inventory);
    }

//    @Transactional
//    public void deleteLogisticInventory(String id) {
//        Optional<LogisticInventory> logisticInventory = mosqueInventoryRepository.findById(id);
//        mosqueInventoryRepository.delete(logisticInventory);
//    }
}
