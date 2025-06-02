
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      console.error(`❌ Tentativa ${attempt + 1}/${maxRetries} falhou:`, error);
      
      if (attempt === maxRetries - 1) break;
      
      const waitTime = baseDelay * Math.pow(2, attempt);
      console.log(`⏳ Aguardando ${waitTime}ms antes da próxima tentativa...`);
      await delay(waitTime);
    }
  }
  
  throw lastError;
};
