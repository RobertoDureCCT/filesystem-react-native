// React Native File Viewer Example to View Files in Native File Viewer
// https://aboutreact.com/react-native-file-viewer/

// Import React
import React from 'react';
// Import core components
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';

// Import File Viewer to View Files in Native File Viewer
import FileViewer from 'react-native-file-viewer';
// Import DocumentPicker to pick file to view
import DocumentPicker from 'react-native-document-picker';

const App = () => {
  const selectOneFile = async () => {
    // To Select File
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      if (res) {
        let uri = res.uri;
        if (Platform.OS === 'ios') {
          // Remove 'file://' from file path for FileViewer
          uri = res.uri.replace('file://', '');
        }
        console.log('URI : ' + uri);
        FileViewer.open(uri)
          .then(() => {
            // Do whatever you want
            console.log('Success');
          })
          .catch((_err) => {
            // Do whatever you want
            console.log(_err);
          });
      }
    } catch (err) {
      // Handling Exception
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
