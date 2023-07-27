package com.neo.security.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neo.security.entity.Available;
import com.neo.security.entity.Driver;
import com.neo.security.entity.LoginDriver;
import com.neo.security.entity.ResponseMessage;
import com.neo.security.entity.User;
import com.neo.security.request.AuthRequest;
import com.neo.security.response.AuthResponse;
import com.neo.security.service.DriverServiceImpl;
import com.neo.security.service.UserServiceImpl;
import com.neo.security.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	@Autowired
	private UserServiceImpl service;
	
	@Autowired
	private DriverServiceImpl service1;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request){
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			User user = (User) authentication.getPrincipal();
			
//			String accessToken = "JWT token !!!!";
			String accessToken = jwtUtil.generateToken(user);
			AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
			
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}catch (BadCredentialsException e) {
			return ResponseEntity.badRequest().body("Login failed");
		}
	}
	
	
	@PostMapping("/register")
	public Boolean addUser(@RequestBody User user) {
		return service.addUser(user);
	}
	
	@PostMapping("/registerDriver")
	public String addDriver(@RequestBody Driver driver) {
		return service1.addDriver(driver);
	}
	
	@GetMapping("/getDriver")
	public List<Driver> getDriver(){
		return service1.showDriver();
	}

	@GetMapping("/getDriverByEmail/{email}")
	public Driver getDriverByEmail(@PathVariable String email){
		return service1.getDriverByEmail(email);
	}
	
	@PostMapping("/loginDriver")
	public ResponseEntity<?> login(@RequestBody LoginDriver driver) {
		ResponseMessage response = service1.sendResponseForLogin(driver);
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/updateDriver")
	public String updateDriver(@RequestBody Available available) {
		return service1.update(available);
	}
	
	
	@GetMapping("/place/{place}")    
	public ResponseEntity<?> getDriverByPlace (@PathVariable String place) {
		ResponseMessage response = service1.getDriverByPlace(place);
		return ResponseEntity.ok(response);
	}
	
//	@PostMapping("/registerDriver")
//	public User get(@RequestBody Driver driver) {
//		return service1.addDriver(driver);
//	}
	
}