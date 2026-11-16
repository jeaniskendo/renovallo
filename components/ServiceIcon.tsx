import type { LucideIcon } from "lucide-react";
import {
  Home,
  Leaf,
  Expand,
  Warehouse,
  Droplets,
  ChefHat,
  Wrench,
  Zap,
  Thermometer,
  Brush,
  BrickWall,
  Trees,
  Building2,
  Ruler,
  DoorOpen,
  House,
  Hammer,
  Layers,
  Sun,
  Building,
  CircleHelp,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  leaf: Leaf,
  expand: Expand,
  warehouse: Warehouse,
  droplets: Droplets,
  "chef-hat": ChefHat,
  wrench: Wrench,
  zap: Zap,
  thermometer: Thermometer,
  brush: Brush,
  "brick-wall": BrickWall,
  trees: Trees,
  "building-2": Building2,
  ruler: Ruler,
  "door-open": DoorOpen,
  house: House,
  layers: Layers,
  sun: Sun,
  building: Building,
  "circle-help": CircleHelp,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Hammer;
  return <Icon className={className} aria-hidden="true" />;
}
