package com.FlashPoint.Server.Card;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {
	@Autowired
	private CardService cs;

	/*
	 * User info methods
	 */
	@RequestMapping(method = RequestMethod.POST,value ="/register")
	public void add(@RequestBody User c) {
		cs.addUser(c);
	}
	

	@RequestMapping("/user/id/{id}")
	public List<ProjectUserIDAndUserName> getUserByID(@PathVariable long id) {		
		return cs.getUserByID(id);
	}
	
	@RequestMapping("/user/name/{userName}")
	public List<ProjectUserIDAndUserName> getUserByID(@PathVariable String userName) {		
		return cs.getUserByName(userName);
	}
	
	/*
	 * Card info methods
	 */
	@RequestMapping("/card/{id}")
	public Card get(@PathVariable long id) {		
		return cs.getById(id);
	}

	@RequestMapping(method = RequestMethod.POST,value ="/card/add")
	public void add(@RequestBody Card c) {
		cs.add(c);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping("/Allcard")
	public List<Card> get() {
		return cs.getAll() ;
	}
	
	@RequestMapping("/card/grade/{gradeLevel}")
	public List<Card> get(@PathVariable String gradeLevel) {
		return cs.getGradeByGradeLevel(gradeLevel) ;
	}
	
	@RequestMapping("/card/{gradeLevel}/{testNum}")
	public List<Card> get(@PathVariable String gradeLevel, @PathVariable String testNum) {
		return cs.getByGradeLevelandTestNum(gradeLevel, testNum) ;
	}
		
	@RequestMapping(method = RequestMethod.DELETE,value ="/card/delete/{id}")
	public void delete(@PathVariable long id) {
		cs.delete(id);
	}
	
	/*
	 * Group info methods
	 */
	@RequestMapping(method = RequestMethod.POST,value ="/student/add")
	public void add(@RequestBody Student s) {
		cs.addStudent(s);
	}
	
	@RequestMapping("/student/all/{userID}")
	public List<Student> getStudentByUserID(@PathVariable long userID) {		
		return cs.getStudentByUserID(userID);
	}
	
	@RequestMapping("/student/{studentID}")
	public Student getStudentByStudentID(@PathVariable long studentID) {		
		return cs.getStudentByStudentID(studentID);
	}	
	
	@RequestMapping("/student/update/{studentID}/grade/{gradeLevel}")
	public Student setStudentGradeLevel(@PathVariable long studentID, @PathVariable String gradeLevel) {		
		return cs.updateStudentGradeLevel(studentID, gradeLevel);
	}
	
	@RequestMapping("/student/update/{studentID}/test/{testCompleted}")
	public Student setStudentTestCompleted(@PathVariable long studentID, @PathVariable long testCompleted) {		
		return cs.setStudentTestCompleted(studentID, testCompleted);
	}	
	
	@RequestMapping(method = RequestMethod.DELETE,value ="/student/delete/{id}")
	public void deleteStudent(@PathVariable long id) {
		cs.deleteStudent(id);
	}
	
	/*
	 * Test result methods
	 */
	@RequestMapping(method = RequestMethod.POST,value ="/test/add")
	public void add(@RequestBody TestResults tr) {
		cs.addResults(tr);
	}
	
	@RequestMapping("/test/all/{studentID}")
	public List<TestResults> getResultsByUserID(@PathVariable String studentID) {		
		return cs.getTestResultsByStudentID(studentID);
	}
	
	@RequestMapping("/test/{testID}")
	public TestResults getTestResultsByTestID(@PathVariable long testID) {		
		return cs.getTestResultsByTestID(testID);
	}	
	
}
