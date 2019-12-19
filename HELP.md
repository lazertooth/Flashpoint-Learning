# 
# Getting Started
# User Calls
### post - /register/
```json
{
	"userName": "Test",
	"userEmail": "Test@Test.com",
	"userPassword": "TestPassword"
}
```
### get - /user/name/{User Name}
```json
[{
	"userName": "Test",
	"userID": 10
}]
```
### get - /user/id/{id}
```json
[{
	"userName": "Test",
	"userID": 10
}]
```

# Card Calls
### get card by id - /card/{id}
```json
[{
	"userName": "Test",
	"userID": 10
}]
```
### get set of all cards- /Allcard
```json
{
	"id": 1,
	"gradeLevel": "PreK",
	"testNum": "1",
	"questionNum": "1",
	"correctWord": "TEST",
}
```
### get set of cards by grade level- /card/grade/{gradeLevel}
```json
{
	"id": 1,
	"gradeLevel": "PreK",
	"testNum": "1",
	"questionNum": "1",
	"correctWord": "TEST",
}
```
### get set of card by grade level and test num - /card/{gradeLevel}/{testNum}
```json
{
	"id": 1,
	"gradeLevel": "PreK",
	"testNum": "1",
	"questionNum": "1",
	"correctWord": "TEST",
}
```
# Group Calls
### post add a student - /student/add
```json
{
    "userID": "10",
    "studentName": "Test Name",
    "gradeLevel": "0",
    "testCompleted": "0"
}
```
### get set of student(s) by user id (see user call above)- /student/all/{userID}
```json
{
	"studentID":"12",
    "userID": "10",
    "studentName": "Test Name",
    "gradeLevel": "0",
    "testCompleted": "0"
}
```
### get student by student id - /student/{studentID}
```json
{
	"studentID":"12",
    "userID": "10",
    "studentName": "Test Name",
    "gradeLevel": "0",
    "testCompleted": "0"
}
```
### get update a student's grade level - /student/update/{studentID}/grade/{gradeLevel}
```json
{
	"studentID":"12",
    "userID": "10",
    "studentName": "Test Name",
    "gradeLevel": "PreK",
    "testCompleted": "0"
}
```
### get update a student's most recent test completed- /student/update/{studentID}/test/{testCompleted}
```json
{
	"studentID":"12",
    "userID": "10",
    "studentName": "Test Name",
    "gradeLevel": "PreK",
    "testCompleted": "1"
}
```
### delete a student - /student/delete/{id}

# Test Results
### post add a test result- /test/add
```json
{
    "studentID": 11,
    "userID": 9,
    "gradeLevel": 1,
    "testNum": "2",
    "correctWords": { [ "correct1", "correct2", "correct3" ] },
    "incorrectWords": { [ "fail1", "fail2", "fail3" ] },
    "success" : 0
}
```
### get set of tests for a student by student id- /test/all/{studentID}
```json
{
	"testID": 17,
	"studentID": "9",
	"gradeLevel": "1",
	"testNum": "2",
	"correctWords": [
		"correct1",
		"correct2",
		"correct3"
	],
	"incorrectWords": [
		"fail1",
		"fail2",
		"fail3"
	],
"success": false
}
```
### get a specific test id - /test/{testID}
```json
{
	"testID": 17,
	"studentID": "9",
	"gradeLevel": "1",
	"testNum": "2",
	"correctWords": [
		"correct1",
		"correct2",
		"correct3"
	],
	"incorrectWords": [
		"fail1",
		"fail2",
		"fail3"
	],
"success": false
}
```