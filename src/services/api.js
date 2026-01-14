import { retryRequest } from '../utils/retry.js';

export const apiClient = async (endpoint, options = {}) => {
  const makeRequest = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'API request failed',
        response.status,
        data
      );
    }

    return data;
  };

  try {
    return await retryRequest(makeRequest);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Network error', 0, { originalError: error.message });
  }
};