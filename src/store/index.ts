// Simple state management store
interface AppState {
  user: any | null;
  theme: 'light' | 'dark';
  isAuthenticated: boolean;
}

class Store {
  private state: AppState = {
    user: null,
    theme: 'light',
    isAuthenticated: false,
  };

  private listeners: Array<() => void> = [];

  getState(): AppState {
    return { ...this.state };
  }

  setState(newState: Partial<AppState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Actions
  setUser(user: any): void {
    this.setState({ user, isAuthenticated: !!user });
  }

  logout(): void {
    this.setState({ user: null, isAuthenticated: false });
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.setState({ theme });
  }
}

export const store = new Store();
