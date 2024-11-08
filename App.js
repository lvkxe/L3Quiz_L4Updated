import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <View style={styles.questionBox}>
        <Text style={styles.label}>{label}</Text>
        <Image source={image} style={styles.image} />
        <RNPickerSelect
            onValueChange={onValueChange}
            items={options.map(option => ({ label: option, value: option }))}
            value={selectedValue}
            placeholder={{ label: 'Select an answer', value: null }}
            style={pickerSelectStyles}
        />
      </View>
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
        <View style={styles.header}>
          <Icon name="paw" size={30} color={'#fff'} style={styles.icon} />
          <Text style={styles.headerText}>Luke's Animal Quiz</Text>
        </View>
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
        <Button title="Submit Answers" onPress={handleSubmit} color="#5B84B1FF" />
        <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)} style={styles.goodLuckButton}>
          <Text style={styles.touchableText}>Good Luck!</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  questionBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  touchableText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    backgroundColor: 'whitesmoke',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    backgroundColor: 'whitesmoke',
    paddingRight: 30,
  },
});

export default App;
