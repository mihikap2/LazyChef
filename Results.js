import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

export default class Results extends Component {
    async componentDidMount() {
        await Font.loadAsync({
          'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pageheader}>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.headerText}>Results</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.subHeaderText}>LET'S GET COOKING</Text>
                    </View>
                </View>
                <View style={{flex: 3.5}}>
                    <Text>Open up App.js to start working on your app!</Text>
                </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
    pageheader : {
        margin: 35,
        flex : 1,
        alignItems: 'flex-start',
        flexDirection: 'column'
      },
      headerText : {
        fontFamily : 'Comfortaa-Regular',
        paddingTop: 40,
        color: 'black',
        fontSize: 24,
        flex: 2
      },
      subHeaderText : {
        fontFamily : 'Roboto-Bold',
        color: 'black',
        fontSize: 14,
        flex: 1
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
