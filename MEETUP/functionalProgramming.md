## Imperative vs Declarative

**Imperative**: When your code says **How you do?**

**Declarative**: When your code says **what you do?**

## First Class Function

-   Functions can be treated like other values.
-   can be assigned to variables.
-   can be returned from other functions.
-   can be passed as arguments to other functions.

_NOTE:_ Arrow functions are not first-class functions

### Assigned to variables

    var foo = function foo(){
        console.log("Hello")
    }
    foo()

### Returned from other functions

    function foo(){
        function greet(){
            console.log("Hello")
        }

        return greet
    }
    foo()()

### Passed as arguments to functions

    function greet(){
        console.log("hello")
    }

    function foo(fn){
        fn()
    }
    foo(greet)

## IIFE

In the following ways an IIFE can be declared

    (function() { /* logic here */ })();
    (function() { /* logic here */ }());
    !function() { /* logic here */ }();
    ~function() { /* logic here */ }();
    +function() { /* logic here */ }();
    -function() { /* logic here */ }();

## Closure

-   Inner functions have access to its outer function
-   Inner functions remembers all variables from the outer function

_NOTE:_ Basically it is scope.

#### Asked in interviews

    Create an add function that accepts value like this add(1)(2)(3)? (related to first class, inner function)

    function add(x){
        return function(y){
            return function(z){
                return x + y + z
            }
        }
    }

    add(1)(2)(3) //Output: 6

_NOTE:_ The last inner function looks for x and y in the parent scope. It does not finds x in its parent scope so it looks for x in the parent scope of y.

#### Example

    function add(x){
        var z = 1
        return function(y){
                return x + y + z
            }
        }
    }

    add(1)(2) //Output: 4


    function add(x){
        var z = 1
        var a = 10
        return function(y){
                return x + y + z
            }
        }
    }

_NOTE:_ a is not in closure because it is not referred in the inner function

        function add(x){
        var z = 1
        a = 10
        return function(y){
                return x + y + z
            }
        }
    }

_NOTE:_ a is not in closure because it is in the global scope

## Method Chaining

Repeatedly calling one method one after another on an object, in one continuous line of code.

-   Chaining of methods is only present in objects

#### Example

    function Calculate(value){
        this.num = value
    }

    Calculate.prototype.add = function(value){
        this.num += value
        return this
    }

    Calculate.prototype.add = function(value){
        this.num -= value
        return this
    }

    Calculate.prototype.display = function(){
        conosle.log(this.num)
        return this
    }


    var calc = new Calculate()
    calc.add(1).add(2).add(3).display().subtract(2).display() //Output: 6 4

### Auto Boxing

## Higher order functions

-   A function that receives a function as an argument or returns the function as output.

-   A function accepting a function is a higher order function.

-   It is not a first class function.

_Examples:_ map, reduce, filter, bind.

_NOTE:_ bind is a higher order function that returns a function.

#### Example

        var list = [1,2,3,4,5]

        var double = function(item, i, arr){
            arr[i] = arr[i]*2
        }

        list.forEach(double)

        console.log(list)

_NOTE:_

-   **double** is a callback function
-   Never change the original array in functional JS.
-   Avoid mutability. Prefer Immutability.

#### Example

    var list = [1,2,3,4,5]

    var output = list.map((item) => item*2)

    console.log(output)

_NOTE:_

-   map() does not changes the origin data.
-   map(), reduce(), filter() prefers immutability.

#### Example

    var list = [1,2,3,4,5]

    var output = list.reduce((result, item) => result + item)

    console.log(output) //Output: 15 | 0+1 1+2 2+3 3+4 4+5--- 15

#### Example

    function greet(){
        console.log("Hey")
    }

    greet()
    greet().call()
    greet().apply()
    console.log(greet.bind()) // It will create a copy of the function and return it.

## Pure function

Pure functions are functions that accept an input and returns a value without modifying any data outside its scope(Side Effects). Its output or return value must depend on the input/arguments and pure functions must return a value.

#### Example

    function isEven(num){
        return num % 2 === 0
    }

    function isOdd(num){
        return !isEven(num)
    }

    console.log(isEven(2)) //Output: true
    console.log(isOdd(2))  //Output: false

### Side effects

#### Example

    function add(x, y){
        return x + y
    }

    var one = 1

    funtion increment(num){
        return num + one
    }

    console.log(increment(7)) // Output: 8

_NOTE:_

-   This function is not pure because it depends on a variable outside of its scope

#### Example

    function add(x, y){
        return x + y
    }


    funtion increment(num){
        var one = 1
        return num + one
    }

    console.log(increment(7)) // Output: 8

_NOTE:_

-   This is a pure function.

#### Example

    function add(x, y){
        return x + y
    }


    funtion increment(num){
        return add(num, 1)
    }

    console.log(increment(7)) // Output: 8

## Currying

Translating a function of N arguments to a 'tree' of N nested functions.

#### Example

    function add(x){
        return function(y){
            return function(z){
                return x + y + z
            }
        }
    }

    console.log(add(1)(2)(3)) //Output: 6

#### Example

    function add(x){
        return function(y){
            return function(z){
                return x + y + z
            }
        }
    }

    var increment = add(1)

    console.log(increment(10))

#### Example

    function multiply(x){
        return function(y){
                return x + y
        }
    }

    var double = multiply(2)
    var triple = multiply(3)

    console.log(double(5)) //Output: 10
    console.log(triple(5)) //Output: 15

#### Example

    function mod(modulo){
        return function(value){
            return value % modulo
        }
    }

    var modBy2 = mod(2)

    function isEven(num){
        return modBy2(num) === 0
    }

    console.log(isEven(4))

#### Example

    function _curry(f, n = f.length, bound = []){

    }

## Pipe / Composition

Process of combining two or more functions to produce a new function

-   Pipe goes from top to bottom
-   Composition goes from bottom to top

#### Example

    function pipe(){
        /*
        *   definition of pipe
        */
    }

    function split(separator){
        return function(value){
            return value.split(separator)
        }
    }

    function reverse(value){
        return value.reverse()
    }

    function join(combine){
        return function(value){
            return value.join(combine)
        }
    }

    var _reverse = pipe(
        split(""),
        reverse,
        join("")
    )
    /*
    *   If the user wants the reverse the value in upper case
    *
    *       var _reverse = pipe(
    *           split(""),
    *           reverse,
    *           join("")
    *       )
    */

    console.log(_reverse("Helloo")); //output: oolleH
