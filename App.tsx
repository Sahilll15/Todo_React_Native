import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const MyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Add Todo</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');

  const getTodos = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:4000/api/todos');
      console.log('Getting todos');
      console.log(response.data.data);
      setTodoList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (title, completed) => {
    try {
      const response = await axios.post('http://10.0.2.2:4000/api/todos', {
        title,
        completed,
      });

      console.log(response);
      if (response.status === 201) {
        getTodos();
      } else {
        Alert.alert('Todo not added');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  };

  const handleButtonPress = async () => {
    if (todo === '') {
      Alert.alert("Todo can't be empty");
      return;
    }
    console.log('Adding todo');
    await addTodo(todo, false);
    setTodo('');
  };

  const toggleTodoCompletion = async (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    setTodoList(updatedTodoList);

  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo Application</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textinput}
          placeholder="Add Todo"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <MyButton onPress={handleButtonPress} />
      </View>
      <View>
        {todoList.map((todo, index) => (
          <View style={styles.todoItem} key={index}>
            <Text>{index + 1}</Text>
            <Text style={styles.todoText}>{todo.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 90,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#83A2FF',
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  checkBoxContainer: {
    padding: 0, // Adjust padding to fit your design
    backgroundColor: 'transparent',
    borderWidth: 0, // Remove border
  },
});

export default App;
