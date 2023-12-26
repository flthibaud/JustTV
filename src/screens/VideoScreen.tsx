import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'
import { Video, ResizeMode } from 'expo-av';

const VideoScreen = ({route}) => {
  const { item } = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  console.log(item)

  return (
    <SafeAreaView style={styles.container}>
      <Video
        ref={video}
        style={{
          width: "100%",
          height: 300,
        }}
        source={{
          uri: item.url,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191c21",
  },
});

export default VideoScreen