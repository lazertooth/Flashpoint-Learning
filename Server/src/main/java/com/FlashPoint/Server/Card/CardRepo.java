package com.FlashPoint.Server.Card;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface CardRepo extends CrudRepository<Card, Long>{
	
	public Card findOneById(long id);
	public List<Card> findByGradeLevelAndTestNum(String gradelevel, String testnum);
	public List<Card> findByGradeLevel(String gradelevel);
}
