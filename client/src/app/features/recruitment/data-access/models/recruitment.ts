export interface RecruitmentRequest {
  companyName: string;
  contactEmail: string;
  phoneNumber: string;
  position: string;
  needsDescription: string;
  monthlyBudget: IMonthlyBudget;
  urgency: string;
}

interface IMonthlyBudget {
  min: number;
  max: number;
}
