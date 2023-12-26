import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper'
import parser from '../utils/parser';
import { removeDuplicates } from '../utils/removeDuplicates';

import { playlist } from '../data/playlist';

const HomeScreen = () => {
  const navigation = useNavigation();
  const result = parser.parse(playlist);
  const uniqueGroup = removeDuplicates(result.items, item => item.group.title);

  // Get the screen width
  const screenWidth = Dimensions.get('window').width;

  // Calculate the item width by dividing the screen width by the number of columns
  const itemWidth = (screenWidth / 3) - 20;

  console.log(result);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 100,
            height: 50,
            marginVertical: 10,
          }}
          resizeMode='contain'
        />
        <Icon name="account-circle" size={28} color="#838184" />
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{gap: 10, marginBottom: 15}}>
          <Text
            variant="titleMedium"
            style={{
              color: "#fff",
            }}
          >
            Que voulez-vous regarder ?
          </Text>

          <FlatList
            data={uniqueGroup}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 150,
                  backgroundColor: "#f8c423",
                  paddingVertical: 12,
                  paddingHorizontal: 15,
                  margin: 5,
                  borderRadius: 2,
                }}
              >
                <Text
                  variant="labelMedium"
                  style={{
                    color: "#000",
                  }}
                >
                  {item.group.title}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={{gap: 10}}>
          <Text
            variant="titleMedium"
            style={{
              color: "#fff",
            }}
          >
            En ce moment à la télé
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {result.items.slice(0, 10).map((item, index) => (
              <Pressable
                style={{
                  width: itemWidth,
                  height: 160,
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  position: "relative",
                  marginBottom: 15,
                }}
                onPress={() => navigation.navigate("DetailsScreen", { item })}
              >
                <ImageBackground
                  source={ item.tvg.image ? { uri: item.tvg.image } : require('../../assets/No-Image-Placeholder.png') }
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 2,
                  }}
                  resizeMode='cover'
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 20,
                        position: "absolute",
                        bottom: 10,
                        display: 'flex',
                        alignItems: 'flex-end',
                      }}
                    >
                      <Image
                        source={{ uri: item.tvg.logo }}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxWidth: 50,
                        }}
                        resizeMode='contain'
                      />
                    </View>
                  </ImageBackground>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          {uniqueGroup.map((item, index) => (
            <View>
              <Text
                variant="titleMedium"
                style={{
                  color: "#fff",
                }}
              >
                {item.group.title}
              </Text>

              <FlatList
                data={result.items.filter((i) => i.group.title === item.group.title)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      width: itemWidth,
                      height: 160,
                      backgroundColor: "#fff",
                      borderRadius: 2,
                      position: "relative",
                      marginVertical: 10,
                      marginRight: 15,
                    }}
                    onPress={() => navigation.navigate("DetailsScreen", { item })}
                  >
                    <ImageBackground
                      source={ item.tvg.image ? { uri: item.tvg.image } : require('../../assets/No-Image-Placeholder.png') }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 2,
                      }}
                      resizeMode='cover'
                      >
                        <View
                          style={{
                            width: "100%",
                            height: 20,
                            position: "absolute",
                            bottom: 10,
                            display: 'flex',
                            alignItems: 'flex-end',
                          }}
                        >
                          <Image
                            source={{ uri: item.tvg.logo }}
                            style={{
                              width: "100%",
                              height: "100%",
                              maxWidth: 50,
                            }}
                            resizeMode='contain'
                          />
                        </View>
    
                      </ImageBackground>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191c21",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

export default HomeScreen