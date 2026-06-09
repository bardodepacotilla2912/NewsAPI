import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

export default function ModalScreen() {
  const { title, description, image, url, source } = useLocalSearchParams<{
    title: string;
    description: string;
    image: string;
    url: string;
    source: string;
  }>();

  async function openArticle() {
    if (url) {
      await WebBrowser.openBrowserAsync(url);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image ? (
        <Image source={image} style={styles.image} contentFit="cover" />
      ) : null}
      {source ? (
        <ThemedText style={styles.source}>{source}</ThemedText>
      ) : null}
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText style={styles.description}>{description}</ThemedText>
      ) : null}
      <Pressable style={styles.button} onPress={openArticle}>
        <ThemedView style={styles.buttonInner}>
          <ThemedText style={styles.buttonText}>Leer noticia completa</ThemedText>
        </ThemedView>
      </Pressable>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <ThemedText type="link">Volver</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  source: {
    fontSize: 13,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 8,
  },
  buttonInner: {
    backgroundColor: '#0a7ea4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  back: {
    alignItems: 'center',
    marginTop: 4,
    paddingVertical: 8,
  },
});
