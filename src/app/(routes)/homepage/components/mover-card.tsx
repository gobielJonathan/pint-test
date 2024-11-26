import Percentage from "@/components/percentage";
import toIDR from "@/lib/to-idr";
import Image from "next/image";

export default function MoverCard(props: {
  currency: string;
  change: number;
  price: number;
  image: string;
}) {
  return (
    <div className="w-auto rounded-md hover:bg-slate-100 border p-3 transition-all cursor-pointer">
      <div className="inline-flex items-center">
        <Image src={props.image} width={32} height={32} alt={props.currency} />
        <h4 className="font-bold text-lg ml-2">{props.currency}</h4>
      </div>

      <div className="text-gray-600">{toIDR(props.price)}</div>
      <Percentage change={props.change} />
    </div>
  );
}
