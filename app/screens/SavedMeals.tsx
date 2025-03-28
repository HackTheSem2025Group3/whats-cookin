import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MainMenu from './MainMenu';
interface Meal {
  id: string;
  name: string;
  image: string;
  kcal: number;
  mins: number;
}

export default function SavedMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const sampleMeals: Meal[] = [
      {
        id: '1',
        name: 'Avocado Toast',
        image: 'https://example.com/images/avocado-toast.jpg',
        kcal: 350,
        mins: 10,
      },
      {
        id: '2',
        name: 'Grilled Chicken Salad',
        image: 'https://example.com/images/chicken-salad.jpg',
        kcal: 480,
        mins: 15,
      },
      {
        id: '3',
        name: 'Berry Smoothie',
        image: 'https://example.com/images/berry-smoothie.jpg',
        kcal: 220,
        mins: 5,
      },
    ];

    setMeals(sampleMeals);
  }, []);

  const handleDelete = (id: string) => {
    const updated = meals.filter(meal => meal.id !== id);
    setMeals(updated);
  };

  const renderMeal = ({ item }: { item: Meal }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>🔥 {item.kcal} kcal</Text>
          <Text style={styles.stat}>⏱ {item.mins} min</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>🍱 Saved Meals</Text> */}
      <MainMenu/>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMeal}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10 ,
  },
  title: {
    backgroundColor: '#f3eeee',
    color: '#5c2b26',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 16,
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f3eeee',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5c2b26',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    fontWeight: '600',
    color: '#5c2b26',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#5c2b26',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  editText: {
    color: '#5c2b26',
    fontWeight: '600',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
