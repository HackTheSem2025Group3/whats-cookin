import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, Modal, TextInput, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { saveUserData } from '../services/userService'; // Import the userService
import { User } from '../../shared/types/User'; 
import axios from 'axios';
// import './AddDishModal'
import MainMenu from './MainMenu';

interface Meals {
  [date: string]: {
    Breakfast: Dish[];
    Lunch: Dish[];
    Dinner: Dish[];
  };
}

interface Dish {
  name: string;
  ingredients: string[];
  calories: number;
}

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // Default to today's date
  const [currentWeek, setCurrentWeek] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false); // Modal visibility for calendar
  const [currentMonth, setCurrentMonth] = useState(moment().month()); // Current month index
  const [currentYear, setCurrentYear] = useState(moment().year()); // Current year

  const [showMealModal, setShowMealModal] = useState(false);
  const [currentMealType, setCurrentMealType] = useState('');
  const [testResult, setTestResult] = useState<string>('');
  const [testLoading, setTestLoading] = useState(false);

  interface Meals {
    [date: string]: {
      Breakfast: string;
      Lunch: string;
      Dinner: string;
    };
  }

  const [meals, setMeals] = useState<Meals>({});
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [calories, setCalories] = useState<number | null>(null);

  // Generate the current week dynamically
  useEffect(() => {
    const startOfWeek = moment(selectedDate).startOf('week'); // Start of the week (Sunday)
    const week = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD')
    );
    setCurrentWeek(week);
  }, [selectedDate]);

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddMeal = (mealType: string) => {
    setCurrentMealType(mealType);
    setShowMealModal(true);
  };

  const saveMeal = (dish: Dish) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [selectedDate]: {
        ...prevMeals[selectedDate],
        [currentMealType]: [
          ...(prevMeals[selectedDate]?.[currentMealType] || []),
          dish,
        ],
      },
    }));
    setDishName('');
    setIngredients([]);
    setCalories(null);
    setShowMealModal(false);
  };

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

  const handleMonthChange = (increment: number) => {
    const newDate = moment({ year: currentYear, month: currentMonth }).add(increment, 'months');
    setCurrentMonth(newDate.month());
    setCurrentYear(newDate.year());
    setSelectedDate(newDate.startOf('month').format('YYYY-MM-DD'));
  };

  const renderCalendar = () => {
    const daysInMonth = moment({ year: currentYear, month: currentMonth }).daysInMonth();
    const startOfMonth = moment({ year: currentYear, month: currentMonth }).startOf('month');
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) =>
      startOfMonth.clone().add(i, 'days').format('YYYY-MM-DD')
    );

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <Pressable onPress={() => handleMonthChange(-1)}>
            <Text style={styles.calendarNavText}>◀</Text>
          </Pressable>
          <Text style={styles.calendarHeaderText}>
            {moment({ year: currentYear, month: currentMonth }).format('MMMM YYYY')}
          </Text>
          <Pressable onPress={() => handleMonthChange(1)}>
            <Text style={styles.calendarNavText}>▶</Text>
          </Pressable>
        </View>
        <FlatList
          data={calendarDays}
          numColumns={7}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedDate(item);
                setShowCalendar(false);
              }}
              style={[
                styles.calendarDay,
                selectedDate === item && styles.selectedCalendarDay,
              ]}
            >
              <Text
                style={[
                  styles.calendarDayText,
                  selectedDate === item && styles.selectedCalendarDayText,
                ]}
              >
                {moment(item).date()}
              </Text>
            </Pressable>
          )}
        />
      </View>
    );
  };

  const testMongoConnection = async () => {
    setTestLoading(true);
    setTestResult('');
    try {
      const testUser: User = {
        name: 'Test User1',
        email: `test${Date.now()}@gmail.com`, // Unique email to avoid duplicates
        activityLevel: "Sedentary" // Ensure this matches the allowed string literal type
      };
      
      const response = await saveUserData(testUser);
      setTestResult(`Success! Created user with ID: ${response._id}`);
      console.log('Connection test succeeded:', response);
    } catch (error: any) {
      if (error.message.includes('Network Error')) {
        setTestResult('Error: Cannot connect to the backend server. Make sure your Express server is running.');
      } else if (error.response) {
        setTestResult(`Server responded with error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else {
        setTestResult(`Error: ${error.message}`);
      }
      console.error('Connection test failed:', error);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
        <MainMenu/>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.appName}>Whats Cookin</Text>
        <Pressable style={styles.profileIcon}>
          <Text style={styles.profileText}>🔍</Text>
        </Pressable>
      </View> */}

      {/* Month and Year */}
      <Pressable onPress={() => setShowCalendar(true)}>
        <Text style={styles.monthYear}>
          {moment(selectedDate).format('MMMM YYYY')}
        </Text>
      </Pressable>

      {/* Date Carousel */}
      <FlatList
        data={currentWeek}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateSelector}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleDatePress(item)}
            style={[
              styles.dateItem,
              selectedDate === item && styles.selectedDate, // Highlight the selected date
            ]}
          >
            <Text
              style={[
                styles.dayText,
                selectedDate === item ? styles.selectedDateText : styles.unselectedDateText, // Change text color dynamically
              ]}
            >
              {moment(item).format('D')}
            </Text>
            <Text
              style={[
                styles.dayText,
                selectedDate === item ? styles.selectedDateText : styles.unselectedDateText, // Change text color dynamically
              ]}
            >
              {moment(item).format('ddd').toUpperCase()}
            </Text>
          </Pressable>
        )}
      />

      {/* Meal Sections */}
      {(['Breakfast', 'Lunch', 'Dinner'] as Array<keyof Meals[string]>).map((meal, index) => (
        <View key={index} style={styles.mealSection}>
          <Text style={styles.mealTitle}>{meal}</Text>
          <Text style={styles.mealContent}>
            {meals[selectedDate]?.[meal as keyof Meals[string]] || `No ${meal} added for ${moment(selectedDate).format('MMMM D')}`}
          </Text>
          <Pressable style={styles.addButton} onPress={() => handleAddMeal(meal)}>
            <Text style={styles.addButtonText}>+ Add {meal}</Text>
          </Pressable>
        </View>
      ))}

      {/* MongoDB Connection Test Section */}
      <View style={styles.testSection}>
        <Text style={styles.testSectionTitle}>Backend Connection Test</Text>
        <Pressable 
          style={styles.testButton}
          onPress={testMongoConnection}
          disabled={testLoading}
        >
          <Text style={styles.testButtonText}>
            {testLoading ? 'Testing Connection...' : 'Test MongoDB Connection'}
          </Text>
        </Pressable>
        
        {testLoading && (
          <ActivityIndicator style={styles.testLoading} color="#6E2F2C" />
        )}
        
        {testResult !== '' && (
          <View style={styles.testResultContainer}>
            <Text style={styles.testResultText}>{testResult}</Text>
          </View>
        )}
      </View>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>{renderCalendar()}</View>
        </View>
      </Modal>

      {/* Meal Input Modal */}
      <Modal visible={showMealModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add {currentMealType}</Text>
            <TextInput
              style={styles.input}
              placeholder="Dish Name"
              placeholderTextColor="#A9A9A9"
              value={dishName}
              onChangeText={setDishName}
            />
            <TextInput
              style={styles.input}
              placeholder="Add Ingredient"
              placeholderTextColor="#A9A9A9"
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
            <Pressable style={styles.saveButton} onPress={() => saveMeal({ name: dishName, ingredients, calories: calories || 0 })}>
              <Text style={styles.saveButtonText}>Add Dish</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
  },
  profileText: {
    fontSize: 18,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  dateItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedDate: {
    backgroundColor: '#6E2F2C',
    borderRadius: 10,
    padding: 10,
  },
  selectedDateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  unselectedDateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  dayText: {
    fontSize: 12,
    color: '#A4A4A4',
  },
  mealSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  mealContent: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 5,
    paddingVertical: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
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
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#6E2F2C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    alignItems: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarNavText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E2F2C',
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
  },
  selectedCalendarDay: {
    backgroundColor: '#6E2F2C',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  selectedCalendarDayText: {
    color: 'white',
  },
  testSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
    elevation: 2,
  },
  testSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 15,
  },
  testButton: {
    backgroundColor: '#6E2F2C',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testLoading: {
    marginTop: 15,
  },
  testResultContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  testResultText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
});

export default Scheduler;