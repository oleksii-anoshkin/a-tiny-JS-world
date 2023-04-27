import { print } from "./js/lib.js";

("use strict");

/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/oleksii-anoshkin/a-tiny-JS-world
   Web app: https://oleksii-anoshkin.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Classes
// General
class Inhabitant {
  constructor(name, species, legs) {
    this.name = name;
    this.species = species;
    this.legs = legs;
  }

  createHtmlForInhabitantCard() {
    return KEYS_OF_ALL_INHABITANT_PROPERTIES.map((propKey, index) => {
      if (this[propKey] !== undefined) {
        return index === IMG_PROP_INDEX
          ? this[propKey]
          : `<${KEY_TAG} class="${KEY_CLASS}">${propKey}: <${TEXT_TAG} class="${TEXT_CLASS}">${this[propKey]}</${TEXT_TAG}></${KEY_TAG}>`;
      }
    }).join(" ");
  }
}

// Humans
class Human extends Inhabitant {
  constructor(name, gender, icon) {
    super(name, HUMAN_DATA.species, HUMAN_DATA.legs);
    this.hands = HUMAN_DATA.hands;
    this.gender = gender;
    this.icon = icon;
  }

  get saying() {
    return HUMAN_DATA.saying;
  }
}

class Male extends Human {
  constructor(name) {
    super(name, MALE_DATA.gender, MALE_DATA.icon);
  }

  get friends() {
    return INHABITANTS.filter(
      (inhabitant) =>
        (inhabitant instanceof Dog || inhabitant instanceof Female) &&
        !(inhabitant instanceof Catwoman)
    )
      .map((inhabitant) => inhabitant.name)
      .join(", ");
  }
}

class Female extends Human {
  constructor(name) {
    super(name, FEMALE_DATA.gender, FEMALE_DATA.icon);
  }

  get friends() {
    return INHABITANTS.filter(
      (inhabitant) =>
        (inhabitant instanceof Cat || inhabitant instanceof Male) &&
        !(inhabitant instanceof Catwoman)
    )
      .map((inhabitant) => inhabitant.name)
      .join(", ");
  }
}

class Catwoman extends Female {
  constructor(name) {
    super(name);
  }

  get saying() {
    return CATS_DATA.saying;
  }

  get friends() {
    return INHABITANTS.filter((inhabitant) => inhabitant instanceof Cat)
      .map((inhabitant) => inhabitant.name)
      .join(", ");
  }
}

// Animals
class Animal extends Inhabitant {
  constructor(name, kind, saying) {
    super(name, ANIMAL_DATA.species, ANIMAL_DATA.legs);
    this.tail = ANIMAL_DATA.tail;
    this.icon = ANIMAL_DATA.icon;
    this.kind = kind;
    this.saying = saying;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, DOGS_DATA.kind, DOGS_DATA.saying);
  }

  get friends() {
    return INHABITANTS.filter((inhabitant) => inhabitant instanceof Male)
      .map((inhabitant) => inhabitant.name)
      .join(", ");
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, CATS_DATA.kind, CATS_DATA.saying);
  }

  get friends() {
    return INHABITANTS.filter(
      (inhabitant) =>
        inhabitant instanceof Female || inhabitant instanceof Catwoman
    )
      .map((inhabitant) => inhabitant.name)
      .join(", ");
  }
}

// Inhabitants constants
const INHABITANTS_NAMES_KEY = "names";
const INHABITANTS_CLASS_KEY = "className";
const KEYS_OF_ALL_INHABITANT_PROPERTIES = [
  "icon",
  "name",
  "species",
  "gender",
  "kind",
  "legs",
  "hands",
  "tail",
  "saying",
  "friends",
];

// Humans constants
const HUMAN_DATA = {
  species: "human",
  legs: 2,
  hands: 2,
  saying: "Hello!",
};

const MALE_DATA = {
  gender: "male",
  names: ["Bob", "Jonatan", "Bill"],
  icon: '<span class="material-symbols-outlined">man</span>',
  className: Male,
};

const FEMALE_DATA = {
  gender: "female",
  names: ["Samanta", "Barbara", "Marta"],
  icon: '<span class="material-symbols-outlined">woman</span>',
  className: Female,
};

const CATWOMAN_DATA = {
  names: ["Julia"],
  className: Catwoman,
};

// Animals constants
const ANIMAL_DATA = {
  species: "animal",
  legs: 4,
  tail: 1,
  icon: '<span class="material-symbols-outlined">pets</span>',
};

const DOGS_DATA = {
  kind: "dog",
  names: ["Archie", "Casper"],
  saying: "Woof!",
  className: Dog,
};

const CATS_DATA = {
  kind: "cat",
  names: ["Colin", "Leona"],
  saying: "Meow!",
  className: Cat,
};

// HTML constants
const CARD_CLASS = "inhabitant__card";
const CARD_TAG = "div";
const KEY_TAG = "span";
const KEY_CLASS = "inhabitant__text";
const TEXT_CLASS = "normal";
const TEXT_TAG = "span";
const IMG_PROP_INDEX = 0;

// Add inhabitians function
function addAllInhabitiansToArray(namesKey, classKey, ...datas) {
  return datas
    .map((data) =>
      data[`${namesKey}`].map((name) => new data[`${classKey}`](name))
    )
    .flat();
}

// Create inhabitians array
const INHABITANTS = addAllInhabitiansToArray(
  INHABITANTS_NAMES_KEY,
  INHABITANTS_CLASS_KEY,
  MALE_DATA,
  FEMALE_DATA,
  DOGS_DATA,
  CATS_DATA,
  CATWOMAN_DATA
);

// ======== OUTPUT ========
INHABITANTS.forEach((inhabitian) =>
  print(`${inhabitian.createHtmlForInhabitantCard()}`, CARD_CLASS, CARD_TAG)
);

/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
