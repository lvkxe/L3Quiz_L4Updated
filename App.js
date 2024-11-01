import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";


const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <ScrollView style={styles.questionBox}>
        <Text>{label}</Text>
        <Image source={image} style={styles.image} />
        <RNPickerSelect
            onValueChange={onValueChange}
            items={options.map(option => ({ label: option, value: option }))}
            value={selectedValue}
            placeholder={{ label: 'Select an answer', value: null }}
        />
      </ScrollView>
  );
};

const App = () => {
  const questions = [
    {
      label: 'What animal is this?',
      image: require('./img/crocodile.jpg'),
      options: ['Elephant', 'Tiger', 'Crocodile'],
      correctAnswer: 'Crocodile',
    },
    {
      label: 'What animal is this?',
      image: require('./img/leopard.jpg'),
      options: ['Giraffe', 'Leopard', 'Deer'],
      correctAnswer: 'Leopard',
    },
    {
      label: 'What animal is this?',
      image: require('./img/penguin.jpg'),
      options: ['Hummingbird', 'Penguin', 'Peacock'],
      correctAnswer: 'Penguin',
    },
    {
      label: 'What animal is this?',
      image: require('./img/deer.jpg'),
      options: ['Giraffe', 'Deer', 'Peacock'],
      correctAnswer: 'Deer',
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    Alert.alert(`You have ${score} correct answer(s)!`);
  };

  return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />
        <Icon name={"paw"} size={30} color={'#808080'}><Text>Luke's Quiz</Text></Icon>
        {questions.map((question, index) => (
            <QuestionBox
                key={index}
                label={question.label}
                image={question.image}
                options={question.options}
                selectedValue={answers[index]}
                onValueChange={(value) => handleAnswerChange(value, index)}
            />
        ))}
        <Button title="Submit Answers" onPress={handleSubmit} />
        <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)}>
          <Text style={styles.touchableText}>Good Luck!</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  questionBox: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  touchableText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
});

export default App;
