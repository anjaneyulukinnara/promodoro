/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export class App extends Component {
  state = {
    label: "START",
    timer: 1800,
    timerLabel: "30:00"
  }
  interval = null;
  start = () => {
    if (this.state.label === "START") {
      this.setState({
        label: "STOP"
      })
      this.interval = setInterval(() => {
        const timer = this.state.timer - 1;
        let min = Math.floor(timer / 60);
        let secs = timer % 60;
        if (secs < 10) {
          secs = '0' + secs;
        }
        if (secs == 0) {
          min--
        }
        const timerLabel = `${min}:${secs}`;
        this.setState({
          timer,
          timerLabel
        })
      }, 1000)
    } else {
      clearInterval(this.interval);
      this.setState({
        label: "START",
        timer: 1800,
        timerLabel: "30:00"
      })

    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <ImageBackground
              accessibilityRole={'image'}
              source={require('./assets/images/promodoro.jpg')}
              style={styles.background}
              imageStyle={styles.logo}>
              <Text style={styles.timer}>{this.state.timerLabel}</Text>
              <TouchableOpacity onPress={this.start}>
                <Text style={styles.text}>{this.state.label}</Text>
              </TouchableOpacity>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  timer: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  text: {
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.black,
  }
});

