export const retryRequest = async (
  requestFn,
  maxAttempts = parseInt(import.meta.env.VITE_RETRY_ATTEMPTS) || 3,
  delay = parseInt(import.meta.env.VITE_RETRY_DELAY) || 1000
) => {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }

      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }

  throw lastError;
};