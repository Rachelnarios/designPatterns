# Factory Design pattern
* Depending on user a new monogodb object is created
* A factory design by definition is
```
Factory: Separates the instantiation of objects from their use. Makes it streamlined to create objects and can allow hiding of objects that there is no reason to know about.
```
* In this case, the user type is encapsulated from the person accessing the code and we can create many user and charity objects that have a random hash.
* userType() is called and from there it is decided whether it is a user or a charity and depending on that different functions get called
