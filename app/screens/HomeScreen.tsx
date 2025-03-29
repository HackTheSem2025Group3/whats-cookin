import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';

type ActivityLevel = 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | 'Super Active';

const activityOptions: { label: ActivityLevel; emoji: string }[] = [
  { label: 'Sedentary', emoji: '🪑' },
  { label: 'Lightly Active', emoji: '🚶' },
  { label: 'Moderately Active', emoji: '🏃' },
  { label: 'Very Active', emoji: '🏋️‍♂️' },
  { label: 'Super Active', emoji: '🏆' },
];

const HomeScreen = () => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityLevel | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your current weight?</Text>
      <TextInput
        style={styles.input}
        placeholder="___ lb / kg"
        keyboardType="numeric"
        value={currentWeight}
        onChangeText={setCurrentWeight}
      />

      <Text style={styles.title}>Your goal weight?</Text>
      <TextInput
        style={styles.input}
        placeholder="___ lb / kg"
        keyboardType="numeric"
        value={goalWeight}
        onChangeText={setGoalWeight}
      />

      <Text style={styles.title}>Your activity level like?</Text>
      <View style={styles.activityContainer}>
        {activityOptions.map((option) => (
          <Pressable
            key={option.label}
            onPress={() => setSelectedActivity(option.label)}
            style={[
              styles.activityItem,
              selectedActivity === option.label && styles.selectedActivity,
            ]}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={styles.activityText}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#f4eff0',
    padding: 15,
    marginTop: 10,
    width: '80%',
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  activityContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  activityItem: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
  },
  selectedActivity: {
    backgroundColor: '#d0f0c0',
  },
  emoji: {
    fontSize: 36,
  },
  activityText: {
    marginTop: 5,
    fontWeight: '600',
  },
});

export default HomeScreen;

