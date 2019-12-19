package com.FlashPoint.Server.Card;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

@Service
public class CardService {

	@Autowired
	private CardRepo cr;	
	@Autowired
	private TestResultsRepo tr;
	@Autowired
	private UserRepo ur;
	@Autowired
	private StudentRepo sr;
	
	/*
	 * Student services
	 */
	public void addStudent(Student s) {
		sr.save(s);
	}
	
	public List<Student> getStudentByUserID(long userID) {
		return sr.findAllByUserID(userID);
	}
	
	public Student getStudentByStudentID(long studentID) {
		return sr.findOneByStudentID(studentID);
	}

	public void deleteStudent(long studentID) {
		sr.deleteById(studentID);
	}
	
	public Student updateStudentGradeLevel(long studentID, String gradeLevel) {
		Student s = sr.findOneByStudentID(studentID);
		s.setGradeLevel(gradeLevel);
		sr.save(s);
		return s;
	}

	public Student setStudentTestCompleted(long studentID, long testCompleted) {
		Student s = sr.findOneByStudentID(studentID);
		s.setTestCompleted(testCompleted);
		sr.save(s);
		return s;
	}
	
		
	/*
	 * User services
	 */
	public void addUser(User u) {
		ur.save(u);
	}
	
	public  List<ProjectUserIDAndUserName> getUserByID(long id) {
		return ur.findByUserID(id);
	}
	
	public List<ProjectUserIDAndUserName> getUserByName(String userName) {
		return ur.findByUserName(userName);
	}
	
	/*
	 * Card services
	 */
	public void add(Card c) {
		cr.save(c);
	}

	public Card getById(long id) {
		return cr.findOneById(id);
	}
	
	public List<Card> getByGradeLevelandTestNum(String gradeLevel, String testNum) {
		return cr.findByGradeLevelAndTestNum(gradeLevel, testNum);
	}
	
	public List<Card> getGradeByGradeLevel(String gradeLevel) {
		return cr.findByGradeLevel(gradeLevel);
	}
	
	public List<Card> getAll() {
		List <Card> res = new ArrayList<Card>();
		cr.findAll().forEach(res :: add);
		return res;
	}

	public void delete(long id) {
		cr.deleteById(id);
	}
	
	/*
	 * Test results services
	 */
	public void addResults(TestResults t) {
		tr.save(t);
	}
	
	public List<TestResults> getTestResultsByStudentID(String studentID) {
		return tr.findAllByStudentID(studentID);
	}

	public TestResults getTestResultsByTestID(long testID) {
		return tr.findByTestID(testID);
	}


}
