package com.example.demo.data.management.repository;

import com.example.demo.data.management.entity.UserDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MosqueUserRepository extends JpaRepository<UserDonation, Long> {
    @Query("SELECT userDonation FROM UserDonation userDonation ORDER BY userDonation.id DESC")
    List<UserDonation> findAllOrderedById();

    UserDonation findByNric(String nric);
}
