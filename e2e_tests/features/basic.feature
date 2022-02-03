Feature: Quiz
  In order to finish the quiz
  As a student
  I need to be able to answer the questions and see the results

  Scenario Outline: Answer several questions
    Given I answer question "<question>" with these answers "<attempt>"
    When I answer the question in several attempts
      | question                                         | code                                                                                                                                     | correct_answer | question_score | attempt |
      | What's this programming language called?         | none                                                                                                                                     | A              | 10             | B,C,D   |
      | Which command makes text appear?                 | none                                                                                                                                     | B              | 10             | A,B     |
      | How do you ask what someone's favorite color is? | none                                                                                                                                     | C              | 10             | C       |
      | What is wrong with this code?                    | Hi Im Hedy!<br>ask Who are you?<br>echo Hi...                                                                                            | A              | 10             | B,A     |
      | Which command is missing in line 2?              | ask What is your favorite pet?<br>? So your favorite pet is..."                                                                          | D              | 10             | A,C,D   |
      | What's wrong with this code?                     | print Hi im Hedy!<br>aks Which football team do you support?<br>echo You support...<br>print Cool! Me too!                               | B              | 10             | B       |
      | What's wrong with this code?                     | print Welcome at Hedys restaurant!<br>ask What would you like to eat?<br>echo So you want to order ...<br>print Coming right up! Enjoy!" | D              | 10             | A,C,B   |
      | How do you use the echo command?                 | none                                                                                                                                     | C              | 10             | A,C     |
      | What's wrong with this code?                     | print Hello!<br>print How are you doing?<br>echo So you are doing..."                                                                    | B              | 10             | B       |
      | Are you ready for level 2?                       | none                                                                                                                                     | B              | 10             | A       |
    Then I go to the results page
    And I should see score of the quiz

    Examples:
      | question                                         | code                                                                                                                                     | correct_answer | question_score | attempt |
      | What's this programming language called?         | none                                                                                                                                     | A              | 10             | B,C,D   |
      | Which command makes text appear?                 | none                                                                                                                                     | B              | 10             | A,B     |
      | How do you ask what someone's favorite color is? | none                                                                                                                                     | C              | 10             | C       |
      | What is wrong with this code?                    | Hi Im Hedy!<br>ask Who are you?<br>echo Hi...                                                                                            | A              | 10             | B,A     |
      | Which command is missing in line 2?              | ask What is your favorite pet?<br>? So your favorite pet is..."                                                                          | D              | 10             | A,C,D   |
      | What's wrong with this code?                     | print Hi im Hedy!<br>aks Which football team do you support?<br>echo You support...<br>print Cool! Me too!                               | B              | 10             | B       |
      | What's wrong with this code?                     | print Welcome at Hedys restaurant!<br>ask What would you like to eat?<br>echo So you want to order ...<br>print Coming right up! Enjoy!" | D              | 10             | A,C,B   |
      | How do you use the echo command?                 | none                                                                                                                                     | C              | 10             | A,C     |
      | What's wrong with this code?                     | print Hello!<br>print How are you doing?<br>echo So you are doing..."                                                                    | B              | 10             | B       |
      | Are you ready for level 2?                       | none                                                                                                                                     | B              | 10             | A       |


