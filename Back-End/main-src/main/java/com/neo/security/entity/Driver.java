package com.neo.security.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Entity
public class Driver {
	

	
	
	@Id
	@Column(nullable = false,length = 64)
	
	private String email;
	
	private String password;
	
	private String username;
	
	private long phoneNumber;
	
	private int totalRide = 0;
	
	private int totalEarnings = 0;
	
	private String available = "NO";
	
	private String place = "NULL";
	
	private int rating = 0;
	
}
