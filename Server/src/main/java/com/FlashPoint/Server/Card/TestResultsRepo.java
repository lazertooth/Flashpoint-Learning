package com.FlashPoint.Server.Card;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface TestResultsRepo extends CrudRepository<TestResults, Long>{
	public TestResults findByTestID(Long testID);
	public List<TestResults> findAllByStudentID(@Param("studentID") String studentID);
}
