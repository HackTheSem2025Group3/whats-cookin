import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';

interface AddDishModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (dish: Dish) => void;
}

interface Dish {
  name: string;
  ingredients: string[];
  calories: number;
}

const AddDishModal: React.FC<AddDishModalProps> = ({ visible, onClose, onSave }) => {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/calories', {
        dishName,
        ingredients,
      });
      setCalories(response.data.calories);
    } catch (error) {
      console.error('Error calculating calories:', error);
    }
  };

  const addIngredient = (ingredient: string) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const saveDish = () => {
    const dish: Dish = { name: dishName, ingredients, calories: calories || 0 };
    onSave(dish);
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeader}>Add Dish</Text>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Add Ingredient"
          onSubmitEditing={(e) => addIngredient(e.nativeEvent.text)}
        />
        <View>
          {ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientText}>
              {ingredient}
            </Text>
          ))}
        </View>
        <Pressable style={styles.calculateButton} onPress={calculateCalories}>
          <Text style={styles.calculateButtonText}>Calculate Calories</Text>
        </Pressable>
        {calories !== null && (
          <Text style={styles.caloriesText}>Calories: {calories}</Text>
        )}
        <Pressable style={styles.saveButton} onPress={saveDish}>
          <Text style={styles.saveButtonText}>Add Dish</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  ingredientText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginVertical: 5,
  },
  calculateButton: {
    backgroundColor: '#6E2F2C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caloriesText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddDishModal;