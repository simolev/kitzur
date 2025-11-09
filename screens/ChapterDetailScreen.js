import React, { useMemo, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import paragrafiItaliano from '../kitzur_paragrafi.json';
import paragrafiEbraico from '../kitzur_paragrafi_ebraico.json';

export default function ChapterDetailScreen({ route }) {
  const { chapter } = route.params;
  const [isHebrew, setIsHebrew] = useState(false);
  const scrollViewRef = useRef(null);
  const paragraphRefs = useRef({});
  const [scrollToParagraph, setScrollToParagraph] = useState(null);
  
  const chapterParagraphs = useMemo(() => {
    const source = isHebrew ? paragrafiEbraico : paragrafiItaliano;
    return source.filter(p => p.capitolo === chapter.Capitolo);
  }, [chapter.Capitolo, isHebrew]);

  const handleLanguageToggle = (paragraphNumber) => {
    setScrollToParagraph(paragraphNumber);
    setIsHebrew(!isHebrew);
  };

  // Scroll to the target paragraph after language change
  React.useEffect(() => {
    if (scrollToParagraph !== null) {
      setTimeout(() => {
        const paragraphId = chapterParagraphs.find(
          p => p.paragrafo === scrollToParagraph
        )?.id;
        
        if (paragraphId && paragraphRefs.current[paragraphId]) {
          paragraphRefs.current[paragraphId].measureLayout(
            scrollViewRef.current,
            (x, y) => {
              scrollViewRef.current?.scrollTo({ y: y - 10, animated: true });
            },
            () => {}
          );
        }
        setScrollToParagraph(null);
      }, 100);
    }
  }, [isHebrew, scrollToParagraph, chapterParagraphs]);

  return (
    <ScrollView 
      style={styles.container}
      ref={scrollViewRef}
    >
      <View style={styles.header}>
        <Text style={styles.chapterTitle}>{chapter.Descrizione}</Text>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => setIsHebrew(!isHebrew)}
        >
          <Text style={styles.languageButtonText}>
            {isHebrew ? 'עברית' : 'Italiano'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {chapterParagraphs.map((paragraph) => (
        <View 
          key={paragraph.id} 
          style={styles.paragraphContainer}
          ref={(ref) => paragraphRefs.current[paragraph.id] = ref}
        >
          <View style={styles.paragraphHeader}>
            <View style={styles.paragraphHeaderTop}>
              <Text style={[styles.paragraphNumber, isHebrew && styles.hebrewText]}>
                § {paragraph.paragrafo}/{chapterParagraphs.length}
              </Text>
              <TouchableOpacity 
                style={styles.paragraphLanguageButton}
                onPress={() => handleLanguageToggle(paragraph.paragrafo)}
              >
                <Text style={styles.paragraphLanguageButtonText}>
                  {isHebrew ? 'עב' : 'IT'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.paragraphTitle, isHebrew && styles.hebrewText]}>
              {paragraph.titolo}
            </Text>
          </View>
          <Text style={[styles.paragraphText, isHebrew && styles.hebrewText]}>
            {paragraph.testo}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#34495e',
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
    flex: 1,
  },
  languageButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paragraphContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  paragraphHeader: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 8,
  },
  paragraphHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  paragraphNumber: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
  paragraphLanguageButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 35,
    alignItems: 'center',
  },
  paragraphLanguageButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  paragraphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    lineHeight: 24,
  },
  paragraphText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
    textAlign: 'justify',
  },
  hebrewText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
