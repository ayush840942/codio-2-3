
export const calculateTrialStatus = (trialStartDate: string | null, userCreatedAt: string) => {
  if (!trialStartDate) {
    // Use user creation date as trial start if no explicit trial start date
    const startDate = new Date(userCreatedAt);
    const now = new Date();
    const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 7 - daysSinceStart);
    
    return {
      trialDaysRemaining: daysRemaining,
      isTrialActive: daysRemaining > 0,
      trialStartDate: startDate.toISOString().split('T')[0]
    };
  }
  
  const startDate = new Date(trialStartDate);
  const now = new Date();
  const daysSinceStart = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 7 - daysSinceStart);
  
  return {
    trialDaysRemaining: daysRemaining,
    isTrialActive: daysRemaining > 0,
    trialStartDate
  };
};
