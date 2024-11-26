import { ArrowUp, ArrowDown } from "lucide-react";

export default function Percentage(props: { change: number }) {
  if (props.change < 0) {
    return (
      <div className="inline-flex items-center">
        <ArrowDown size={14} className="text-red-900" />
        <div className="text-red-900 font-bold">{props.change}%</div>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center">
      <ArrowUp size={14} className="text-green-400" />
      <div className="text-green-400 font-bold">{props.change}%</div>
    </div>
  );
}
