package com.FlashPoint.Server.Card;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface UserRepo extends CrudRepository<User, Long>{
	
	List<ProjectUserIDAndUserName> findByUserID(@Param("userID") Long userID);
	List<ProjectUserIDAndUserName> findByUserName(@Param("userName") String userName);
}

interface ProjectUserIDAndUserName {
	public long getUserID();
	public String getUserName();
}