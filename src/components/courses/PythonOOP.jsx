import CourseCompletion from '../CourseCompletion';
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/PythonBasics.css';

const OOP_MODULES = [
  {
    id: 1,
    title: "Introduction to Classes",
    theory: `
      <h3>Object-Oriented Programming 🎯</h3>
      <p>Classes are blueprints for creating objects. They bundle data and functionality together!</p>
      <h4>Class Basics:</h4>
      <pre>class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return "Woof!"

my_dog = Dog("Buddy")
print(my_dog.name)  # "Buddy"</pre>
      <h4>Key Concepts:</h4>
      <ul>
        <li><code>class</code> - Keyword to define a class</li>
        <li><code>__init__</code> - Constructor (initializes object)</li>
        <li><code>self</code> - Refers to the instance</li>
        <li><strong>Attributes</strong> - Data stored in object</li>
        <li><strong>Methods</strong> - Functions inside class</li>
      </ul>
    `,
    task: "Create a class `Person` with `__init__` that takes `name` parameter and stores it in `self.name`. Create instance with 'Alice' and print the name.",
    starterCode: "# Define Person class\n\n# Create instance and print name\n",
    solution: `class Person:
    def __init__(self, name):
        self.name = name

person = Person("Alice")
print(person.name)`,
    expectedOutput: "Alice",
    hint: "Use class Person: with __init__(self, name): and self.name = name"
  },
  {
    id: 2,
    title: "Class Methods",
    theory: `
      <h3>Methods - Class Functions 🔧</h3>
      <p>Methods are functions that belong to a class and operate on its data.</p>
      <h4>Method Syntax:</h4>
      <pre>class Calculator:
    def __init__(self, value):
        self.value = value

    def add(self, num):
        return self.value + num

calc = Calculator(10)
result = calc.add(5)  # 15</pre>
      <h4>Important:</h4>
      <ul>
        <li>First parameter is always <code>self</code></li>
        <li>Methods can access attributes with <code>self.attribute</code></li>
        <li>Methods can call other methods</li>
        <li>Return values like regular functions</li>
      </ul>
      <h4>Example:</h4>
      <pre>class Greeter:
    def greet(self):
        return "Hello!"</pre>
    `,
    task: "Create a class `Counter` with `__init__` setting `self.count = 0` and a method `increment()` that returns `self.count + 1`. Create instance, call increment(), and print.",
    starterCode: "# Define Counter class\n\n# Create instance, call method, print\n",
    solution: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        return self.count + 1

counter = Counter()
result = counter.increment()
print(result)`,
    expectedOutput: "1",
    hint: "Method increment(self): returns self.count + 1"
  },
  {
    id: 3,
    title: "Class Attributes",
    theory: `
      <h3>Instance vs Class Attributes 📦</h3>
      <p>Instance attributes are unique to each object, while class attributes are shared.</p>
      <h4>Instance Attributes:</h4>
      <pre>class Student:
    def __init__(self, name, grade):
        self.name = name      # Instance attribute
        self.grade = grade    # Instance attribute

student1 = Student("Alice", "A")
student2 = Student("Bob", "B")</pre>
      <h4>Class Attributes:</h4>
      <pre>class Student:
    school = "Python Academy"  # Class attribute

    def __init__(self, name):
        self.name = name

print(Student.school)  # "Python Academy"</pre>
      <h4>When to Use:</h4>
      <ul>
        <li><strong>Instance:</strong> Data specific to each object</li>
        <li><strong>Class:</strong> Data shared by all objects</li>
      </ul>
    `,
    task: "Create a class `Book` with `__init__` taking `title` parameter and storing in `self.title`. Create instance with 'Python Guide' and print the title.",
    starterCode: "# Define Book class\n\n# Create instance and print title\n",
    solution: `class Book:
    def __init__(self, title):
        self.title = title

book = Book("Python Guide")
print(book.title)`,
    expectedOutput: "Python Guide",
    hint: "Store the title parameter in self.title"
  },
  {
    id: 4,
    title: "Methods with Parameters",
    theory: `
      <h3>Methods with Multiple Parameters 🎲</h3>
      <p>Methods can accept parameters just like regular functions!</p>
      <h4>Syntax:</h4>
      <pre>class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def scale(self, factor):
        self.width = self.width * factor
        self.height = self.height * factor

rect = Rectangle(5, 10)
print(rect.area())  # 50</pre>
      <h4>Key Points:</h4>
      <ul>
        <li>Parameters come after <code>self</code></li>
        <li>Can modify instance attributes</li>
        <li>Can return calculated values</li>
      </ul>
    `,
    task: "Create class `Calculator` with `__init__` taking `value` (store in self.value) and method `multiply(num)` returning self.value * num. Create with 5, call multiply(3), print.",
    starterCode: "# Define Calculator class\n\n# Create instance, multiply by 3, print\n",
    solution: `class Calculator:
    def __init__(self, value):
        self.value = value

    def multiply(self, num):
        return self.value * num

calc = Calculator(5)
result = calc.multiply(3)
print(result)`,
    expectedOutput: "15",
    hint: "multiply(self, num): return self.value * num"
  },
  {
    id: 5,
    title: "String Representation",
    theory: `
      <h3>String Representation __str__ 🔤</h3>
      <p>The <code>__str__</code> method controls how your object appears when printed!</p>
      <h4>Default Behavior:</h4>
      <pre>class Person:
    def __init__(self, name):
        self.name = name

person = Person("Alice")
print(person)  # <__main__.Person object at 0x...></pre>
      <h4>Custom String:</h4>
      <pre>class Person:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Person: {self.name}"

person = Person("Alice")
print(person)  # "Person: Alice"</pre>
      <h4>Benefits:</h4>
      <ul>
        <li>Readable output for debugging</li>
        <li>User-friendly display</li>
        <li>Professional code</li>
      </ul>
    `,
    task: "Create class `Car` with `__init__` taking `brand` (store in self.brand) and `__str__` method returning the brand. Create with 'Toyota' and print the object.",
    starterCode: "# Define Car class with __str__\n\n# Create and print\n",
    solution: `class Car:
    def __init__(self, brand):
        self.brand = brand

    def __str__(self):
        return self.brand

car = Car("Toyota")
print(car)`,
    expectedOutput: "Toyota",
    hint: "__str__(self): return self.brand"
  }
];

const PythonOOP = ({ walletAddress, onComplete, connex }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const module = OOP_MODULES[currentModule];
  const progress = (completedModules.size / OOP_MODULES.length) * 100;

  const handleSuccess = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    setShowHint(false);

    if (newCompleted.size === OOP_MODULES.length) {
      setCourseCompleted(true);
      // Don't call onComplete() here - let user claim reward first
    }
  };

  const goToNextModule = () => {
    if (currentModule < OOP_MODULES.length - 1) {
      setCurrentModule(currentModule + 1);
      setShowHint(false);
    }
  };

  const goToPreviousModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setShowHint(false);
    }
  };

  if (courseCompleted) {
    return (
      <CourseCompletion
        courseName="Python OOP"
        courseId="python-oop"
        moduleCount={PYTHON_OOP_MODULES.length}
        walletAddress={walletAddress}
        connex={connex}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="python-course">
      <div className="course-header">
        <div className="course-title">
          <h1>Python OOP Basics</h1>
          <p>Interactive Course</p>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {completedModules.size} / {OOP_MODULES.length} modules
          </span>
        </div>
      </div>

      <div className="module-nav">
        {OOP_MODULES.map((mod, idx) => (
          <button
            key={mod.id}
            className={`module-nav-item ${idx === currentModule ? 'active' : ''} ${completedModules.has(idx) ? 'completed' : ''}`}
            onClick={() => setCurrentModule(idx)}
          >
            <span className="module-number">{idx + 1}</span>
            {completedModules.has(idx) && <span className="check-mark">✓</span>}
          </button>
        ))}
      </div>

      <div className="course-content">
        <div className="theory-panel">
          <div className="panel-header">
            <h2>
              <span className="module-badge">Module {module.id}</span>
              {module.title}
            </h2>
          </div>
          <div className="theory-content" dangerouslySetInnerHTML={{ __html: module.theory }} />

          <div className="task-section">
            <h3>📝 Your Task:</h3>
            <p>{module.task}</p>
            {showHint && (
              <div className="hint-box">
                <strong>💡 Hint:</strong> {module.hint}
              </div>
            )}
            {!showHint && (
              <button className="hint-btn" onClick={() => setShowHint(true)}>
                Show Hint
              </button>
            )}
          </div>
        </div>

        <div className="editor-panel">
          <div className="panel-header">
            <h3>Code Editor</h3>
          </div>
          <CodeEditor
            starterCode={module.starterCode}
            expectedOutput={module.expectedOutput}
            onSuccess={handleSuccess}
            isCompleted={completedModules.has(currentModule)}
          />
        </div>
      </div>

      <div className="course-footer">
        <button className="nav-btn prev-btn" onClick={goToPreviousModule} disabled={currentModule === 0}>
          ← Previous
        </button>
        <div className="module-status">
          {completedModules.has(currentModule) ? (
            <span className="status-complete">✓ Module Complete</span>
          ) : (
            <span className="status-incomplete">Complete the exercise to continue</span>
          )}
        </div>
        <button
          className="nav-btn next-btn"
          onClick={goToNextModule}
          disabled={!completedModules.has(currentModule) || currentModule === OOP_MODULES.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PythonOOP;
