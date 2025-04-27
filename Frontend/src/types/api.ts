export interface HouseInput {
  "Money Available": number;
  "House Price": number;
  "Tax Rate": number;
  "Yearly Effective Tax Rate": number;
  "Term": number;
}

export interface ApiInput {
  "House Number": number;
  "Houses": HouseInput[];
}

export interface ApiOutput {
  "Monthly Payment": number;
  "Yearly Payment": number;
  "Money Enough": boolean;
  "Repayment Time": number;
  "Profit Rate": number;
  "Repayment Graph": number[];
  "Risk Rate": number;
}