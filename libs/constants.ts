export const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '24px']

export const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Trebuchet MS',
  'Tahoma',
  'Lucida Console',
  'Garamond',
  'Impact',
  'Comic Sans MS',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Ubuntu',
  'Raleway',
  'Inter',
]

export const themes = [
  { color: 'brown', id: '#795548' },
  { color: 'blue-gray', id: '#607D8B' },
  { color: 'gray', id: '#9E9E9E' },
  { color: 'deep-orange', id: '#FF5722' },
  { color: 'orange', id: '#FF9800' },
  { color: 'amber', id: '#FFC107' },
  { color: 'yellow', id: '#FFEB3B' },
  { color: 'lime', id: '#CDDC39' },
  { color: 'light-green', id: '#8BC34A' },
  { color: 'green', id: '#4CAF50' },
  { color: 'teal', id: '#009688' },
  { color: 'cyan', id: '#00BCD4' },
  { color: 'light-blue', id: '#03A9F4' },
  { color: 'blue', id: '#2196F3' },
  { color: 'indigo', id: '#3F51B5' },
  { color: 'deep-purple', id: '#673AB7' },
  { color: 'purple', id: '#9C27B0' },
  { color: 'pink', id: '#E91E63' },
  { color: 'red', id: '#F44336' },
]

export const stickieColor = [
  { name: 'brown', id: '#6D4C41', medium: '#5D4037', dark: '#3E2723', text: '#ffffff' },
  { name: 'red', id: '#E53935', medium: '#D32F2F', dark: '#B71C1C', text: '#ffffff' },
  { name: 'blue', id: '#1E88E5', medium: '#1976D2', dark: '#0D47A1', text: '#ffffff' },
  { name: 'green', id: '#43A047', medium: '#388E3C', dark: '#1B5E20', text: '#ffffff' },
  { name: 'yellow', id: '#FDD835', medium: '#FBC02D', dark: '#F9A825', text: '#000000' },
  { name: 'purple', id: '#8E24AA', medium: '#7B1FA2', dark: '#4A148C', text: '#ffffff' },
  { name: 'orange', id: '#FB8C00', medium: '#F57C00', dark: '#E65100', text: '#ffffff' },
  { name: 'pink', id: '#D81B60', medium: '#C2185B', dark: '#880E4F', text: '#ffffff' },
  { name: 'teal', id: '#00897B', medium: '#00796B', dark: '#004D40', text: '#ffffff' },
  { name: 'grey', id: '#757575', medium: '#616161', dark: '#424242', text: '#ffffff' },
]

export const stickies: any = [
  {
    id: Math.random() * 100 + new Date().getSeconds(),
    type: 'colored',
    found: false,
    content: '⚫️ Shortcuts <br/>Upper Case : cmd/ctrl + k<div>Lower Case : cmd/ctrl + L</div>',
    heading: 'Welcome to sticky notes',
    tags: ['tags', 'hello'],
    color: { name: 'brown', id: '#6D4C41', medium: '#5D4037', dark: '#3E2723', text: '#ffffff' },
    fontSize: '12px',
    fontFamily: 'Arial',
    position: { x: 150 + Math.random() * 100 + new Date().getSeconds(), y: 150 + Math.random() * 100 + new Date().getSeconds() },
    dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  },
]

// 'Here are some quotes that reflect brilliance, mastery, and corporate excellence, perfect for a boy standing confidently in a jacket and tie: Dressed for success, prepared for greatness. Mastery is not an act, but a habit of excellence. Confidence is the best outfit; wear it daily. Success is not just about looking the part, but being the part. A sharp mind matches a sharp suit—both lead to success. Greatness begins with the right mindset and the right attire. Excellence is not an accident; it’s a commitment to mastery. Style and skill go hand in hand; dress well, work smarter. Every great journey starts with a confident step in the right shoes. A true professional blends wisdom with elegance. Let me know if you need something more specific!',
