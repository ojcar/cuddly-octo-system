import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  StatusBar } from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      loading: false,
      error: false,
      temperature: 0,
      weather: ''
    }
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
  }

  renderContent() {
    const { error } = this.state;

    return (
      <View>
        {error && this.renderError()}
        {!error && this.renderData()}
      </View>
    );
  }

  renderError() {
    const { error } = this.state;

    return (
      <Text style={[styles.smallText, styles.textStyle]}>
        {error}
      </Text>
    )
  }

  renderData() {
    const { location, weather, temperature } = this.state;

    return (
      <View>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>
          {`${Math.round(temperature)}°`}
        </Text>
      </View>
    )
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather( locationId );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch(e) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  }

  render() {
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >

          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && this.renderContent()}

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
