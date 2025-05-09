---
title: "COMP7404 Topic 2 Beyond Classical Search"
date: 2020-10-04T21:30:11.000+0800
lang: en
type: note
duration: 2min
---

# COMP7404 Computational Intelligence and Machine Learning

## Topic 2 Beyond Classical Search

**Planning vs Identification**

- Planing: sequence of actions
  - The path to the goal is the important thing
  - Paths have various costs, depths
  - Heuristics to guide, frontier to keep backups
- Identification: assignments to variables
  - The goal itself is important, not the path

_Local Search can find solutions faster for specific types of identification problems_

**Local Search**

- Evaluate and modify one current state rather than systematically explore paths from an initial state
- Suitable for problems were all that matters in the solution state and not the path cost to reach it
- Although local search algorithms are not systematic they have two advantages
  - Require very little memory
  - Often find reasonable solutions in large spaces

**Local Search Algorithm**

```sh
	Randomly initialize currentState
	If cost of currentState == 0 return currentState
	If min(cost(getNeighbors(currentState))) > cost(currentState)
		goto step 1 (we have reached a local minimum)
	Select cheapest neighbor as currentState and goto step2
```

**Example: 8-Queens**

- States
  - Each state has 8 queens on board, one per column
- Successors
  - All possible states generated by moving single queen to another square in the same column
- Cost function
  - Number of pairs of queens that are attacking each other, either directly and indirectly

**Constraint Satisfaction Problems**

CSPs use a factored representation for states

- A set of variables, each of which has a value

**Defining CSPs**

- A CSP consists of three components
  - A set of variables, X = {X1,...,Xn}
  - A set of domains, D = {D1,...,Dn}, where Di = {V1,...,Vk} for each variable Xi
  - A set of constraints C which specify allowable combinations of values
- To solve a CSP we need to define a state space
  - Each state is defined by an assignment of values to some or all variables {Xi = Vi, Xj = Vj,...}

**Solving CSPs**

- States are defined by the values assigned so far
- Initial state
  - Empty assignment {}
- Successor function
  - Assign a value to an unassigned variable
- Goal test
  - Current assignment is complete and consistent

**Solutiona to CSPs**

- Consistent - No constraints are violated
- Complete - Every variable is assigned

**Backtracking Search (The basic algorithm for solving CSPs)**

Idea

- Only consider assignments to a single variable at each point
- Only allow legal assignemnts to each point

DFS with these two ideas is called backtracking search

**Improving Backchecking**

Idea

- Forward checking (FC)
- Constraint propagation (AC-3)

**Filtering: Forward Checking**

- Filtering
  - Keep track of domains for unassigned variables and cross off bad options
- Forward checking
  - Cross off values that violate a constraint when added to the existing assignment

**Improving Backtracking Further**

- Variable Ordering
  - Minimum remaining values (MRV)
    - Choose the variable with the fewest legal left values in its domain
      - Most constraint variable
      - Fail-first heuristic
    - Tie-breaker among MRV variables
      - Degree Heuristic (Deg)
        - Choose the variable with the most constraints on remaining variables
- Value Ordering
  - Least constraining value (LCV)
    - Choose the value that rules out the fewest values in the remaining variables
