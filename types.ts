export interface ICHItem {
  id: string;
  name: string;
  category: string;
  level: string; // "国家级" | "自治区级"
  area: string; // Original area string
  cleanArea: string; // Processed district/county name
  protectionUnit: string;
  lng: number;
  lat: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface CategoryStats {
  [key: string]: number;
}
