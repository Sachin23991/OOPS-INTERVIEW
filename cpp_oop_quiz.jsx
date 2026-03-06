import { useState, useEffect } from "react";

const questions = [
  // Cluster 1
  { id: "Q01", cluster: "Foundational OOP Semantics", q: "What represents a concrete instance of a class in C++ memory?", options: ["A polymorphic function", "A global variable", "An object", "A reference pointer"], answer: 2, explanation: "A class is merely a blueprint. An object is the physical instantiation of that blueprint in RAM — it occupies actual memory." },
  { id: "Q02", cluster: "Foundational OOP Semantics", q: "Which of the following is categorically NOT a foundational pillar of OOP?", options: ["Compilation", "Inheritance", "Polymorphism", "Encapsulation"], answer: 0, explanation: "Compilation is a language-agnostic process. The 3 pillars of OOP are Encapsulation, Inheritance, and Polymorphism." },
  { id: "Q03", cluster: "Foundational OOP Semantics", q: "What is the fundamental compiler-level difference between a struct and a class in C++?", options: ["Structs cannot contain functions", "Struct members are public by default; class members are private by default", "Classes cannot undergo inheritance", "Structs consume no stack memory"], answer: 1, explanation: "C++ retained struct for C compatibility (public default), while class enforces OOP security (private default). Structs CAN have functions and constructors in C++." },
  { id: "Q04", cluster: "Foundational OOP Semantics", q: "Which specific keyword is used to define an object blueprint in C++?", options: ["object", "struct", "class", "template"], answer: 2, explanation: "The 'class' keyword defines a blueprint (type) from which objects are instantiated." },
  { id: "Q05", cluster: "Foundational OOP Semantics", q: "How many primary access visibility specifiers are native to C++ OOP?", options: ["1", "2", "3", "4"], answer: 2, explanation: "C++ has exactly 3: public, private, and protected." },
  { id: "Q06", cluster: "Foundational OOP Semantics", q: "Which feature of OOP is explicitly designed to ensure strict state security and data hiding?", options: ["Inheritance", "Encapsulation", "Abstraction", "Dynamic Dispatch"], answer: 1, explanation: "Encapsulation physically binds data with its operating functions using access specifiers to prevent arbitrary external modification." },
  { id: "Q07", cluster: "Foundational OOP Semantics", q: "What is the technical term for creating objects from a class blueprint during runtime?", options: ["Compilation", "Execution", "Instantiation", "Serialization"], answer: 2, explanation: "Instantiation is the act of creating a concrete object from a class blueprint, allocating actual memory." },
  { id: "Q08", cluster: "Foundational OOP Semantics", q: "Which statement most accurately defines encapsulation?", options: ["Defining global variables", "Binding data and the functions that operate on them into a single unit", "Hiding interface details", "Inheriting behavior"], answer: 1, explanation: "Encapsulation = data + methods bundled together, with access controlled via specifiers." },
  { id: "Q09", cluster: "Foundational OOP Semantics", q: "Which of the following defines abstraction in C++ architectural design?", options: ["Binding data variables", "Inheriting from an abstract base class", "Hiding internal implementation algorithms and exposing only necessary interfaces", "Data encryption"], answer: 2, explanation: "Abstraction reduces cognitive load by hiding complex internals behind simplified public interfaces." },
  { id: "Q10", cluster: "Foundational OOP Semantics", q: "What is the minimum memory size for an object from a completely empty class in C++?", options: ["0 bytes", "1 byte", "4 bytes", "8 bytes"], answer: 1, explanation: "The C++ standard requires a non-zero size (1 byte) so every object has a unique memory address. Zero bytes would destroy pointer arithmetic." },

  // Cluster 2
  { id: "Q11", cluster: "Constructors & Destructors", q: "What is the primary operational mandate of a constructor in C++?", options: ["To destroy an object", "To initialize an object's data members at the exact moment of creation", "To copy an object", "To allocate static memory"], answer: 1, explanation: "Constructors initialize data members at the precise moment an object is created." },
  { id: "Q12", cluster: "Constructors & Destructors", q: "Which of the following is strictly NOT a valid type of constructor in C++?", options: ["Virtual constructor", "Default constructor", "Copy constructor", "Parameterized constructor"], answer: 0, explanation: "Virtual constructors are impossible! The vptr (needed for virtual dispatch) is initialized DURING construction — the object doesn't exist yet to have a vptr." },
  { id: "Q13", cluster: "Constructors & Destructors", q: "In a C++ inheritance hierarchy, which constructor executes FIRST when a derived class object is instantiated?", options: ["Derived class constructor", "Base class constructor", "Both execute simultaneously", "Depends on access specifiers"], answer: 1, explanation: "The base class constructor executes first to build the memory foundation the derived class depends upon." },
  { id: "Q14", cluster: "Constructors & Destructors", q: "What is the strict order of execution for destructors in an inheritance hierarchy?", options: ["Base to Derived", "Derived to Base", "Random order", "Parallel execution"], answer: 1, explanation: "Destructors run bottom-up (Derived → Base), the reverse of construction. This ensures derived resources are cleaned up before the base is destroyed." },
  { id: "Q15", cluster: "Constructors & Destructors", q: "What is the declared return type of a standard C++ constructor?", options: ["void", "int", "A pointer to the object", "Constructors do not possess any return type, not even void"], answer: 3, explanation: "Constructors have NO return type — not even void. This is a unique language rule in C++." },
  { id: "Q16", cluster: "Constructors & Destructors", q: "Which constructor type is used to instantiate a new object as an exact duplicate of an existing object?", options: ["Default constructor", "Parameterized constructor", "Copy constructor", "Move constructor"], answer: 2, explanation: "The copy constructor creates a new object by copying an existing one: ClassName(const ClassName& obj)." },
  { id: "Q17", cluster: "Constructors & Destructors", q: "What critical operation does a compiler-generated default copy constructor perform?", options: ["A deep copy of all members", "A shallow, member-wise copy", "No copy is performed", "Dynamic memory allocation"], answer: 1, explanation: "The default copy constructor does a shallow (member-wise literal) copy — it copies pointer addresses, NOT the data they point to!" },
  { id: "Q18", cluster: "Constructors & Destructors", q: "What is the primary peril of relying on a shallow copy when dealing with dynamically allocated memory?", options: ["High stack consumption", "Double-free memory corruption upon object destruction", "Compile-time syntax errors", "Execution latency"], answer: 1, explanation: "Two objects pointing to the same heap memory: when both destruct, the same address is freed twice → catastrophic double-free corruption crash." },
  { id: "Q19", cluster: "Constructors & Destructors", q: "Are constructors implicitly inherited by a derived class in standard C++98/03?", options: ["Yes", "No", "Only default constructors", "Only parameterized constructors"], answer: 1, explanation: "In C++98/03, constructors are NOT inherited. C++11 introduced 'using Base::Base;' to explicitly inherit them." },
  { id: "Q20", cluster: "Constructors & Destructors", q: "What occurs during compilation if an application attempts to instantiate a class with a private constructor from an external function?", options: ["Successful instantiation", "Memory leak", "Compile-time access error", "Runtime crash"], answer: 2, explanation: "Private constructors are only callable from within the class itself (used in Singleton pattern). External access → compile-time error." },

  // Cluster 3
  { id: "Q21", cluster: "Inheritance Architecture", q: "Which feature of OOP allows a class to acquire the properties and memory footprint of another existing class?", options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"], answer: 3, explanation: "Inheritance enables code reuse by letting a derived class absorb the properties and behaviors of a base class." },
  { id: "Q22", cluster: "Inheritance Architecture", q: "Which inheritance type permits a single derived class to inherit directly from multiple separate base classes?", options: ["Multilevel inheritance", "Hierarchical inheritance", "Multiple inheritance", "Hybrid inheritance"], answer: 2, explanation: "Multiple inheritance: class D : public B, public C {}. One class, multiple parents." },
  { id: "Q23", cluster: "Inheritance Architecture", q: "What term describes an architectural combination of multiple and multilevel inheritance?", options: ["Hierarchical inheritance", "Hybrid inheritance", "Single inheritance", "Poly-inheritance"], answer: 1, explanation: "Hybrid inheritance mixes multiple inheritance types (e.g., multiple + multilevel), often producing the Diamond Problem." },
  { id: "Q24", cluster: "Inheritance Architecture", q: "Which members of a base class are strictly inaccessible to the derived class?", options: ["Public members", "Protected members", "Private members", "Static members"], answer: 2, explanation: "Private members are sealed to the class that declared them. Use 'protected' if derived classes need access." },
  { id: "Q25", cluster: "Inheritance Architecture", q: "In C++, which inheritance mode causes public and protected base members to act strictly as private in the derived class?", options: ["Public inheritance", "Private inheritance", "Protected inheritance", "Virtual inheritance"], answer: 1, explanation: "Private inheritance collapses the base's public API into the derived class's private scope, blocking further inheritance of those interfaces." },
  { id: "Q26", cluster: "Inheritance Architecture", q: "What is the notorious 'Diamond Problem' in C++ multiple inheritance?", options: ["A severe memory leak", "An ambiguity error when a class inherits from two classes sharing a common base", "An issue with uninitialized pointers", "A template resolution failure"], answer: 1, explanation: "Diamond: A→B, A→C, D inherits B&C. Two copies of A exist in D's memory. Any access to A's members is ambiguous — compiler can't choose B path or C path." },
  { id: "Q27", cluster: "Inheritance Architecture", q: "Which C++ feature is explicitly engineered to resolve the Diamond Problem?", options: ["Virtual Destructors", "Virtual Inheritance", "Pure Virtual Functions", "Friend Classes"], answer: 1, explanation: "Virtual inheritance (class B : virtual public A) instructs the compiler to maintain only ONE shared instance of A, eliminating ambiguity via a vbase_ptr." },
  { id: "Q28", cluster: "Inheritance Architecture", q: "What is 'Object Slicing' in standard C++?", options: ["Memory fragmentation on the heap", "Dividing object memory into parallel threads", "The loss of derived class attributes when assigning a derived object to a base class object by value", "None of the above"], answer: 2, explanation: "When a derived object is assigned to a base object by value, only base-class data fits in the allocation. Derived-specific state is physically 'sliced off' and lost." },
  { id: "Q29", cluster: "Inheritance Architecture", q: "Which access specifier allows data access strictly within the class itself and its explicitly declared friend functions?", options: ["Public", "Private", "Protected", "Internal"], answer: 1, explanation: "Private members are accessible only inside the class body and by explicitly declared friend functions/classes." },
  { id: "Q30", cluster: "Inheritance Architecture", q: "Which access specifier allows access within the class and its derived classes, but denies external access?", options: ["Public", "Private", "Protected", "Global"], answer: 2, explanation: "Protected is the middle ground: accessible within the class and its children, but invisible to external code." },

  // Cluster 4
  { id: "Q31", cluster: "Polymorphism & Virtual Tables", q: "Which statement most accurately defines polymorphism in OOP?", options: ["Ability to inherit from multiple abstract classes", "Capability to use the identical interface to process varying underlying data types", "Hiding structural implementation details", "Operator overloading strictly"], answer: 1, explanation: "Polymorphism = one interface, many behaviors. A base pointer can call different implementations depending on the actual object type at runtime." },
  { id: "Q32", cluster: "Polymorphism & Virtual Tables", q: "Which of the following achieves static (compile-time) polymorphism?", options: ["Function overloading", "Operator overloading", "Templates", "All of the mentioned"], answer: 3, explanation: "Function overloading, operator overloading, and templates all resolve at compile time → all are static polymorphism." },
  { id: "Q33", cluster: "Polymorphism & Virtual Tables", q: "How is dynamic (run-time) polymorphism strictly implemented in C++?", options: ["Through Friend functions", "Through standard inheritance", "Through Virtual Functions", "Through static casting"], answer: 2, explanation: "Runtime polymorphism requires the 'virtual' keyword. Without it, calls are resolved at compile time based on pointer type, not actual object type." },
  { id: "Q34", cluster: "Polymorphism & Virtual Tables", q: "What hidden data structures does the C++ compiler use to route run-time dynamic dispatch?", options: ["Linked Lists and Hash Maps", "Virtual Tables (v-tables) and Virtual Pointers (vptr)", "Binary Search Trees", "Stack pointers"], answer: 1, explanation: "The compiler creates a static v-table (array of function pointers) per class, and injects a hidden vptr into every polymorphic object to point to it." },
  { id: "Q35", cluster: "Polymorphism & Virtual Tables", q: "Which assertion is entirely factual regarding the architecture of a v-table?", options: ["A unique v-table is created for every object instantiated", "A single v-table is created per class and contains memory addresses of its virtual functions", "It stores constant member variables", "It is generated during runtime"], answer: 1, explanation: "One v-table per CLASS (not per object). Every object gets its own vptr that points to the shared class v-table. This is the memory optimization." },
  { id: "Q36", cluster: "Polymorphism & Virtual Tables", q: "Why is it an absolute necessity to declare base class destructors as virtual?", options: ["To ensure proper execution of derived class destructors when deleted via base pointer", "To allow function overriding in general", "To minimize heap memory usage", "To support template metaprogramming"], answer: 0, explanation: "Without virtual destructor: deleting a derived object via base pointer only calls the base destructor. Derived's destructor is skipped → memory leak of derived resources." },
  { id: "Q37", cluster: "Polymorphism & Virtual Tables", q: "What is the exact syntactical definition of a pure virtual function in standard C++?", options: ["A function declared with 'virtual' and appended with = 0;", "A virtual function with no parameters", "A function that cannot be inherited", "An empty virtual destructor"], answer: 0, explanation: "Syntax: virtual void func() = 0; The '= 0' makes it pure virtual, forcing derived classes to provide an implementation." },
  { id: "Q38", cluster: "Polymorphism & Virtual Tables", q: "What strict constraint automatically transforms a class into an Abstract Class?", options: ["It contains solely private data members", "It possesses no constructors or destructors", "It contains at least one pure virtual function, making it impossible to instantiate directly", "It is declared with the 'final' keyword"], answer: 2, explanation: "Any class with ≥1 pure virtual function becomes abstract. The compiler forbids direct instantiation, enforcing interface contracts on inheritors." },
  { id: "Q39", cluster: "Polymorphism & Virtual Tables", q: "What happens if a developer executes a virtual function call directly inside a constructor?", options: ["Undefined behavior crashes the application", "The derived class version is executed dynamically", "The virtual mechanism is ignored and the base class version is executed statically", "A compile-time error is thrown"], answer: 2, explanation: "During base constructor execution, the vptr hasn't been updated to the derived v-table yet. Virtual calls resolve statically to the base version — a classic trap!" },
  { id: "Q40", cluster: "Polymorphism & Virtual Tables", q: "Which modern C++11 specifier ensures a virtual function cannot be overridden in further downstream derivations?", options: ["static", "const", "final", "sealed"], answer: 2, explanation: "'final' seals a virtual function from further overriding. 'sealed' is a C# concept, not C++." },

  // Cluster 5
  { id: "Q41", cluster: "Static, Friends & RTTI", q: "What defines a friend function in C++?", options: ["A function declared inside another function", "An external non-member function granted explicit authorization to access private and protected members of a class", "A function reserved strictly for templates", "A virtual pointer mechanism"], answer: 1, explanation: "Friend functions are NOT class members. They're external functions granted access to private/protected data — no 'this' pointer, invoked without dot/arrow operator." },
  { id: "Q42", cluster: "Static, Friends & RTTI", q: "Which statement is categorically true regarding friend functions?", options: ["They are fully integrated member functions of the class", "They are NOT members of the class but are associated with it", "They violate all memory safety protocols", "They cannot be overloaded"], answer: 1, explanation: "Friend functions exist outside the class scope. They receive objects as explicit parameters rather than via 'this'." },
  { id: "Q43", cluster: "Static, Friends & RTTI", q: "What is the defining characteristic of a static member variable in a C++ class?", options: ["It cannot be modified after initialization", "It is shared identically among all object instances, allocating only one block of memory", "It is always allocated on the stack", "It is completely inaccessible"], answer: 1, explanation: "Static member variables belong to the CLASS, not individual objects. One memory allocation shared across all instances." },
  { id: "Q44", cluster: "Static, Friends & RTTI", q: "Can a static member function directly access standard non-static data members?", options: ["Yes, without restriction", "No, because a static function lacks a discrete hidden 'this' pointer", "Only protected members", "Only within derived classes"], answer: 1, explanation: "Static functions have no 'this' pointer — they operate on class-level state only. Without 'this', there's no way to identify which object's non-static members to access." },
  { id: "Q45", cluster: "Static, Friends & RTTI", q: "What is the primary functional use of the hidden 'this' pointer in C++ class mechanics?", options: ["To call constructors manually", "To initialize static variables globally", "To refer to the specific memory address of the current calling object instance", "To allocate heap memory dynamically"], answer: 2, explanation: "'this' is a hidden pointer passed to every non-static member function, pointing to the object that invoked the function." },
  { id: "Q46", cluster: "Static, Friends & RTTI", q: "What does the acronym RTTI stand for in C++ systems programming?", options: ["Real-Time Type Interface", "Run-Time Type Information", "Run-Time Template Integration", "Random Time Thread Interruption"], answer: 1, explanation: "RTTI = Run-Time Type Information. It enables type identification and safe downcasting in polymorphic hierarchies." },
  { id: "Q47", cluster: "Static, Friends & RTTI", q: "Which C++ RTTI casting operator safely downcasts base pointers to derived pointers in a polymorphic hierarchy?", options: ["static_cast", "reinterpret_cast", "const_cast", "dynamic_cast"], answer: 3, explanation: "dynamic_cast verifies the actual object type at runtime via RTTI in the v-table. static_cast forces the cast blindly → undefined behavior if wrong type." },
  { id: "Q48", cluster: "Static, Friends & RTTI", q: "What occurs if a dynamic_cast applied to a POINTER fails at runtime?", options: ["The application instantly crashes", "It throws a std::bad_cast exception", "It safely returns a nullptr", "It defaults to a static cast"], answer: 2, explanation: "Failed dynamic_cast on a pointer → nullptr. The developer should always check: if (ptr) { ... } before using the result." },
  { id: "Q49", cluster: "Static, Friends & RTTI", q: "What occurs if a dynamic_cast applied to a REFERENCE fails at runtime?", options: ["It returns a null reference", "It throws a std::bad_cast exception", "It causes undefined behavior", "It returns false"], answer: 1, explanation: "References cannot be null in C++, so a failed dynamic_cast on a reference must throw std::bad_cast. Use try-catch to handle it." },
  { id: "Q50", cluster: "Static, Friends & RTTI", q: "Which C++ keyword is used under RTTI to extract type information of an object at runtime?", options: ["sizeof", "typeof", "typeid", "auto"], answer: 2, explanation: "typeid(obj) returns a std::type_info object with the type name. Works with RTTI enabled. 'typeof' is not standard C++." },

  // BONUS - Important interview questions not in PDF
  { id: "B01", cluster: "⭐ Bonus Interview Questions", q: "What is the Rule of Three in C++?", options: ["If you define 1 of: destructor/copy constructor/copy assignment, define all 3", "A class must have exactly 3 constructors", "3 access specifiers must always be used", "A virtual function must be overridden 3 times"], answer: 0, explanation: "The Rule of Three: if your class manages a resource (heap memory), you MUST define: destructor, copy constructor, AND copy assignment operator. Missing one leads to double-free or memory leaks." },
  { id: "B02", cluster: "⭐ Bonus Interview Questions", q: "What is the Rule of Five in Modern C++11?", options: ["A class must have 5 access modifiers", "Extending Rule of Three: also define move constructor and move assignment operator", "5 virtual functions are required", "Five inheritance levels maximum"], answer: 1, explanation: "C++11 adds move semantics. If you write any of the 5 special member functions, define all 5: destructor, copy ctor, copy assignment, move ctor, move assignment." },
  { id: "B03", cluster: "⭐ Bonus Interview Questions", q: "What is the difference between 'override' and 'virtual' keywords in C++11?", options: ["They are identical", "'override' explicitly tells compiler this function must override a base virtual function — catches typo errors at compile time", "'override' creates a new virtual table", "'virtual' is deprecated in C++11"], answer: 1, explanation: "Writing 'override' on a derived function causes a compile error if no matching virtual function exists in the base. This catches misspellings and signature mismatches." },
  { id: "B04", cluster: "⭐ Bonus Interview Questions", q: "Can a constructor be called explicitly on an already-constructed object?", options: ["Yes, using placement new", "No, constructors can never be called explicitly", "Yes, using this->Constructor()", "Yes, using the :: scope operator"], answer: 0, explanation: "Placement new allows constructing an object at a specific memory location: new(ptr) ClassName(args). Used in memory pools and custom allocators." },
  { id: "B05", cluster: "⭐ Bonus Interview Questions", q: "What is an Interface in C++ (it doesn't have a dedicated keyword)?", options: ["Any class with public members", "A class with ALL pure virtual functions and no data members — simulated interface", "A class with only static methods", "A typedef for a class"], answer: 1, explanation: "C++ has no 'interface' keyword. An interface is simulated by an abstract class with ONLY pure virtual functions and no data. Derived classes must implement everything." },
];

const CLUSTER_COLORS = {
  "Foundational OOP Semantics": "#00d4ff",
  "Constructors & Destructors": "#ff6b6b",
  "Inheritance Architecture": "#51cf66",
  "Polymorphism & Virtual Tables": "#ffd43b",
  "Static, Friends & RTTI": "#cc5de8",
  "⭐ Bonus Interview Questions": "#ff922b",
};

export default function CppQuiz() {
  const [screen, setScreen] = useState("home"); // home | quiz | result
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("All");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    let interval;
    if (timerActive && !answered && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && !answered) {
      handleAnswer(-1);
    }
    return () => clearInterval(interval);
  }, [timerActive, answered, timer]);

  const startQuiz = (filterCluster) => {
    const filtered = filterCluster === "All" ? questions : questions.filter(q => q.cluster === filterCluster);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setResults([]);
    setSelected(null);
    setAnswered(false);
    setStreak(0);
    setMaxStreak(0);
    setTimer(30);
    setTimerActive(true);
    setScreen("quiz");
  };

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setTimerActive(false);
    const q = quizQuestions[current];
    const correct = idx === q.answer;
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setMaxStreak(s => Math.max(s, newStreak));
    if (correct) setScore(s => s + 1);
    setResults(r => [...r, { ...q, selected: idx, correct }]);
  };

  const nextQuestion = () => {
    if (current + 1 >= quizQuestions.length) {
      setScreen("result");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
      setTimer(30);
      setTimerActive(true);
    }
  };

  const q = quizQuestions[current];
  const pct = quizQuestions.length > 0 ? ((current + (answered ? 1 : 0)) / quizQuestions.length) * 100 : 0;
  const clusters = ["All", ...Object.keys(CLUSTER_COLORS)];

  const getGrade = (s, t) => {
    const p = s / t;
    if (p >= 0.9) return { grade: "S", label: "C++ Master", color: "#ffd43b", emoji: "🏆" };
    if (p >= 0.75) return { grade: "A", label: "Senior Dev", color: "#51cf66", emoji: "🎯" };
    if (p >= 0.6) return { grade: "B", label: "Mid-Level Dev", color: "#00d4ff", emoji: "💪" };
    if (p >= 0.4) return { grade: "C", label: "Junior Dev", color: "#ff922b", emoji: "📚" };
    return { grade: "F", label: "Keep Practicing", color: "#ff6b6b", emoji: "🔁" };
  };

  // HOME
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6ff", fontFamily: "'Courier New', monospace", padding: "0" }}>
      <div style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #0a0a0f 60%, #0d0820 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px", maxWidth: "700px" }}>
          <div style={{ fontSize: "13px", letterSpacing: "6px", color: "#00d4ff", textTransform: "uppercase", marginBottom: "12px" }}>Interview Prep Engine</div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 58px)", fontWeight: "900", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: "1.1", fontFamily: "'Georgia', serif" }}>
            C++ OOP <span style={{ color: "#00d4ff" }}>Gauntlet</span>
          </h1>
          <p style={{ color: "#8888aa", fontSize: "16px", lineHeight: "1.7", margin: "0 0 8px" }}>
            55 interview-grade questions across 5 clusters + bonus round. Each wrong answer triggers a compiler-level diagnostic. How deep does your C++ knowledge go?
          </p>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
            {[["55", "Questions"], ["5", "Clusters"], ["30s", "Per Q"], ["Instant", "Feedback"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "#00d4ff" }}>{v}</div>
                <div style={{ fontSize: "11px", color: "#666699", textTransform: "uppercase", letterSpacing: "2px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cluster selector */}
        <div style={{ width: "100%", maxWidth: "800px", marginBottom: "40px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#666699", textAlign: "center", marginBottom: "16px", textTransform: "uppercase" }}>Select Quiz Mode</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {clusters.map(c => {
              const color = c === "All" ? "#00d4ff" : CLUSTER_COLORS[c];
              const count = c === "All" ? questions.length : questions.filter(q => q.cluster === c).length;
              return (
                <button key={c} onClick={() => startQuiz(c)} style={{
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${color}33`, borderRadius: "10px",
                  padding: "16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  color: "#e8e6ff", fontFamily: "'Courier New', monospace",
                }} onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.borderColor = color; }}
                   onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = `${color}33`; }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, marginBottom: "8px" }} />
                  <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "4px", color: c === "All" ? color : "#e8e6ff" }}>{c === "All" ? "🎲 Full Gauntlet" : c}</div>
                  <div style={{ fontSize: "11px", color: "#666699" }}>{count} questions</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ color: "#444466", fontSize: "12px", textAlign: "center", maxWidth: "500px" }}>
          Based on 50 interview-grade questions from the OOP Evaluation Engine PDF + 5 critical bonus questions on Rule of Three/Five, override keyword, placement new, and C++ interfaces.
        </div>
      </div>
    </div>
  );

  // QUIZ
  if (screen === "quiz" && q) {
    const clusterColor = CLUSTER_COLORS[q.cluster] || "#00d4ff";
    const timerPct = (timer / 30) * 100;
    const timerColor = timer > 15 ? "#51cf66" : timer > 7 ? "#ffd43b" : "#ff6b6b";

    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6ff", fontFamily: "'Courier New', monospace", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px" }}>

        {/* Top bar */}
        <div style={{ width: "100%", maxWidth: "720px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", color: "#666699" }}>
            <span style={{ color: "#e8e6ff", fontWeight: "700" }}>{current + 1}</span>/{quizQuestions.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {streak >= 3 && <div style={{ fontSize: "12px", color: "#ffd43b" }}>🔥 {streak} streak</div>}
            <div style={{ fontSize: "13px", color: "#51cf66" }}>✓ {score}</div>
            <div style={{ fontSize: "24px", fontWeight: "900", color: timerColor, minWidth: "36px", textAlign: "right" }}>{timer}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%", maxWidth: "720px", height: "4px", background: "#1a1a2e", borderRadius: "2px", marginBottom: "8px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${clusterColor}, #00d4ff)`, transition: "width 0.4s ease" }} />
        </div>

        {/* Timer bar */}
        <div style={{ width: "100%", maxWidth: "720px", height: "3px", background: "#1a1a2e", borderRadius: "2px", marginBottom: "28px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, transition: "width 1s linear" }} />
        </div>

        {/* Cluster tag */}
        <div style={{ width: "100%", maxWidth: "720px", marginBottom: "12px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: clusterColor, background: `${clusterColor}15`, padding: "4px 10px", borderRadius: "4px", border: `1px solid ${clusterColor}33` }}>
            {q.id} · {q.cluster}
          </span>
        </div>

        {/* Question */}
        <div style={{ width: "100%", maxWidth: "720px", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "clamp(17px, 3vw, 22px)", fontWeight: "700", lineHeight: "1.5", margin: "0", fontFamily: "'Georgia', serif", color: "#f0eeff" }}>{q.q}</h2>
        </div>

        {/* Options */}
        <div style={{ width: "100%", maxWidth: "720px", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isSelected = i === selected;
            let bg = "rgba(255,255,255,0.03)";
            let border = "rgba(255,255,255,0.1)";
            let textColor = "#ccccee";
            let icon = String.fromCharCode(65 + i);

            if (answered) {
              if (isCorrect) { bg = "rgba(81,207,102,0.12)"; border = "#51cf66"; textColor = "#51cf66"; icon = "✓"; }
              else if (isSelected && !isCorrect) { bg = "rgba(255,107,107,0.12)"; border = "#ff6b6b"; textColor = "#ff6b6b"; icon = "✗"; }
            }

            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={answered} style={{
                background: bg, border: `1.5px solid ${border}`, borderRadius: "10px",
                padding: "14px 18px", cursor: answered ? "default" : "pointer",
                textAlign: "left", display: "flex", alignItems: "center", gap: "14px",
                transition: "all 0.15s", color: textColor, fontFamily: "'Courier New', monospace", fontSize: "14px",
              }} onMouseEnter={e => { if (!answered) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = clusterColor; }}}
                 onMouseLeave={e => { if (!answered) { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = border; }}}>
                <span style={{ minWidth: "22px", fontWeight: "900", color: answered ? textColor : clusterColor }}>{icon}</span>
                <span style={{ lineHeight: "1.5" }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div style={{ width: "100%", maxWidth: "720px", marginBottom: "20px" }}>
            <button onClick={() => setShowExplanation(s => !s)} style={{ background: "none", border: `1px solid #333355`, color: "#888899", cursor: "pointer", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontFamily: "'Courier New', monospace", marginBottom: "10px" }}>
              {showExplanation ? "▲ Hide" : "▼ Show"} Diagnostic Explanation
            </button>
            {showExplanation && (
              <div style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "10px", padding: "16px", fontSize: "14px", lineHeight: "1.7", color: "#aaccee" }}>
                <span style={{ color: "#00d4ff", fontWeight: "700" }}>// DIAGNOSTIC: </span>{q.explanation}
              </div>
            )}
          </div>
        )}

        {answered && (
          <div style={{ width: "100%", maxWidth: "720px" }}>
            <button onClick={nextQuestion} style={{
              width: "100%", background: `linear-gradient(135deg, ${clusterColor}22, ${clusterColor}11)`,
              border: `1.5px solid ${clusterColor}`, color: clusterColor,
              padding: "14px", borderRadius: "10px", cursor: "pointer", fontSize: "14px",
              fontWeight: "700", fontFamily: "'Courier New', monospace", letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              {current + 1 >= quizQuestions.length ? "→ View Results" : "→ Next Question"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // RESULT
  if (screen === "result") {
    const { grade, label, color, emoji } = getGrade(score, quizQuestions.length);
    const wrongOnes = results.filter(r => !r.correct);

    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6ff", fontFamily: "'Courier New', monospace", padding: "40px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "720px" }}>
          {/* Score card */}
          <div style={{ textAlign: "center", marginBottom: "40px", padding: "40px", background: "rgba(255,255,255,0.02)", border: `1px solid ${color}33`, borderRadius: "16px" }}>
            <div style={{ fontSize: "72px", marginBottom: "8px" }}>{emoji}</div>
            <div style={{ fontSize: "80px", fontWeight: "900", color, lineHeight: "1", fontFamily: "'Georgia', serif" }}>{grade}</div>
            <div style={{ fontSize: "20px", color: "#aaaacc", marginBottom: "24px" }}>{label}</div>
            <div style={{ fontSize: "40px", fontWeight: "900", marginBottom: "8px" }}>
              <span style={{ color }}>{score}</span>
              <span style={{ color: "#444466", fontSize: "24px" }}>/{quizQuestions.length}</span>
            </div>
            <div style={{ fontSize: "14px", color: "#666699", marginBottom: "24px" }}>
              {Math.round((score / quizQuestions.length) * 100)}% correct · Max streak: {maxStreak} 🔥
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => startQuiz("All")} style={{ background: `${color}22`, border: `1px solid ${color}`, color, padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: "13px", fontWeight: "700", letterSpacing: "1px" }}>
                🔄 Retry Full Gauntlet
              </button>
              <button onClick={() => setScreen("home")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #333355", color: "#aaaacc", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: "13px" }}>
                ← Back to Menu
              </button>
            </div>
          </div>

          {/* Wrong answers review */}
          {wrongOnes.length > 0 && (
            <div>
              <div style={{ fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: "#666699", marginBottom: "16px" }}>
                ⚠ Review Missed Questions ({wrongOnes.length})
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {wrongOnes.map((r, i) => {
                  const cc = CLUSTER_COLORS[r.cluster] || "#00d4ff";
                  return (
                    <div key={i} style={{ background: "rgba(255,107,107,0.05)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: "10px", padding: "16px" }}>
                      <div style={{ fontSize: "11px", color: cc, marginBottom: "6px", letterSpacing: "2px" }}>{r.id} · {r.cluster}</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px", lineHeight: "1.5", color: "#ddd" }}>{r.q}</div>
                      <div style={{ fontSize: "13px", color: "#ff6b6b", marginBottom: "4px" }}>✗ Your answer: {r.selected === -1 ? "Time's up!" : r.options[r.selected]}</div>
                      <div style={{ fontSize: "13px", color: "#51cf66", marginBottom: "10px" }}>✓ Correct: {r.options[r.answer]}</div>
                      <div style={{ fontSize: "13px", color: "#8888aa", lineHeight: "1.6", background: "rgba(0,212,255,0.04)", padding: "10px", borderRadius: "6px", borderLeft: `3px solid ${cc}` }}>
                        <span style={{ color: "#00d4ff" }}>// </span>{r.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {wrongOnes.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#51cf66", fontSize: "18px" }}>
              🎉 Perfect Score! You got every single question right. You're a C++ OOP expert!
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
