package com.neo.security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.neo.security.entity.Available;
import com.neo.security.entity.Driver;
import com.neo.security.entity.LoginDriver;
import com.neo.security.entity.ResponseMessage;
 

 interface DriverService {
	
String addDriver(Driver driver);
	
	List<Driver> showDriver();
	
	ResponseMessage sendResponseForLogin(LoginDriver user);
	
	Driver getDriverByEmail(String email);
	
	String update(Available available);
	
	ResponseMessage getDriverByPlace(String place);
}