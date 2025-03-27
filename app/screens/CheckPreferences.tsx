// CheckPreferences.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

const PreferenceSection = ({
  title,
  items,
  selectedItems,
  setSelectedItems,
}: {
  title: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item, idx) => {
          const isSelected = selectedItems.includes(item);
          return (
            <Pressable
              key={idx}
              style={[styles.checkboxItem, isSelected && styles.checkboxItemActive]}
              onPress={() => toggleItem(item)}
            >
              <Text style={[styles.checkboxText, isSelected && styles.checkboxTextActive]}>
                {isSelected ? '✔' : ''} {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default function MealPreferences() {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);

  const handleNext = () => {

    console.log('Selected:', { allergies, dislikes, diets });
  };

  return (
    <ScrollView style={styles.container}>
      <PreferenceSection
        title="Allergy Information"
        items={[
          'Nuts', 'Seafood', 'Shellfish', 'Dairy', 'Eggs', 'Peanuts', 'Gluten', 'Sesame', 'Others'
        ]}
        selectedItems={allergies}
        setSelectedItems={setAllergies}
      />
      <PreferenceSection
        title="Disliked Foods"
        items={[
          'Spicy', 'Garlic', 'Tofu', 'Cilantro', 'Pickles', 'Olives', 'Onions', 'Eggplant', 'Others'
        ]}
        selectedItems={dislikes}
        setSelectedItems={setDislikes}
      />
      <PreferenceSection
        title="Diet Type"
        items={[
          'Regular', 'Pescatarian', 'Dairy-Free', 'Vegan', 'Vegetarian', 'High-Protein', 'Keto', 'Gluten-Free', 'Others'
        ]}
        selectedItems={diets}
        setSelectedItems={setDiets}
      />

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#f3eeee',
    textAlign: 'center',
    padding: 8,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxItem: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  checkboxItemActive: {
    backgroundColor: '#5c2b26',
  },
  checkboxText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center'
  },
  checkboxTextActive: {
    color: '#fff',
  },
  nextBtn: {
    backgroundColor: '#5c2b26',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
