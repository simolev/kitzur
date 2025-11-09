import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import capitoli from '../kitzur_capitoli.json';

export default function ChaptersScreen({ navigation }) {
  const renderChapter = ({ item }) => (
    <TouchableOpacity
      style={styles.chapterItem}
      onPress={() => navigation.navigate('ChapterDetail', { chapter: item })}
    >
      <View style={styles.chapterNumber}>
        <Text style={styles.chapterNumberText}>{item.Capitolo}</Text>
      </View>
      <View style={styles.chapterContent}>
        <Text style={styles.chapterTitle}>{item.Descrizione}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={capitoli}
        renderItem={renderChapter}
        keyExtractor={(item) => item.ID}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  listContainer: {
    padding: 10,
  },
  chapterItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chapterNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chapterNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapterContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chapterTitle: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
});
