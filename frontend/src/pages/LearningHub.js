import React, { useState } from 'react';
import { BookOpen, Code, Search, ChevronRight, Star, Clock, Users, Play } from 'lucide-react';
import './LearningHub.css';

const LearningHub = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    { id: 'all', name: 'All Languages', icon: '📚', color: '#667eea' },
    { id: 'cpp', name: 'C++', icon: '⚡', color: '#00599C' },
    { id: 'java', name: 'Java', icon: '☕', color: '#ED8B00' },
    { id: 'python', name: 'Python', icon: '🐍', color: '#3776AB' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨', color: '#F7DF1E' }
  ];

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'basics', name: 'Basics' },
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'oop', name: 'OOP Concepts' },
    { id: 'advanced', name: 'Advanced Topics' }
  ];

  const tutorials = [
    // C++ Tutorials
    {
      id: 1,
      language: 'cpp',
      category: 'basics',
      title: 'C++ Introduction & Setup',
      description: 'Learn the basics of C++, setup development environment, and write your first program.',
      duration: '15 min',
      difficulty: 'Beginner',
      topics: ['Installation', 'Hello World', 'Variables', 'Data Types'],
      rating: 4.8,
      students: 15420,
      content: `
# C++ Introduction & Setup

## What is C++?
C++ is a powerful general-purpose programming language created by Bjarne Stroustrup as an extension of the C language.

## Key Features:
- Object-Oriented Programming
- Low-level memory manipulation
- High performance
- Rich library support

## Installation

### Windows:
1. Download MinGW or Visual Studio
2. Install the compiler
3. Set up PATH environment variable

### Linux:
\`\`\`bash
sudo apt-get update
sudo apt-get install g++
\`\`\`

### Mac:
\`\`\`bash
xcode-select --install
\`\`\`

## Your First C++ Program

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
\`\`\`

## Compile and Run:
\`\`\`bash
g++ hello.cpp -o hello
./hello
\`\`\`

## Variables and Data Types

\`\`\`cpp
int age = 25;           // Integer
double price = 99.99;   // Decimal
char grade = 'A';       // Character
string name = "John";   // String
bool isActive = true;   // Boolean
\`\`\`

## Practice Exercise:
Write a program that takes user input and displays a personalized greeting.
      `
    },
    {
      id: 2,
      language: 'cpp',
      category: 'data-structures',
      title: 'Arrays and Vectors in C++',
      description: 'Master arrays and vectors, the fundamental data structures in C++.',
      duration: '25 min',
      difficulty: 'Beginner',
      topics: ['Arrays', 'Vectors', 'Iteration', 'Common Operations'],
      rating: 4.7,
      students: 12340,
      content: `
# Arrays and Vectors in C++

## Arrays

### Declaration:
\`\`\`cpp
int numbers[5];  // Array of 5 integers
int scores[3] = {95, 87, 92};  // Initialized array
\`\`\`

### Accessing Elements:
\`\`\`cpp
scores[0] = 100;  // First element
cout << scores[1];  // Output: 87
\`\`\`

### Iterating:
\`\`\`cpp
for(int i = 0; i < 3; i++) {
    cout << scores[i] << " ";
}
\`\`\`

## Vectors (Dynamic Arrays)

### Include and Create:
\`\`\`cpp
#include <vector>
using namespace std;

vector<int> nums;  // Empty vector
vector<int> data = {1, 2, 3};  // Initialized
\`\`\`

### Common Operations:
\`\`\`cpp
nums.push_back(10);  // Add element
nums.pop_back();     // Remove last
nums.size();         // Get size
nums[0];            // Access element
nums.clear();       // Clear all
\`\`\`

### Iteration:
\`\`\`cpp
for(int num : nums) {
    cout << num << " ";
}
\`\`\`

## Practice Problems:
1. Find the maximum element in an array
2. Reverse an array
3. Remove duplicates from a vector
      `
    },

    // Python Tutorials
    {
      id: 3,
      language: 'python',
      category: 'basics',
      title: 'Python Fundamentals',
      description: 'Get started with Python - variables, data types, and basic operations.',
      duration: '20 min',
      difficulty: 'Beginner',
      topics: ['Variables', 'Data Types', 'Operators', 'Input/Output'],
      rating: 4.9,
      students: 25600,
      content: `
# Python Fundamentals

## Introduction
Python is a high-level, interpreted programming language known for its simplicity and readability.

## Installation
Visit python.org and download Python 3.x

## Your First Program
\`\`\`python
print("Hello, World!")
\`\`\`

## Variables and Data Types
\`\`\`python
# Numbers
age = 25
price = 19.99

# Strings
name = "Alice"
message = 'Hello'

# Boolean
is_active = True

# Lists
numbers = [1, 2, 3, 4, 5]

# Dictionaries
person = {"name": "John", "age": 30}
\`\`\`

## Basic Operations
\`\`\`python
# Arithmetic
result = 10 + 5
power = 2 ** 3

# String operations
full_name = "John" + " " + "Doe"
repeated = "Ha" * 3  # "HaHaHa"

# Comparison
is_equal = (5 == 5)  # True
is_greater = (10 > 5)  # True
\`\`\`

## Input and Output
\`\`\`python
name = input("Enter your name: ")
print(f"Hello, {name}!")
\`\`\`

## Practice:
Create a program that calculates the area of a rectangle.
      `
    },
    {
      id: 4,
      language: 'python',
      category: 'data-structures',
      title: 'Python Lists and Dictionaries',
      description: 'Deep dive into Python\'s most used data structures.',
      duration: '30 min',
      difficulty: 'Beginner',
      topics: ['Lists', 'Dictionaries', 'Sets', 'Tuples'],
      rating: 4.8,
      students: 18900,
      content: `
# Python Lists and Dictionaries

## Lists

### Creating Lists:
\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
\`\`\`

### List Operations:
\`\`\`python
fruits.append("grape")    # Add to end
fruits.insert(0, "mango") # Insert at position
fruits.remove("banana")   # Remove item
fruits.pop()              # Remove last
len(fruits)               # Length
fruits[0]                 # Access element
fruits[-1]                # Last element
\`\`\`

### List Slicing:
\`\`\`python
nums = [0, 1, 2, 3, 4, 5]
nums[1:4]     # [1, 2, 3]
nums[:3]      # [0, 1, 2]
nums[3:]      # [3, 4, 5]
nums[::2]     # [0, 2, 4]
\`\`\`

### List Comprehension:
\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\`

## Dictionaries

### Creating Dictionaries:
\`\`\`python
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}
\`\`\`

### Dictionary Operations:
\`\`\`python
person["age"]              # Access value
person["email"] = "a@b.com" # Add key-value
del person["city"]         # Delete key
person.keys()              # Get keys
person.values()            # Get values
person.items()             # Get key-value pairs
\`\`\`

### Iteration:
\`\`\`python
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## Practice:
1. Create a phonebook using dictionaries
2. Find common elements between two lists
      `
    },

    // Java Tutorials
    {
      id: 5,
      language: 'java',
      category: 'basics',
      title: 'Java Getting Started',
      description: 'Learn Java basics, syntax, and write your first Java program.',
      duration: '25 min',
      difficulty: 'Beginner',
      topics: ['JDK Setup', 'Syntax', 'Variables', 'Data Types'],
      rating: 4.6,
      students: 14200,
      content: `
# Java Getting Started

## What is Java?
Java is a popular object-oriented programming language known for "Write Once, Run Anywhere".

## Installation
1. Download JDK from Oracle
2. Set JAVA_HOME environment variable
3. Verify: \`java -version\`

## First Java Program
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Compile and Run:
\`\`\`bash
javac HelloWorld.java
java HelloWorld
\`\`\`

## Variables and Data Types
\`\`\`java
// Primitive types
int age = 25;
double price = 99.99;
char grade = 'A';
boolean isActive = true;

// Reference types
String name = "John";
int[] numbers = {1, 2, 3, 4, 5};
\`\`\`

## Basic Operators
\`\`\`java
int sum = 10 + 5;
int product = 10 * 5;
boolean result = (10 > 5);
String fullName = "John" + " " + "Doe";
\`\`\`

## Input and Output
\`\`\`java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
System.out.print("Enter name: ");
String name = scanner.nextLine();
System.out.println("Hello, " + name);
\`\`\`

## Practice:
Create a calculator program for basic operations.
      `
    },
    {
      id: 6,
      language: 'java',
      category: 'oop',
      title: 'Object-Oriented Programming in Java',
      description: 'Master OOP concepts: classes, objects, inheritance, and polymorphism.',
      duration: '40 min',
      difficulty: 'Intermediate',
      topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'],
      rating: 4.9,
      students: 11500,
      content: `
# Object-Oriented Programming in Java

## Classes and Objects

### Creating a Class:
\`\`\`java
public class Person {
    // Fields
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public void introduce() {
        System.out.println("Hi, I'm " + name);
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
\`\`\`

### Creating Objects:
\`\`\`java
Person person1 = new Person("Alice", 30);
person1.introduce();
\`\`\`

## Inheritance
\`\`\`java
public class Student extends Person {
    private String studentId;
    
    public Student(String name, int age, String id) {
        super(name, age);
        this.studentId = id;
    }
    
    @Override
    public void introduce() {
        super.introduce();
        System.out.println("Student ID: " + studentId);
    }
}
\`\`\`

## Polymorphism
\`\`\`java
Person p1 = new Person("Bob", 25);
Person p2 = new Student("Alice", 20, "S123");

p1.introduce();  // Person's method
p2.introduce();  // Student's overridden method
\`\`\`

## Practice:
Create a class hierarchy for different types of vehicles.
      `
    },

    // JavaScript Tutorials
    {
      id: 7,
      language: 'javascript',
      category: 'basics',
      title: 'JavaScript Essentials',
      description: 'Learn JavaScript fundamentals for web development.',
      duration: '20 min',
      difficulty: 'Beginner',
      topics: ['Variables', 'Functions', 'DOM', 'Events'],
      rating: 4.7,
      students: 22100,
      content: `
# JavaScript Essentials

## Introduction
JavaScript is a high-level, interpreted programming language primarily used to create 
interactive and dynamic features on websites. It enables web developers to control web page 
behaviors, manipulate content, respond to user interactions, and enhance the user experience. 
JavaScript, along with HTML and CSS, is one of the core technologies in front-end web 
development. 
Key Features of JavaScript 
1. Client-Side Scripting: JavaScript runs on the client side (in the user's web browser), 
which reduces server load and allows for responsive, interactive web pages. 
2. Lightweight and Interpreted: JavaScript is designed to be lightweight, and it‘s 
interpreted directly by browsers, meaning it doesn‘t need to be compiled beforehand. 
3. Event-Driven: JavaScript can respond to events like clicks, form submissions, and 
key presses, making it highly interactive. 
4. Object-Oriented Programming (OOP): JavaScript is object-oriented, allowing 
developers to create and manipulate objects for more structured and modular code. 
5. Dynamic Typing: JavaScript uses dynamic typing, meaning you don‘t need to define 
variable types explicitly (e.g., let x = 5 instead of specifying int x = 5). 
6. Platform-Independent: JavaScript can run on any device with a web browser, 
making it highly portable across operating systems and devices. 
JavaScript and Web Development 
JavaScript allows developers to create rich, dynamic web experiences by enabling 
interactivity that HTML and CSS alone cannot achieve. It can be used for various tasks, such 
as: 
 DOM Manipulation: JavaScript can access and manipulate the Document Object 
Model (DOM), allowing developers to change HTML structure, style, and content 
dynamically. 
 Form Validation: JavaScript helps validate form inputs, ensuring that users enter the 
correct information before submitting it to the server. 
 Animations: JavaScript can animate elements on a web page, from simple fades to 
complex movements. 
 AJAX and Fetch API: JavaScript enables asynchronous communication with the 
server, allowing for loading new content without refreshing the page. This is 
commonly used in modern web applications for a smoother user experience. 
 Creating Interactive Components: JavaScript is used to create dropdowns, modals, 
carousels, image sliders, and more. 
Basic Syntax of JavaScript 
JavaScript code can be embedded within HTML in two main ways: 
1. Inline JavaScript: Code is added directly within an HTML tag using the onclick, 
onmouseover, and similar attributes. 
html 
Copy code 
<button onclick="alert('Hello, World!')">Click Me</button> 
2. Internal JavaScript: Code is included within a <script> tag inside the HTML 
document. 
html 
Copy code 
<script> 
document.getElementById("demo").innerHTML = "Hello, JavaScript!"; 
</script> 
3. External JavaScript: JavaScript is written in a separate .js file and linked in the 
HTML document. 
html 
Copy code 
<script src="script.js"></script> 
Advantages of JavaScript 
 Interactive and Dynamic: Makes web pages interactive and responsive. 
 Fast and Lightweight: Runs on the client side, reducing server load. 
 Easy to Learn and Use: Has a simple syntax that is relatively beginner-friendly. 
 Cross-Platform Compatibility: Works on all modern browsers and devices. 
 Rich Ecosystem: JavaScript has a large ecosystem, including libraries (e.g., jQuery) 
and frameworks (e.g., React, Angular, Vue). 

## Variables
\`\`\`javascript
// Modern way (ES6+)
let age = 25;
const name = "John";

// Old way (avoid)
var price = 99.99;
\`\`\`

## Data Types
\`\`\`javascript
let num = 42;              // Number
let str = "Hello";         // String
let bool = true;           // Boolean
let arr = [1, 2, 3];      // Array
let obj = {key: "value"}; // Object
let nothing = null;        // Null
let notDefined;            // Undefined
\`\`\`

## Functions
\`\`\`javascript
// Function declaration
function greet(name) {
    return "Hello, " + name;
}

// Arrow function
const greet2 = (name) => {
    return \`Hello, \${name}\`;
};

// Short arrow function
const square = x => x * x;
\`\`\`

## Arrays
\`\`\`javascript
const fruits = ["apple", "banana", "orange"];

fruits.push("grape");      // Add to end
fruits.pop();              // Remove last
fruits.length;             // Get length
fruits[0];                 // Access element
fruits.includes("apple");  // Check existence

// Array methods
fruits.map(f => f.toUpperCase());
fruits.filter(f => f.length > 5);
fruits.forEach(f => console.log(f));
\`\`\`

## Objects
\`\`\`javascript
const person = {
    name: "Alice",
    age: 30,
    greet() {
        console.log(\`Hi, I'm \${this.name}\`);
    }
};

person.name;      // Access property
person.greet();   // Call method
\`\`\`

## Practice:
Create a to-do list using arrays and objects.
      `
    },
    {
      id: 8,
      language: 'javascript',
      category: 'advanced',
      title: 'Async JavaScript & Promises',
      description: 'Master asynchronous programming with callbacks, promises, and async/await.',
      duration: '35 min',
      difficulty: 'Advanced',
      topics: ['Callbacks', 'Promises', 'Async/Await', 'Fetch API'],
      rating: 4.8,
      students: 9800,
      content: `
# Async JavaScript & Promises

## Callbacks
\`\`\`javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData((data) => {
    console.log(data);
});
\`\`\`

## Promises
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Success!");
        } else {
            reject("Error!");
        }
    }, 1000);
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error));
\`\`\`

## Async/Await
\`\`\`javascript
async function getData() {
    try {
        const response = await fetch('api/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
\`\`\`

## Fetch API
\`\`\`javascript
// GET request
fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// POST request
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'John' })
})
    .then(res => res.json())
    .then(data => console.log(data));
\`\`\`

## Practice:
Create a weather app using a public API.
      `
    },

    // Algorithm Tutorials
    {
      id: 9,
      language: 'all',
      category: 'algorithms',
      title: 'Sorting Algorithms',
      description: 'Learn common sorting algorithms and their implementations.',
      duration: '45 min',
      difficulty: 'Intermediate',
      topics: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Time Complexity'],
      rating: 4.9,
      students: 16700,
      content: `
# Sorting Algorithms

## Bubble Sort
Time Complexity: O(n²)

### Python:
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
\`\`\`

### C++:
\`\`\`cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
\`\`\`

## Quick Sort
Time Complexity: O(n log n) average

### Python:
\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`

## Merge Sort
Time Complexity: O(n log n)

### Python:
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

## Practice:
Implement and compare the performance of different sorting algorithms.
      `
    },
    {
      id: 10,
      language: 'all',
      category: 'algorithms',
      title: 'Searching Algorithms',
      description: 'Master linear and binary search techniques.',
      duration: '30 min',
      difficulty: 'Beginner',
      topics: ['Linear Search', 'Binary Search', 'Search Optimization'],
      rating: 4.7,
      students: 19200,
      content: `
# Searching Algorithms

## Linear Search
Time Complexity: O(n)

### Python:
\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
\`\`\`

### C++:
\`\`\`cpp
int linearSearch(vector<int>& arr, int target) {
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] == target) {
            return i;
        }
    }
    return -1;
}
\`\`\`

## Binary Search
Time Complexity: O(log n)
**Note:** Array must be sorted!

### Python:
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
\`\`\`

### Java:
\`\`\`java
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
\`\`\`

## Recursive Binary Search
\`\`\`python
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
\`\`\`

## Practice:
Implement both iterative and recursive versions of binary search.
      `
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesLanguage = selectedLanguage === 'all' || tutorial.language === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesCategory && matchesSearch;
  });

  const [selectedTutorial, setSelectedTutorial] = useState(null);

  return (
    <div className="learning-hub">
      <div className="container">
        {!selectedTutorial ? (
          <>
            {/* Header */}
            <div className="hub-header">
              <div className="hub-title-section">
                <BookOpen size={48} className="hub-icon" />
                <div>
                  <h1 className="hub-title">Learning Hub</h1>
                  <p className="hub-subtitle">Master programming concepts with our comprehensive tutorials</p>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="hub-search">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="hub-filters">
              {/* Language Filter */}
              <div className="filter-section">
                <h3>Languages</h3>
                <div className="filter-buttons">
                  {languages.map(lang => (
                    <button
                      key={lang.id}
                      className={`filter-btn ${selectedLanguage === lang.id ? 'active' : ''}`}
                      onClick={() => setSelectedLanguage(lang.id)}
                      style={{
                        borderColor: selectedLanguage === lang.id ? lang.color : '#e2e8f0',
                        background: selectedLanguage === lang.id ? `${lang.color}15` : 'white'
                      }}
                    >
                      <span className="filter-icon">{lang.icon}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-section">
                <h3>Categories</h3>
                <div className="filter-buttons">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tutorial Cards */}
            <div className="tutorials-grid">
              {filteredTutorials.length > 0 ? (
                filteredTutorials.map(tutorial => (
                  <div key={tutorial.id} className="tutorial-card" onClick={() => setSelectedTutorial(tutorial)}>
                    <div className="tutorial-header">
                      <div className="tutorial-lang-badge" style={{ 
                        background: `${languages.find(l => l.id === tutorial.language)?.color}15`,
                        color: languages.find(l => l.id === tutorial.language)?.color
                      }}>
                        {languages.find(l => l.id === tutorial.language)?.icon} {languages.find(l => l.id === tutorial.language)?.name}
                      </div>
                      <div className={`difficulty-badge difficulty-${tutorial.difficulty.toLowerCase()}`}>
                        {tutorial.difficulty}
                      </div>
                    </div>

                    <h3 className="tutorial-title">{tutorial.title}</h3>
                    <p className="tutorial-description">{tutorial.description}</p>

                    <div className="tutorial-topics">
                      {tutorial.topics.map((topic, idx) => (
                        <span key={idx} className="topic-tag">{topic}</span>
                      ))}
                    </div>

                    <div className="tutorial-footer">
                      <div className="tutorial-stats">
                        <span><Clock size={16} /> {tutorial.duration}</span>
                        <span><Star size={16} fill="#fbbf24" color="#fbbf24" /> {tutorial.rating}</span>
                        <span><Users size={16} /> {tutorial.students.toLocaleString()}</span>
                      </div>
                      <button className="start-btn">
                        Start Learning <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <Code size={64} />
                  <h3>No tutorials found</h3>
                  <p>Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </>
        ) : (
          // Tutorial Detail View
          <div className="tutorial-detail">
            <button className="back-btn" onClick={() => setSelectedTutorial(null)}>
              ← Back to Learning Hub
            </button>

            <div className="tutorial-detail-header">
              <div>
                <h1>{selectedTutorial.title}</h1>
                <p>{selectedTutorial.description}</p>
              </div>
              <div className="tutorial-detail-meta">
                <div className="meta-item">
                  <Clock size={20} />
                  <span>{selectedTutorial.duration}</span>
                </div>
                <div className="meta-item">
                  <Star size={20} fill="#fbbf24" color="#fbbf24" />
                  <span>{selectedTutorial.rating}</span>
                </div>
                <div className="meta-item">
                  <Users size={20} />
                  <span>{selectedTutorial.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>

            <div className="tutorial-content">
              <div dangerouslySetInnerHTML={{ 
                __html: selectedTutorial.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
                    if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
                    if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
                    if (line.startsWith('```')) return '<pre><code>';
                    if (line === '```') return '</code></pre>';
                    if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`;
                    if (line.trim() === '') return '<br>';
                    return `<p>${line}</p>`;
                  })
                  .join('')
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;
