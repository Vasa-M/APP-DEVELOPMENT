package com.neo.security.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.neo.security.entity.Driver;
import com.neo.security.entity.User;

public interface DriverRepository extends JpaRepository<Driver, Integer>{


	Optional<Driver> findOneByEmailAndPassword(String email, String password);
	
	Driver findByEmail(String email);
	
	
	@Query("SELECT d FROM Driver d WHERE d.available = 'YES' AND d.place = ?1 AND d.rating = (SELECT MAX(p2.rating) FROM Driver p2 WHERE p2.available = 'YES' AND p2.place = ?1)")
    Driver findOneByPlace(String place);
}
