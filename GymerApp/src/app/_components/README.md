# Navigation Components

This directory contains React components for managing the application's navigation and layout structure, including the top navigation bar and footer.

## Components

### TopBar

This component serves as the main navigation header, providing user authentication controls and navigation links.

#### Features

- Dynamic routing based on authentication state
- Dark/light mode toggle
- User authentication buttons
- Dropdown menu for mobile navigation
- Active link state management

#### Example

```
import TopBar from './TopBar';

function Layout() {
  return (
    <TopBar />
  );
}
```

#### References

- `GymerApp/src/app/_components/TopBar.tsx`

### Home 

This component serves as the main landing page for RepIt, showcasing the platform's value proposition and core features. 
Includes: 
- Summary Section
- Why Choose RepIt Section
- Features Section

#### Example

```
import Home from './Home';

function App() {
  return (
    <main>
      <Home />
    </main>
  );
}
```

#### References

- `GymerApp/src/app/_components/Home.tsx`

### Features 

This component displays the key features of the RepIt application in a card-based layout.

#### Example 

```
import Features from './Features';

function HomePage() {
  return (
    <section>
      <Features />
    </section>
  );
}
```

#### References

- `GymerApp/src/app/_components/Features.tsx`

### Footer 

This component serves as the bottom navigation footer, providing authentication of our 'company'.

#### Example 

```
import Footer from './Footer';

function HomePage() {
  return (
    <section>
      <Footer />
    </section>
  );
}
```

#### References

- `GymerApp/src/app/_components/Footer.tsx`
