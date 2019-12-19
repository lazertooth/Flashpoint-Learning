package com.FlashPoint.Server.Card;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class TestResults {

	@Id @GeneratedValue
	private long testID;
	private String studentID;
	private String gradeLevel;
	private String testNum;
	private String[] correctWords;
	private String[] incorrectWords;
	private boolean success;
	
	public TestResults(long testID, String studentID, String gradeLevel, String testNum, String[] correctWords,
			String[] incorrectWords, boolean success) {
		super();
		this.testID = testID;
		this.studentID = studentID;
		this.gradeLevel = gradeLevel;
		this.testNum = testNum;
		this.correctWords = correctWords;
		this.incorrectWords = incorrectWords;
		this.success = success;
	}

	public TestResults() {
		super();
	}

	public long getTestID() {
		return testID;
	}

	public String getStudentID() {
		return studentID;
	}

	public String getGradeLevel() {
		return gradeLevel;
	}

	public String getTestNum() {
		return testNum;
	}

	public String[] getCorrectWords() {
		return correctWords;
	}

	public String[] getIncorrectWords() {
		return incorrectWords;
	}

	public boolean isSuccess() {
		return success;
	}
}
