package com.FlashPoint.Server.Card;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

	@Id @GeneratedValue
	private long userID;
	private String userName;
	private String userEmail;
	private String userPassword;
	
	public User(long userID, String userName, String userEmail, String userPassword) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
	}

	public User() {
		super();
	}

	public long getUserID() {
		return userID;
	}

	public String getUserName() {
		return userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}	
}
