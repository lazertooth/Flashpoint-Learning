package com.FlashPoint.Server.Card;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.context.*;

public interface StudentRepo extends CrudRepository<Student, Long>{	
	public Student findOneByStudentID(long studentID);
	public List<Student> findAllByUserID(@Param("userID") long userID);
}