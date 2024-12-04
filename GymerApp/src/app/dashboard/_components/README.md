# Dashboard Components

This directory contains React components for managing and displaying the dashboard interface, including AI interactions, data visualization, and equipment management.

## Components

### AIQuestionInputBar

This component provides an interactive input interface for AI-powered questions and responses.

#### Features

- Text input area for questions
- Form submission handling
- Input validation
- Custom submit button behavior

#### Example

```
import { AIQuestionInputBar } from './AIQuestionInputBar';

function Dashboard() {
  return (
    <AIQuestionInputBar
      value={questionText}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
```

#### References

- `GymerApp/src/app/facilities/_components/AIQuestionInputBar.tsx`

### AIQuestionContainer

This component manages the AI question-answer interaction flow.

#### Features
- Question state management
- Answer display
- Asynchronous response handling
- Question submission processing

#### Example

```
import { AIQuestionContainer } from './AIQuestionContainer';

function AIDashboard() {
  return <AIQuestionContainer />;
}
```

#### References

- `GymerApp/src/app/facilities/_components/AIQuestionContainer.tsx`

### DataVisualization

This component renders statistical data in various chart formats.

#### Features

- Multiple chart type support (bar/line)
- Customizable chart configuration
- Responsive design
- Interactive tooltips
- Default data handling
  
#### Example

```
import { DataVisualization } from './DataVisualization';

function Analytics() {
  return (
    <DataVisualization
      type="bar"
      data={analyticsData}
      config={chartConfig}
    />
  );
}
```

#### References

- `GymerApp/src/app/facilities/_components/DataVisualization.tsx`
