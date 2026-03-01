export type Concert = {
  id: string;
  date: string; // ISO format YYYY-MM-DD from Supabase
  venue: string;
  band: string;
  url: string;
  created_at: string;
};

export type LinkCard = {
  id: string;
  title: string;
  url: string;
  display_order: number;
  created_at: string;
};
