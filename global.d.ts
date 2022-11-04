type FoodEntryDetails = Record<string, { unit: string; amount: number }>;
type FoodEntryCreateOptions = {
  name: string;
  details?: FoodEntryDetails;
};
type FoodEntry = FoodEntryCreateOptions & {
  readonly id: string;
  slug: string;
  createdAt: Date;
};
type FoodEntryUpdateOptions = Partial<FoodEntryCreateOptions>;

type LoginCredentials = { username: string; password: string };
