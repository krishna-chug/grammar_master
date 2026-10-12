// Grammar Game Data: Subject & Predicate Quest
// 4 Levels with 5 questions each, exact point rewards per user specification.

const GAME_DATA = {
  levels: [
    {
      id: "easy",
      name: "Level Easy",
      pointsPerQuestion: 2,
      badgeColor: "#10b981",
      difficultyDescription: "Simple sentence structures with straightforward subjects and action/linking predicates.",
      questions: [
        {
          id: "easy-1",
          sentence: "The playful puppy wagged its tail excitedly.",
          tokens: ["The", "playful", "puppy", "wagged", "its", "tail", "excitedly."],
          subjectIndices: [0, 1, 2],
          predicateIndices: [3, 4, 5, 6],
          subjectText: "The playful puppy",
          predicateText: "wagged its tail excitedly.",
          explanation: "Who wagged its tail? 'The playful puppy' is the complete subject. What did the puppy do? 'wagged its tail excitedly.' is the complete predicate."
        },
        {
          id: "easy-2",
          sentence: "My older sister plays soccer every Saturday morning.",
          tokens: ["My", "older", "sister", "plays", "soccer", "every", "Saturday", "morning."],
          subjectIndices: [0, 1, 2],
          predicateIndices: [3, 4, 5, 6, 7],
          subjectText: "My older sister",
          predicateText: "plays soccer every Saturday morning.",
          explanation: "'My older sister' tells who is performing the action (Subject). 'plays soccer every Saturday morning' describes her action and when she does it (Predicate)."
        },
        {
          id: "easy-3",
          sentence: "The bright yellow sun warmed the cold playground.",
          tokens: ["The", "bright", "yellow", "sun", "warmed", "the", "cold", "playground."],
          subjectIndices: [0, 1, 2, 3],
          predicateIndices: [4, 5, 6, 7],
          subjectText: "The bright yellow sun",
          predicateText: "warmed the cold playground.",
          explanation: "'The bright yellow sun' is the complete subject including its descriptive adjectives. 'warmed the cold playground' contains the verb and direct object (Predicate)."
        },
        {
          id: "easy-4",
          sentence: "A sneaky little squirrel hid three acorns under the oak tree.",
          tokens: ["A", "sneaky", "little", "squirrel", "hid", "three", "acorns", "under", "the", "oak", "tree."],
          subjectIndices: [0, 1, 2, 3],
          predicateIndices: [4, 5, 6, 7, 8, 9, 10],
          subjectText: "A sneaky little squirrel",
          predicateText: "hid three acorns under the oak tree.",
          explanation: "'A sneaky little squirrel' is who performed the hiding (Subject). 'hid three acorns under the oak tree' expresses the action and location (Predicate)."
        },
        {
          id: "easy-5",
          sentence: "Three curious kittens explored the dark basement.",
          tokens: ["Three", "curious", "kittens", "explored", "the", "dark", "basement."],
          subjectIndices: [0, 1, 2],
          predicateIndices: [3, 4, 5, 6],
          subjectText: "Three curious kittens",
          predicateText: "explored the dark basement.",
          explanation: "'Three curious kittens' tells who is doing the exploring (Subject). 'explored the dark basement' tells what they explored (Predicate)."
        }
      ]
    },
    {
      id: "medium",
      name: "Level Medium",
      pointsPerQuestion: 5,
      badgeColor: "#f59e0b",
      difficultyDescription: "Compound subjects, compound predicates, and introductory prepositional phrases.",
      questions: [
        {
          id: "med-1",
          sentence: "The clever detective and his loyal dog searched the dusty attic.",
          tokens: ["The", "clever", "detective", "and", "his", "loyal", "dog", "searched", "the", "dusty", "attic."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6],
          predicateIndices: [7, 8, 9, 10],
          subjectText: "The clever detective and his loyal dog",
          predicateText: "searched the dusty attic.",
          explanation: "This sentence contains a compound subject joined by 'and': 'The clever detective and his loyal dog'. The complete predicate is 'searched the dusty attic.'"
        },
        {
          id: "med-2",
          sentence: "The talented chef baked fresh bread and decorated chocolate cakes.",
          tokens: ["The", "talented", "chef", "baked", "fresh", "bread", "and", "decorated", "chocolate", "cakes."],
          subjectIndices: [0, 1, 2],
          predicateIndices: [3, 4, 5, 6, 7, 8, 9],
          subjectText: "The talented chef",
          predicateText: "baked fresh bread and decorated chocolate cakes.",
          explanation: "'The talented chef' is the subject. The sentence has a compound predicate containing two actions joined by 'and': 'baked fresh bread and decorated chocolate cakes.'"
        },
        {
          id: "med-3",
          sentence: "Across the misty lake sailed a magnificent wooden schooner.",
          tokens: ["Across", "the", "misty", "lake", "sailed", "a", "magnificent", "wooden", "schooner."],
          subjectIndices: [5, 6, 7, 8],
          predicateIndices: [0, 1, 2, 3, 4],
          subjectText: "a magnificent wooden schooner.",
          predicateText: "Across the misty lake sailed",
          explanation: "Inverted order! In this sentence, the predicate comes before the subject. What sailed? 'a magnificent wooden schooner' (Subject). What did it do and where? 'Across the misty lake sailed' (Predicate)."
        },
        {
          id: "med-4",
          sentence: "Both my caring aunt and my generous uncle visit us every summer.",
          tokens: ["Both", "my", "caring", "aunt", "and", "my", "generous", "uncle", "visit", "us", "every", "summer."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          predicateIndices: [8, 9, 10, 11],
          subjectText: "Both my caring aunt and my generous uncle",
          predicateText: "visit us every summer.",
          explanation: "'Both my caring aunt and my generous uncle' forms a complete correlative compound subject. 'visit us every summer' is the complete predicate."
        },
        {
          id: "med-5",
          sentence: "In the middle of the crowded square stood a historic marble fountain.",
          tokens: ["In", "the", "middle", "of", "the", "crowded", "square", "stood", "a", "historic", "marble", "fountain."],
          subjectIndices: [8, 9, 10, 11],
          predicateIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          subjectText: "a historic marble fountain.",
          predicateText: "In the middle of the crowded square stood",
          explanation: "Another inverted sentence! What stood in the square? 'a historic marble fountain' (Subject). The complete predicate begins with the adverbial prepositional phrases and verb: 'In the middle of the crowded square stood'."
        }
      ]
    },
    {
      id: "hard",
      name: "Level Hard",
      pointsPerQuestion: 10,
      badgeColor: "#ec4899",
      difficultyDescription: "Noun clauses as subjects, infinitive/gerund phrases, and complex inverted clauses.",
      questions: [
        {
          id: "hard-1",
          sentence: "Whoever left the laboratory door unlocked overnight must answer to the director.",
          tokens: ["Whoever", "left", "the", "laboratory", "door", "unlocked", "overnight", "must", "answer", "to", "the", "director."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6],
          predicateIndices: [7, 8, 9, 10, 11],
          subjectText: "Whoever left the laboratory door unlocked overnight",
          predicateText: "must answer to the director.",
          explanation: "Here, an entire noun clause ('Whoever left the laboratory door unlocked overnight') functions as the complete subject of the modal verb phrase 'must answer'."
        },
        {
          id: "hard-2",
          sentence: "To master classical piano at a world-class level requires thousands of hours of practice.",
          tokens: ["To", "master", "classical", "piano", "at", "a", "world-class", "level", "requires", "thousands", "of", "hours", "of", "practice."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          predicateIndices: [8, 9, 10, 11, 12, 13],
          subjectText: "To master classical piano at a world-class level",
          predicateText: "requires thousands of hours of practice.",
          explanation: "The complete subject is an infinitive phrase: 'To master classical piano at a world-class level'. The complete predicate begins at the main verb 'requires' and continues to the end."
        },
        {
          id: "hard-3",
          sentence: "Deep beneath the crumbling ruins of the castle lay centuries of forgotten treasure.",
          tokens: ["Deep", "beneath", "the", "crumbling", "ruins", "of", "the", "castle", "lay", "centuries", "of", "forgotten", "treasure."],
          subjectIndices: [9, 10, 11, 12],
          predicateIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          subjectText: "centuries of forgotten treasure.",
          predicateText: "Deep beneath the crumbling ruins of the castle lay",
          explanation: "Complex inverted order! The grammatical subject is 'centuries of forgotten treasure' (what was lying there). The entire fronted prepositional phrase chain and the verb 'lay' constitute the complete predicate."
        },
        {
          id: "hard-4",
          sentence: "Swimming across the freezing English Channel tests human endurance to its absolute limits.",
          tokens: ["Swimming", "across", "the", "freezing", "English", "Channel", "tests", "human", "endurance", "to", "its", "absolute", "limits."],
          subjectIndices: [0, 1, 2, 3, 4, 5],
          predicateIndices: [6, 7, 8, 9, 10, 11, 12],
          subjectText: "Swimming across the freezing English Channel",
          predicateText: "tests human endurance to its absolute limits.",
          explanation: "The complete subject is a gerund phrase ('Swimming across the freezing English Channel'). 'tests human endurance to its absolute limits' is the complete predicate."
        },
        {
          id: "hard-5",
          sentence: "Neither the research scientists nor the project manager who designed the safety system anticipated the error.",
          tokens: ["Neither", "the", "research", "scientists", "nor", "the", "project", "manager", "who", "designed", "the", "safety", "system", "anticipated", "the", "error."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          predicateIndices: [13, 14, 15],
          subjectText: "Neither the research scientists nor the project manager who designed the safety system",
          predicateText: "anticipated the error.",
          explanation: "The complete subject includes both correlative nouns and the restrictive relative clause modifying manager ('who designed the safety system'). The predicate is 'anticipated the error.'"
        }
      ]
    },
    {
      id: "impossible",
      name: "Level Impossible",
      pointsPerQuestion: 15,
      badgeColor: "#8b5cf6",
      difficultyDescription: "Very, very, very hard sentences with split predicates, negative adverbial fronting, and nested clauses!",
      questions: [
        {
          id: "imp-1",
          sentence: "Down through the cavernous marble corridors strode the newly appointed commander in austere silence.",
          tokens: ["Down", "through", "the", "cavernous", "marble", "corridors", "strode", "the", "newly", "appointed", "commander", "in", "austere", "silence."],
          subjectIndices: [7, 8, 9, 10],
          predicateIndices: [0, 1, 2, 3, 4, 5, 6, 11, 12, 13],
          subjectText: "the newly appointed commander",
          predicateText: "Down through the cavernous marble corridors strode ... in austere silence.",
          explanation: "Ultra-challenging split predicate! The subject ('the newly appointed commander') is nestled between the fronted directional verb phrase ('Down through the cavernous marble corridors strode') and the trailing adverbial phrase ('in austere silence'). Both surround the subject as part of the complete predicate."
        },
        {
          id: "imp-2",
          sentence: "That the ancient deciphered papyrus contains a lost dialogue of Aristotle astonishes contemporary classical scholars.",
          tokens: ["That", "the", "ancient", "deciphered", "papyrus", "contains", "a", "lost", "dialogue", "of", "Aristotle", "astonishes", "contemporary", "classical", "scholars."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          predicateIndices: [11, 12, 13, 14],
          subjectText: "That the ancient deciphered papyrus contains a lost dialogue of Aristotle",
          predicateText: "astonishes contemporary classical scholars.",
          explanation: "The entire subordinate clause introduced by 'That' serves as the complete nominal subject of the main verb 'astonishes'. 'astonishes contemporary classical scholars' is the complete predicate."
        },
        {
          id: "imp-3",
          sentence: "Seldom in the history of science had so audacious an hypothesis faced such intense skepticism.",
          tokens: ["Seldom", "in", "the", "history", "of", "science", "had", "so", "audacious", "an", "hypothesis", "faced", "such", "intense", "skepticism."],
          subjectIndices: [7, 8, 9, 10],
          predicateIndices: [0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 14],
          subjectText: "so audacious an hypothesis",
          predicateText: "Seldom in the history of science had ... faced such intense skepticism.",
          explanation: "Negative fronting inversion splits the predicate! The negative adverbial and auxiliary ('Seldom in the history of science had') precede the subject ('so audacious an hypothesis'), while the main verb and object ('faced such intense skepticism') follow it."
        },
        {
          id: "imp-4",
          sentence: "Not until midnight did the exhausted members of the diplomatic mission reach an agreement.",
          tokens: ["Not", "until", "midnight", "did", "the", "exhausted", "members", "of", "the", "diplomatic", "mission", "reach", "an", "agreement."],
          subjectIndices: [4, 5, 6, 7, 8, 9, 10],
          predicateIndices: [0, 1, 2, 3, 11, 12, 13],
          subjectText: "the exhausted members of the diplomatic mission",
          predicateText: "Not until midnight did ... reach an agreement.",
          explanation: "Subject-auxiliary inversion! The complete subject is 'the exhausted members of the diplomatic mission'. The complete predicate is split: 'Not until midnight did' at the start and 'reach an agreement' at the end."
        },
        {
          id: "imp-5",
          sentence: "Whatever evidence the forensic investigators uncover at the sanctuary will determine the defendant's fate.",
          tokens: ["Whatever", "evidence", "the", "forensic", "investigators", "uncover", "at", "the", "sanctuary", "will", "determine", "the", "defendant's", "fate."],
          subjectIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          predicateIndices: [9, 10, 11, 12, 13],
          subjectText: "Whatever evidence the forensic investigators uncover at the sanctuary",
          predicateText: "will determine the defendant's fate.",
          explanation: "A complex free relative clause ('Whatever evidence the forensic investigators uncover at the sanctuary') acts as the complete subject for the verb phrase 'will determine the defendant's fate'."
        }
      ]
    }
  ]
};
