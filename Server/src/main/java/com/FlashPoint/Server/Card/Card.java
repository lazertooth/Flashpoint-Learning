package com.FlashPoint.Server.Card;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Card {

	@Id @GeneratedValue
	private long id;
	private String gradeLevel;
	private String testNum;
	private String questionNum;
	private String correctWord;
	private String[] fillerWords;
	
	// Constructor
	public Card(long id, String gradeLevel, String testNum, String questionNum, String correctWord) {
		super();
		this.id = id;
		this.gradeLevel = gradeLevel;
		this.testNum = testNum;
		this.questionNum = questionNum;
		this.correctWord = correctWord;
		this.fillerWords = fillerWords.clone();
	}
	
	// Default Constructor
	public Card() { super(); }
	
	public long getId() {
		return id;
	}
	
	public String getGradeLevel() {
		return gradeLevel;
	}
	
	public String getTestNum() {
		return testNum;
	}
	
	public String getQuestionNum() {
		return questionNum;
	}

	public String getCorrectWord() {
		return correctWord;
	}
	
	public String[] getFillerWords() {
		return fillerWords;
	}
}
