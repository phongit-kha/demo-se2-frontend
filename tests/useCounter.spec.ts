import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.setVal).toBe('function');
  });

  it('should increment count by val amount', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should increment count multiple times', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(3);
  });

  it('should increment count by custom val amount', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(5);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
    expect(result.current.val).toBe(5);
  });

  it('should handle multiple increments with different val values', () => {
    const { result } = renderHook(() => useCounter());
    
    // First increment with default val (1)
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
    
    // Change val to 3 and increment
    act(() => {
      result.current.setVal(3);
    });
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
    expect(result.current.val).toBe(3);
    
    // Change val to 10 and increment again
    act(() => {
      result.current.setVal(10);
    });
    
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(14);
    expect(result.current.val).toBe(10);
  });

  it('should handle negative val values', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(-2);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(-2);
    expect(result.current.val).toBe(-2);
  });

  it('should handle zero val value', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(0);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(0);
  });

  it('should update val without affecting count until increment is called', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(100);
    });
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(100);
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(100);
  });
  it('should update val and increment by new val', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(5);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
    expect(result.current.val).toBe(5);
  });
});