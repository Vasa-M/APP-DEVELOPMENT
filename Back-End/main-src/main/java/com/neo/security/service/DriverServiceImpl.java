
package com.neo.security.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neo.security.entity.Available;
import com.neo.security.entity.Driver;
import com.neo.security.entity.LoginDriver;
import com.neo.security.entity.ResponseMessage;
import com.neo.security.repository.DriverRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
 public class DriverServiceImpl implements DriverService{

	
	@Autowired
	private DriverRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Override
	public String addDriver(Driver driver) {
		Driver obj = repo.findByEmail(driver.getEmail());
		
		System.out.println(obj);
		
		if(Objects.isNull(obj)) {
			
			String encodedPassword = passwordEncoder.encode(driver.getPassword());
			
			Driver driver1 = Driver.builder()
					.username(driver.getUsername())
					.password(encodedPassword)
					.email(driver.getEmail())
					.available(driver.getAvailable())
					.totalRide(driver.getTotalRide())
					.totalEarnings(driver.getTotalEarnings())
					.place(driver.getPlace())
					.rating(driver.getRating())
					.phoneNumber(driver.getPhoneNumber())
					.build();
			
			return repo.save(driver1) != null ? driver.toString() : "Error";

		}
		else {
			return obj.toString();			
		}
	}

	@Override
	public List<Driver> showDriver() {
		return repo.findAll();

	}

	@Override
	public ResponseMessage sendResponseForLogin(LoginDriver user) {
		Driver obj = repo.findByEmail(user.getEmail());
		System.out.println(user.getEmail());
		
		if(obj != null) {
			String password = user.getPassword();
			String encodedPassword = obj.getPassword();
			
			Boolean isPasswordRight = passwordEncoder.matches(password, encodedPassword);
			
			if(isPasswordRight) {
				Optional<Driver> user2 = repo.findOneByEmailAndPassword(user.getEmail(), encodedPassword);
				
				if(!user2.isEmpty()) {
					return ResponseMessage.builder().message("Login Success !").status(isPasswordRight).build();
				}
				else {
					return ResponseMessage.builder().message("Login failed :) ").status(isPasswordRight).build();
				}
			}
			else {
				return ResponseMessage.builder().message("Password wrong. please try again!").status(isPasswordRight).build();
			}
		}
		else {
			return ResponseMessage.builder().message("Email doesn't exist !").status(false).build();
		}
		

	}

	@Override
	public Driver getDriverByEmail(String email) {
		Driver driver = repo.findByEmail(email);
		System.out.println(driver.toString());
		return repo.findByEmail(email);
	}

	@Override
	public String update(Available available) {
		
		Driver driver = repo.findByEmail(available.getEmail());
		
		Driver driver1 = Driver.builder()
				.username(driver.getUsername())
				.password(driver.getPassword())
				.email(driver .getEmail())
				.available(available.getAvailable())
				.totalRide(driver.getTotalRide())
				.totalEarnings(driver.getTotalEarnings())
				.place(available.getPlace())
				.rating(driver.getRating())
				.phoneNumber(driver.getPhoneNumber())
				.build();
//		repo.deleteByEmail(available.getEmail());
		repo.saveAndFlush(driver1);
		return "saved";
		
		
	}

	@Override
	public ResponseMessage getDriverByPlace(String place) {
		
		
		Driver obj = repo.findOneByPlace(place);
		
		if (obj != null) {
			return ResponseMessage.builder().message("success").status(true).driver(obj).build();
		}
		else {
			return ResponseMessage.builder().message("oops").status(true).driver(obj).build();
		}
	}

}