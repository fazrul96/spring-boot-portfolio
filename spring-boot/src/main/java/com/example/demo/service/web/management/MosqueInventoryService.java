package com.example.demo.service.web.management;

import com.example.demo.data.management.entity.LogisticInventory;
import com.example.demo.data.management.repository.MosqueInventoryRepository;
import com.example.demo.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.demo.constants.GeneralConstant.EMPTY_STRING;
import static com.example.demo.exception.errorType.AppErrorType.RESOURCE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Slf4j
public class MosqueInventoryService {
    private final MosqueInventoryRepository mosqueInventoryRepository;

    public List<LogisticInventory> getAllLogisticInventories() {
        log.debug("Fetching all logistic inventories");
        List<LogisticInventory> logisticInventories = mosqueInventoryRepository.findAll();
        log.debug("Fetched {} logistic inventories", logisticInventories.size());
        return logisticInventories;
    }

    @Transactional
    public LogisticInventory createLogisticInventory(LogisticInventory logisticInventory) {
        log.info("Creating logistic inventory: {}", logisticInventory);
        LogisticInventory savedLogisticInventory = mosqueInventoryRepository.save(logisticInventory);
        log.info("Logistic inventory created: {}", savedLogisticInventory);
        return savedLogisticInventory;
    }

    @Transactional
    public void deleteLogisticInventory(Long id) throws BaseException {
        log.debug("Deleting logistic inventory with ID: {}", id);
        LogisticInventory logisticInventoryToDelete = mosqueInventoryRepository.findById(id)
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "Logistic inventory not found for ID: " + id));
        mosqueInventoryRepository.delete(logisticInventoryToDelete);
        log.info("Logistic inventory deleted: {}", logisticInventoryToDelete);
    }

    @Transactional
    public LogisticInventory updateLogisticInventoryPartially(Long id, LogisticInventory partialUpdate) throws BaseException {
        log.debug("Partially updating logistic inventory with ID: {}", id);
        LogisticInventory existingLogistic = mosqueInventoryRepository.findById(id)
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "Logistic inventory not found for ID: " + id));

        updateLogisticFields(existingLogistic, partialUpdate);
        LogisticInventory updatedLogistic = mosqueInventoryRepository.save(existingLogistic);
        log.info("Logistic inventory partially updated: {}", updatedLogistic);
        return updatedLogistic;
    }

    @Transactional
    public LogisticInventory updateLogisticInventory(Long id, LogisticInventory updatedLogistic) throws BaseException {
        log.debug("Fully updating logistic inventory with ID: {}", id);
        LogisticInventory existingLogistic = mosqueInventoryRepository.findById(id)
                .orElseThrow(() -> new BaseException(RESOURCE_NOT_FOUND, "Logistic inventory not found for ID: " + id));

        existingLogistic.setItemName(updatedLogistic.getItemName());
        existingLogistic.setDescription(updatedLogistic.getDescription());
        existingLogistic.setQuantity(updatedLogistic.getQuantity());
        existingLogistic.setImageLink(EMPTY_STRING);

        LogisticInventory savedLogistic = mosqueInventoryRepository.save(existingLogistic);
        log.info("Logistic inventory fully updated: {}", savedLogistic);
        return savedLogistic;
    }

    private void updateLogisticFields(LogisticInventory existingLogistic, LogisticInventory partialLogistic) {
        if (partialLogistic.getItemName() != null) {
            existingLogistic.setItemName(partialLogistic.getItemName());
        }
        if (partialLogistic.getDescription() != null) {
            existingLogistic.setDescription(partialLogistic.getDescription());
        }
        if (partialLogistic.getQuantity() != null) {
            existingLogistic.setQuantity(partialLogistic.getQuantity());
        }
        if (partialLogistic.getImageLink() != null) {
            existingLogistic.setImageLink(partialLogistic.getImageLink());
        }
    }
}
