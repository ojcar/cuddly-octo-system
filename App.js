import React from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  componentDidMount() {
    this.handleUpdateLocation('San Ramon');
  }

  handleUpdateLocation = (city) => {
    this.setState({
      location: city
    })
  }

  render() {
    const { location } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground
          source={getImageForWeather('Clear')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >

          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
            <Text style={[styles.smallText, styles.textStyle]}>Cloudy</Text>
            <Text style={[styles.largeText, styles.textStyle]}>24 C</Text>

            <SearchInput 
              placeholder="Search any city"
              onSubmit={this.handleUpdateLocation} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      }
    }),
    color: 'white'
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  }
});
