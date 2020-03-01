import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import {Dimensions, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";

const current = { 'title': 'hello'}
const screenwidth = Math.round(Dimensions.get('window').width);
export default class Results extends Component {
   state = {
     RECIPES : [],
     modalVisible: false,
     currentRecipe: current
  }

    async componentDidMount() {
        await Font.loadAsync({
          'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });

      try {
          const recipeApiCall = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&apiKey=3ed3af1b161a4417b17bf1c6772badc6');
          const recipes = await recipeApiCall.json();
          this.setState({RECIPES: recipes, loading: false});
          console.log(this.state.RECIPES)
      } catch(err) {
          console.log("Error fetching data-----------", err);
      }

    }
    

    renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item} key={item.key} onPress={()=> this.setState({modalVisible: true, currentRecipe: item})}>
          <Image
            style={{width: screenwidth - 40, height: 180, borderRadius: 50 / 2}}
            source={{uri: item.image}}/>
          </TouchableOpacity>
          <View style={styles.recipeNameBox}>
            <Text style={styles.recipeName}>{item.title.toLowerCase()}</Text>
          </View>
      </View>
  );

    render() {
      console.log(this.state.currentRecipe)
        return (
            <View style={styles.container}>
              <View style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
              <Modal
                style={{margin: 0, width: screenwidth, flex: 1}}
                backdropOpacity={0}
                backdropColor={'#FFF'}
                isVisible={this.state.modalVisible}
                onBackdropPress={()=> this.setState({modalVisible: false})}
                >
                <ScrollView style={{flex: 0.8, marginTop: 150, width: screenwidth, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                <Image
                  style={{width: screenwidth, height: 240, borderTopLeftRadius: 25, borderTopRightRadius: 25}}
                  source={{uri: this.state.currentRecipe.image}}/>
                  <View style={{alignItems: 'center'}}>
                      <Text style={{
                          fontFamily : 'Comfortaa-Regular',
                          color: 'black',
                          marginHorizontal: 35,
                          fontSize: 24,
                          paddingVertical: 25
                        }}>{this.state.currentRecipe.title }</Text>
                  </View>
                  </ScrollView>
                
              </Modal>
              </View>

                <View style={styles.pageheader}>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.headerText}>Results</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={styles.subHeaderText}>LET'S GET COOKING</Text>
                    </View>
                </View>
                <View style={{flex: 4, alignItems: "flex-start", flexDirection: 'row'}}>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={this.state.RECIPES}
                    renderItem={this.renderItem}
                    />
                </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
    pageheader : {
        marginHorizontal: 35,
        marginTop: 35,
        flex : 0.9,
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
        paddingTop: 10,
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
      itemContainer: {
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 25,
      },
      recipeNameBox: {
        backgroundColor: '#FFBE16', 
        height: 50, 
        width: screenwidth - 120,  
        position: "absolute", 
        right: 10,
        top: 140,
        borderBottomRightRadius: 20, 
        justifyContent: "center"
      },
      recipeName: {
        color: 'white', 
        fontSize: 16, 
        textAlign: "right", 
        paddingRight: 10
      }
});