# Unit testing for ict-op2022

## 1. testParseStringJson
 To test whether the method can convert Json(string) to 
 another format correctly or not? (String -> list of Map
 (key and value))
1. **Identify testable functions** : `parseJson`
2.
    - **Identify parameters** : `json(String)`
    - **return types** : `List`
    - **return values**: `List<Map<String,String>>`
    - **exceptional behavior** :``
3. **Model the input domain**(The characteristics developed for this test case using the techniques from Input Space Partitioning. You must create **at least** one interface-based characteristic and **at least** one functionality-based characteristic for each test case.)  
   Characteristics:

| Characteristics          | b1                     | b2                               | b3                    |
|--------------------------|------------------------|----------------------------------|-----------------------|
| String is empty          | True                   | False                            | -                     |
| String has key and value | no pair(key and value) | at least one pair(key and value) | has only key or value |
4. Combine partitions to define test requirements - use
   the 5 approaches to find combinations of values (ACoC, ECC, PWC, BCC, MBCC). 
You must apply the 5 approaches to your 10 unit test cases (thus each approach 
will be used in 2 unit test cases).  
   Approaches : ACoC  
   Test requirements :  2x3 = 6  
   Test cases: (True, No pair), (True, at least one pair),(True, has only key or value), 
(False, No pair), (False, at least one pair),(False, has only key or value),
5. Derive test values and expected values. These are the
   values that you have to use when you implement test cases in JUnit.

| Test                               | json                    | Expected result   |
|------------------------------------|-------------------------|-------------------|
| T1: (True, No pair)                |                         |                   |
| T2: (True, at least one pair)      |                         |                   |
| T3: (True, has only key or value)  |                         |                   |
| T4: (False, No pair)               | "{}"                    | [{}]              |
| T5: (False, at least one pair)     | "{"name" : "Nopparat"}" | [{name=Nopparat}] |
| T6: (False, has only key or value) | "{"Nopparat"}"          | null              |

