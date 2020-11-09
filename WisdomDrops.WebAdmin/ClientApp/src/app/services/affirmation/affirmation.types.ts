export interface AffirmationModel {
  id: string | null;
  categoryName: string;
  description: string;
  topic: string;
  weight: number;
}

export interface GetAffirmationsResult {
  affirmations: AffirmationModel[];
  count: number;
}

export enum SortDir {
  Asc = 1,
  Desc
}

export interface ImportFromSpreadsheetResponse
{
  errorMessage: string;
  report: string;
  success: boolean;
}
