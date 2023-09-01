# SQL Editor


<img width="1433" alt="Screenshot 2023-08-22 at 2 27 08 PM" src="https://github.com/shreyT19/atlan-task-updated/assets/116892456/c6fceeae-bdbb-4b66-8eef-cac5ef3447a6">


## Features

### SQL Query Execution

The application provides a text area powered by CodeMirror where you can input your desired SQL query. After entering the query, simply click the "Run SQL" button to initiate its execution. The query results will be displayed below the query input area in a tabulated format.

### Search and Sorting

You can search and filter the data based on select options, allowing you to quickly find the information you need. Additionally, the table allows sorting of data by clicking on the table headers.

### Data Export

After executing a query and obtaining results, you can export the query results to a CSV format for easy data analysis and sharing.

### Query Execution

The application allows you to execute SQL queries against the provided data. This enables you to interact with the data and retrieve specific information based on your requirements.

## Technology Stack

- **React**
- **CodeMirror**: A versatile code editor component for web applications.
- **React-CSV library**

## Live Demo


https://github.com/shreyT19/atlan-task-updated/assets/116892456/802483cd-0bdd-4f36-b97e-7732e3501cbf


## Performance Optimizations

To ensure optimal performance, the following strategies have been implemented:

- **React.memo()**: Memoization of components to prevent unnecessary re-renders.
- **Context API**: Efficient data sharing among components.
- **useMemo()**: Memoization of computed values to avoid redundant calculations.
- **Lazy Loading**: Lazy loading of components to improve initial loading time.

## Measuring Performance

### Web Vitals Extension Data

<img width="555" alt="Screenshot 2023-08-22 at 2 16 46 PM" src="https://github.com/shreyT19/atlan-task-updated/assets/116892456/0cf054c8-1648-49a0-b010-e0381736f992">


### Lighthouse Reports

<img width="1434" alt="Screenshot 2023-08-22 at 2 16 23 PM" src="https://github.com/shreyT19/atlan-task-updated/assets/116892456/141d3373-fbca-45f5-a6e2-503df04d55b1">


- **Rendering Large Amount of Rows**: The application efficiently handles rendering a significant number of rows by implementing pagination and scrolling options in the table components, ensuring smooth performance.

