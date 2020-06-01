// In App.js in a new project
import * as React from 'react';
import { View, FlatList, ScrollView, Text, Button, SectionList, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import {List, ListItem, SearchBar } from "react-native-elements";
import { NavigationContainer, useNavigation, withNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

let movieList = [{title: 'Movie A', date: 1997, key: '1'}, {title: 'Movie B', date: 2000, key: '2'}, {title: 'Movie C', date: 1942, key:'3'}]
const styles = StyleSheet.create({
  title: {
    fontSize: 48
  },
})  
let ogMovieList = movieList
let itemData = ''
let textData = ''
let newData = []

let searchFilterFunction = (newData) => {    
  setState({newData})
}

// this does nothing, but that's ok. it just needs to run to update state.
let updateSearch = (search) => {}

function HomeScreen({ navigation }) {
  const [ search, updateSearch] = React.useState('');
  let [ movieData, searchFilterFunction] = React.useState(movieList);
  return ( 
    <View>
    <SearchBar
        lightTheme
        placeholder="Search a movie title.."
        onChangeText={(search) => { 
          {
            newData = ogMovieList.filter(item => {      
            itemData = `${item.title.toUpperCase()}`
            textData = search.toUpperCase()
            return itemData.indexOf(textData) > -1
            })
          searchFilterFunction(newData)
          }
          updateSearch(search)
        }}
        value={search}
     />
    <FlatList 
    data={movieData}
    renderItem={({ item }) => (
    <ListItem
      title={item.title}
      subtitle={JSON.stringify(item.date)}
      bottomDivider
      chevron
      keyExtractor={item => item.key}
      onPress={() => 
      navigation.navigate('DetailsScreen', {key: [item.key], title: [item.title], date: [item.date]}
      )}
      />
    )} 
    />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const {key} = route.params
  const {title} = route.params
  const {date} = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Text style={styles.title} key={key}>{title}</Text>
     <Text>{date}</Text>
    </View>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;