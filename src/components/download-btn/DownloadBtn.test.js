import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DownloadBtn from './DownloadBtn';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('DownloadBtn Component', () => {
  const mockStore = configureStore();
  const store = mockStore({
    expense: {
      expenses: [
        // Add sample expense data if needed
        { id: '1', amount: 50, category: 'food', description: 'Groceries' },
        { id: '2', amount: 30, category: 'transportation', description: 'Gas' },
      ],
    },
  });

  test('renders a button with the text "Download Expenses"', () => {
    render(
      <Provider store={store}>
        <DownloadBtn />
      </Provider>
    );

    // Check if the button with the specified text exists
    const downloadButton = screen.getByText('Download Expenses');
    expect(downloadButton).toBeInTheDocument();
  });

 
});