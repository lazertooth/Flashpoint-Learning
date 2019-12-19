package com.FlashPoint.Server.Card;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Student {

	@Id @GeneratedValue
	private long studentID;
	private long userID;
	private String studentName;
	private String gradeLevel;
	private long testCompleted;
	
	public Student(long studentID, long userID, String studentName, String gradeLevel, long testCompleted) {
		super();
		this.studentID = studentID;
		this.userID = userID;
		this.studentName = studentName;
		this.gradeLevel = gradeLevel;
		this.testCompleted = testCompleted;
	}

	public Student() {
		super();
	}

	public long getUserID() {
		return userID;
	}

	public void setUserID(long userID) {
		this.userID = userID;
	}

	public String getGradeLevel() {
		return gradeLevel;
	}

	public void setGradeLevel(String gradeLevel) {
		this.gradeLevel = gradeLevel;
	}

	public long getTestCompleted() {
		return testCompleted;
	}

	public void setTestCompleted(long testCompleted) {
		this.testCompleted = testCompleted;
	}

	public long getStudentID() {
		return studentID;
	}

	public String getStudentName() {
		return studentName;
	}
	
	
}
