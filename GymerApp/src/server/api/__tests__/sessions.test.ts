import {
  getSessionHistory,
  createSession,
  deleteSession,
  updateSession,
  getAISessionsByDate,
  type Session,
  type AISession,
} from '../sessions';
import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import Anthropic from '@anthropic-ai/sdk';
import { sessionFormSchema } from '@/schema/session';

// Mock data
const mockSession: Session = {
  session_id: 'test-session-id',
  name: 'Test Session',
  type: 'workout',
  date: new Date('2024-03-20'),
  session_data: 'test data',
};

const mockAISession: AISession = {
  name: 'Test Session',
  type: 'workout',
  date: new Date('2024-03-20'),
  parsed_data: { test: 'data' },
};

describe('Session Functions', () => {
  const mockRedirectToSignIn = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockReturnValue({
      userId: 'test-user-id',
      redirectToSignIn: mockRedirectToSignIn,
    });
  });

  describe('getSessionHistory', () => {
    test('should return sessions for authenticated user', async () => {
      (db.query.SessionsTable.findMany as jest.Mock).mockResolvedValue([mockSession]);
      
      const result = await getSessionHistory();
      
      expect(result).toEqual([mockSession]);
      expect(db.query.SessionsTable.findMany).toHaveBeenCalledWith({
        where: expect.any(Function),
        orderBy: expect.any(Function),
        columns: { user_id: false },
      });
    });

    test('should return empty array and redirect when user is not authenticated', async () => {
      (auth as jest.Mock).mockReturnValue({ 
        userId: null, 
        redirectToSignIn: mockRedirectToSignIn 
      });
      
      const result = await getSessionHistory();
      
      expect(result).toEqual([]);
      expect(mockRedirectToSignIn).toHaveBeenCalled();
    });
  });

  describe('createSession', () => {
    const mockFormData = {
      type: 'workout',
      name: 'Test Session',
      date: new Date('2024-03-20'),
      session_data: 'test data',
    };

    const mockAnthropicResponse = {
      content: [{ type: 'text', text: '{"test": "data"}' }],
    };

    beforeEach(() => {
      (Anthropic as unknown as jest.Mock).mockImplementation(() => ({
        messages: {
          create: jest.fn().mockResolvedValue(mockAnthropicResponse),
        },
      }));
    });

    test('should create session successfully', async () => {
      const result = await createSession(mockFormData);

      expect(result).toBeUndefined();
      expect(db.insert).toHaveBeenCalledWith(expect.any(Object));
      expect(revalidatePath).toHaveBeenCalledWith('/sessions');
    });

    test('should handle form validation failure', async () => {
      (sessionFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        data: undefined,
      });

      const invalidFormData = {
        type: 'invalid-type',
        name: '',  // Invalid empty name
        date: 'invalid-date',
        session_data: null,
      };

      const result = await createSession(invalidFormData as any);

      expect(result).toEqual({ error: true });
      expect(db.insert).not.toHaveBeenCalled();
    });

    test('should handle unauthenticated user', async () => {
      (auth as jest.Mock).mockReturnValue({ 
        userId: null,
        redirectToSignIn: mockRedirectToSignIn
      });

      const result = await createSession(mockFormData);

      expect(result).toEqual({ error: true });
      expect(db.insert).not.toHaveBeenCalled();
    });

    test('should handle Anthropic API failure', async () => {
      (Anthropic as unknown as jest.Mock).mockImplementation(() => ({
        messages: {
          create: jest.fn().mockRejectedValue(new Error('API Error')),
        },
      }));

      const result = await createSession(mockFormData);

      expect(result).toEqual({ error: true });
      expect(db.insert).not.toHaveBeenCalled();
    });
  });

  describe('updateSession', () => {
    const mockFormData = {
      type: 'workout',
      name: 'Updated Session',
      date: new Date('2024-03-21'),
      session_data: 'updated test data',
    };

    const mockAnthropicResponse = {
      content: [{ type: 'text', text: '{"updated": "data"}' }],
    };

    beforeEach(() => {
      (Anthropic as unknown as jest.Mock).mockImplementation(() => ({
        messages: {
          create: jest.fn().mockResolvedValue(mockAnthropicResponse),
        },
      }));
  
      // Mock the complete DB update chain
      const mockWhere = jest.fn().mockResolvedValue(undefined);
      const mockSet = jest.fn().mockReturnValue({ where: mockWhere });
      (db.update as jest.Mock).mockReturnValue({
        set: mockSet,
      });
    });

    test('should update session successfully', async () => {
      // Ensure auth returns proper user ID
      (auth as jest.Mock).mockReturnValue({
        userId: 'test-user-id',
        redirectToSignIn: jest.fn(),
      });
  
      // Ensure schema validation passes
      (sessionFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: mockFormData,
      });

      const result = await updateSession('test-session-id', mockFormData);

      expect(result).toBeUndefined();
      expect(db.update).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalledWith('/sessions');
    });

    test('should handle form validation failure', async () => {
      (sessionFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        data: undefined,
      });

      const invalidFormData = {
        type: 'invalid-type',
        name: '',
        date: 'invalid-date',
        session_data: null,
      };

      const result = await updateSession('test-session-id', invalidFormData as any);

      expect(result).toEqual({ error: true });
      expect(db.update).not.toHaveBeenCalled();
    });

    test('should handle unauthenticated user', async () => {
      (auth as jest.Mock).mockReturnValue({ 
        userId: null,
        redirectToSignIn: mockRedirectToSignIn
      });

      const result = await updateSession('test-session-id', mockFormData);

      expect(result).toEqual({ error: true });
      expect(mockRedirectToSignIn).toHaveBeenCalled();
      expect(db.update).not.toHaveBeenCalled();
    });

    test('should handle database update error', async () => {
      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockRejectedValue(new Error('Update failed')),
        }),
      });

      (sessionFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: mockFormData,
      });

      // Mock Anthropic to return successfully
      (Anthropic as unknown as jest.Mock).mockImplementation(() => ({
        messages: {
          create: jest.fn().mockResolvedValue({
            content: [{ type: 'text', text: '{"updated": "data"}' }],
          }),
        },
      }));
    
      // Setup the database mock to throw an error
      const mockError = new Error('Update failed');
      const mockWhere = jest.fn().mockRejectedValue(mockError);
      const mockSet = jest.fn().mockReturnValue({ where: mockWhere });
      (db.update as jest.Mock).mockReturnValue({
        set: mockSet,
      });

      const result = await updateSession('test-session-id', mockFormData);

      expect(result).toEqual({ error: true });
      expect(console.error).toHaveBeenCalledWith(
        'Error updating session:',
        mockError
      );
    });
  });

  describe('deleteSession', () => {
    test('should delete session successfully', async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined),
      });

      const result = await deleteSession('test-session-id');

      expect(result).toBeUndefined();
      expect(db.delete).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalledWith('/sessions');
    });

    test('should handle deletion error', async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockRejectedValue(new Error('Delete failed')),
      });

      const result = await deleteSession('test-session-id');

      expect(result).toEqual({ error: true });
      expect(console.error).toHaveBeenCalledWith(
        'Error deleting session:',
        expect.any(Error)
      );
    });
  });

  describe('getAISessionsByDate', () => {
    const dateRange = {
      startDate: '2024-03-01',
      endDate: '2024-03-31',
    };

    test('should return sessions within date range for authenticated user', async () => {
      (db.query.SessionsTable.findMany as jest.Mock).mockResolvedValue([mockAISession]);

      const result = await getAISessionsByDate(dateRange);

      expect(result).toEqual([mockAISession]);
      expect(db.query.SessionsTable.findMany).toHaveBeenCalledWith({
        where: expect.any(Function),
        orderBy: expect.any(Function),
        columns: {
          user_id: false,
          session_id: false,
          session_data: false,
        },
      });
    });

    test('should return empty array and redirect when user is not authenticated', async () => {
      (auth as jest.Mock).mockReturnValue({ 
        userId: null, 
        redirectToSignIn: mockRedirectToSignIn 
      });

      const result = await getAISessionsByDate(dateRange);

      expect(result).toEqual([]);
      expect(mockRedirectToSignIn).toHaveBeenCalled();
    });
  });
});
