import { ICHItem } from '../types';
import { CSV_DATA } from '../constants';

// Helper to clean up the area name
const cleanAreaName = (rawArea: string): string => {
  // Remove prefix
  let area = rawArea.replace("广西壮族自治区", "");

  // Specific normalization for Guilin districts and counties
  // Note: Order matters to catch full names
  if (area.includes("临桂")) return "临桂区";
  if (area.includes("荔浦")) return "荔浦市";
  if (area.includes("永福")) return "永福县";
  if (area.includes("龙胜")) return "龙胜各族自治县";
  if (area.includes("资源")) return "资源县";
  if (area.includes("平乐")) return "平乐县";
  if (area.includes("恭城")) return "恭城瑶族自治县";
  if (area.includes("全州")) return "全州县";
  if (area.includes("兴安")) return "兴安县";
  if (area.includes("灵川")) return "灵川县";
  if (area.includes("阳朔")) return "阳朔县";
  if (area.includes("灌阳")) return "灌阳县";
  if (area.includes("秀峰")) return "秀峰区";
  if (area.includes("象山")) return "象山区";
  if (area.includes("七星")) return "七星区";
  if (area.includes("叠彩")) return "叠彩区";
  if (area.includes("雁山")) return "雁山区";
  
  // If it is just "桂林市" or similar city-level entities without district info
  if (area === "桂林市" || area === "市本级") return "桂林市本级";
  
  // Fallback cleanup
  return area.replace("桂林市", "");
};

export const getICHData = (): ICHItem[] => {
  const lines = CSV_DATA.trim().split('\n');
  const headers = lines[0].split(',');
  
  const data: ICHItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    
    // Safety check for empty lines
    if (currentLine.length < 8) continue;

    // Mapping based on CSV structure:
    // ID,项目名称,类别,级别,申报地区或单位,保护单位,经度（X）,纬度（Y）
    const id = currentLine[0].trim();
    const name = currentLine[1].trim();
    const category = currentLine[2].trim();
    const level = currentLine[3].trim();
    const area = currentLine[4].trim();
    const unit = currentLine[5].trim();
    const lng = parseFloat(currentLine[6].trim());
    const lat = parseFloat(currentLine[7].trim());

    data.push({
      id,
      name,
      category,
      level,
      area,
      cleanArea: cleanAreaName(area),
      protectionUnit: unit,
      lng,
      lat
    });
  }
  return data;
};
