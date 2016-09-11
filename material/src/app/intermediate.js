 // person.js
   'use strict';

   module.exports = class Person {
       constructor(firstName, lastName) {
           this.firstName = firstName;
           this.lastName = lastName;
       }

       return1() {
           return this.firstName;
       }
       return2() {
           return this.lastName;
       }
   };