# useNotification Hook

This hook provides an enhanced notification system with improved styling using the Roobert font family.

## Usage

```typescript
import useNotification from "../hook/useNotification";

const MyComponent = () => {
  const notify = useNotification;
  
  const handleClick = () => {
    // Basic usage
    notify("This is a success message", "success");
    
    // With custom options
    notify("This is a warning", "warn", {
      autoClose: 5000,
      position: "top-left"
    });
  };
  
  return (
    <button onClick={handleClick}>
      Show Notification
    </button>
  );
};
```

## Parameters

1. `msg` (string) - The message to display
2. `type` (string) - Type of notification: "success", "error", "warn", "info"
3. `options` (object, optional) - Additional options to pass to react-toastify

## Default Options

- Position: top-right
- Auto close: 3000ms
- Progress bar: visible
- Close on click: true
- Draggable: true
- Pause on hover: true
- Theme: colored
- Font: Roobert PRO

## Styling

Notifications are styled with:
- Roobert PRO font family
- Gradient backgrounds based on notification type
- Rounded corners (0.75rem)
- Subtle shadows
- Responsive design for mobile devices