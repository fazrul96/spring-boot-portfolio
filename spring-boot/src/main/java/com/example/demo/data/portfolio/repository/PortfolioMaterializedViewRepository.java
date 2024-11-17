package com.example.demo.data.portfolio.repository;

import com.example.demo.data.portfolio.entity.PortfolioView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.example.demo.constants.MaterializedViewsConstant.*;

@Repository
public interface PortfolioMaterializedViewRepository extends JpaRepository<PortfolioView, String> {

    @Query(value = PORTFOLIO_VIEW, nativeQuery = true)
    List<PortfolioView> findByUpdatedDateBetween(@Param("startDateTime") String startDateTime,
                                                 @Param("endDateTime") String endDateTime);
}
