Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax. This helps simplify most reducer implementations.

Because Immer is itself an abstraction layer, it's important to understand why Redux Toolkit uses Immer, and how to use it correctly.